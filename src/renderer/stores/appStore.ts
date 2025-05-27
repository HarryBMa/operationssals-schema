import create from 'zustand';

interface AppStoreState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

interface SetLoading {
  (loading: boolean): void;
}

interface AppStoreActions {
  setLoading: SetLoading;
}

interface AppStore extends AppStoreState, AppStoreActions {}

export const useAppStore = create<AppStore>((set: (partial: Partial<AppStoreState>) => void) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));
