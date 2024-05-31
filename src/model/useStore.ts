import { create } from 'zustand';
import { Api, Preview, Show } from '../api/createApi';
import supabase from '../utils/supabase';

export type UserData = {
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

type GlobalStore = {
  phase: 'DONE' | 'LOADING';
  previewData: Preview[];
  selectedShow: Show | null;
  setSelectedShow: (id: string) => void;
  user: User | null;
  setUser: () => void;
  updateUserFavorites: () => void;
};

export const createStore = (api: Api) => {
  const store = create<GlobalStore>((set) => ({
    phase: 'LOADING',
    previewData: [],
    selectedShow: null,
    user: null,

    setSelectedShow: (id: string) => {
      set({ phase: 'LOADING' });
      console.log(store.getState());
      api.getShowDetails(id).then((data) => {
        set({ phase: 'DONE', selectedShow: data });
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
  }));

  api.getPreviewsList().then((data) => {
    store.setState({
      phase: 'DONE',
      previewData: data,
    });
  });

  return store;
};
