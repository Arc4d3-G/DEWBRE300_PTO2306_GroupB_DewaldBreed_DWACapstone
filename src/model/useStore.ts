import { create } from 'zustand';
import { Api, Preview, Show } from '../api/createApi';

type GlobalStore = {
  phase: 'DONE' | 'LOADING';
  previewData: Preview[];
  selectedShow: Show | null;
  setSelectedShow: (id: string) => void;
};

export const createStore = (api: Api) => {
  const store = create<GlobalStore>((set) => ({
    phase: 'LOADING',
    previewData: [],
    selectedShow: null,

    setSelectedShow: (id: string) => {
      set({ phase: 'LOADING' });
      console.log(store.getState());
      api.getShowDetails(id).then((data) => {
        set({ phase: 'DONE', selectedShow: data });
        console.log(store.getState());
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
