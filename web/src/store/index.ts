import { create } from "zustand";
import { IUser } from "./types";

/**
 * Store type
 * @interface Store
 */
type Store = {
  /**
   * Auth user
   */
  authUser: IUser | null;
  /**
   * Request loading
   */
  requestLoading: boolean;
  /**
   * Set auth user
   */
  setAuthUser: (user: IUser | null) => void;
  /**
   * Set request loading
   */
  setRequestLoading: (isLoading: boolean) => void;
};

/**
 * useStore
 * @description Store hook
 */
const useStore = create<Store>((set) => ({
  authUser: null,
  requestLoading: false,
  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
}));

export default useStore;
