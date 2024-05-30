import { create } from 'zustand';
import { Api, Preview, Show } from '../api/createApi';
import supabase from '../utils/supabase';

export type User = {
  id: string | undefined;
  email: string | undefined;
};

type GlobalStore = {
  phase: 'DONE' | 'LOADING';
  previewData: Preview[];
  selectedShow: Show | null;
  setSelectedShow: (id: string) => void;
  user: User | null;
  setUser: () => void;
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
          set({ phase: 'DONE', user: { id: user.id, email: user.email } });
        }
      });
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
