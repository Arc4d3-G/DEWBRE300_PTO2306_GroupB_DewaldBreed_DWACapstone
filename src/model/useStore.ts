import { create } from 'zustand';
import { Api, Episode, Preview, Show } from '../api/createApi';
import supabase from '../utils/supabase';

export type UserData = {
  created_at: string;
  user_id: string | undefined;
  show_id: string;
  season_num: number;
  episode_num: number;
};

export type User = {
  id: string | undefined;
  email: string | undefined;
  favorites: Array<UserData> | undefined;
};
export type Favorite = {
  added_date: string;
  show_Id: string;
  season_num: number;
  episode: Episode;
};

type GlobalStore = {
  phase: 'DONE' | 'LOADING';
  previewData: Preview[];
  selectedShow: Show | null;
  setSelectedShow: (id: string) => void;
  user: User | null;
  setUser: () => void;
  updateUserFavorites: () => void;
  currentlyPlaying: Episode | null;
  isPlaying: boolean;
  parseUserData: () => Promise<Favorite[]>;
};

export const createStore = (api: Api) => {
  const store = create<GlobalStore>((set) => ({
    phase: 'LOADING',
    previewData: [],
    selectedShow: null,
    user: null,
    currentlyPlaying: null,
    isPlaying: false,

    setSelectedShow: (id: string) => {
      // set({ phase: 'LOADING' });
      console.log(store.getState());
      api.getShowDetails(id).then((data) => {
        set({ selectedShow: data });
        console.log(store.getState());
      });
    },

    setUser: () => {
      set({ phase: 'LOADING' });
      supabase.auth.getUser().then((userData) => {
        const user = userData.data.user;
        if (user?.id === undefined) {
          set({ phase: 'DONE', user: null });
        } else {
          supabase
            .from('UserData')
            .select()
            .match({ user_id: user?.id })
            .then((data) => {
              set({
                phase: 'DONE',
                user: { id: user.id, email: user.email, favorites: data.data as UserData[] },
              });
            });
        }
      });
    },
    updateUserFavorites: () => {
      supabase
        .from('UserData')
        .select()
        .match({ user_id: store.getState().user?.id })
        .then((data) =>
          set((prev) => ({
            user: {
              id: prev.user?.id,
              email: prev.user?.email,
              favorites: data.data as UserData[],
            },
          }))
        );
    },
    parseUserData: async () => {
      set({ phase: 'LOADING' });
      const showIdArr: string[] = [
        ...new Set(store.getState().user?.favorites?.map((favorite) => favorite.show_id)),
      ];

      const getShowData = async () => {
        const showData: Show[] = await Promise.all(showIdArr.map((id) => api.getShowDetails(id)));
        return showData;
      };

      const getFavorites = async () => {
        const userFavorites: UserData[] | undefined = store.getState().user?.favorites;
        const showArr: Show[] = await getShowData();
        const favoriteArr: Favorite[] = [];

        if (userFavorites === undefined) return [];
        for (const show of showArr) {
          for (const favorite of userFavorites) {
            if (favorite.show_id === show.id) {
              const episode = show.seasons
                .find((season) => season.season === favorite.season_num)
                ?.episodes.find((episode) => episode.episode === favorite.episode_num);

              if (episode === undefined) return [];
              const result: Favorite = {
                added_date: favorite.created_at,
                show_Id: favorite.show_id,
                season_num: favorite.season_num,
                episode: episode,
              };
              favoriteArr.push(result);
            }
          }
        }
        return favoriteArr;
      };

      const favoriteArr: Favorite[] = await getFavorites();
      set({ phase: 'DONE' });

      return favoriteArr;
    },
  }));

  api.getPreviewsList().then((data) => {
    store.setState({
      phase: 'DONE',
      previewData: data,
    });
  });

  return store;
};
