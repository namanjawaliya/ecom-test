import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  username: string;
  role: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null, // Initial state
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage', // Name of the item in storage
      getStorage: () => localStorage, // Use localStorage to persist the store
    }
  )
);

export default useUserStore;
