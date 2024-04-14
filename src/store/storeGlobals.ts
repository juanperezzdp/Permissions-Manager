import { create } from "zustand";

interface StoreAuth {
  errorAuth: string | null;
  setErrorAuth: (error: string | null) => void;
  errorPermission: string | null;
  setErrorPermission: (error: string | null) => void;
}

const useStore = create<StoreAuth>((set) => ({
  errorAuth: null,
  setErrorAuth: (error) => {
    set({ errorAuth: error });
    if (error !== null) {
      setTimeout(() => {
        set({ errorAuth: null });
      }, 3000);
    }
  },
  errorPermission: null,
  setErrorPermission: (error) => {
    set({ errorPermission: error });
    if (error !== null) {
      setTimeout(() => {
        set({ errorPermission: null });
      }, 3000);
    }
  },
}));

export default useStore;
