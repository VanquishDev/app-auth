import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserState {
  id: string;
  username: string;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (prev: boolean) => void;
  user: UserState
  setUser: (prev: UserState) => void;
  reset: () => void;
}

const initialState = {
  isAuthenticated: false,
  user: {
    id: '',
    username: '',
    name: '',
    email: '',
  }
}

export const useAuth = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        setIsAuthenticated: (prev) => set((state) => ({ isAuthenticated: prev })),
        user: {
          id: '',
          username: '',
          name: '',
          email: '',
        },
        setUser: (prev) => set((state) => ({ user: prev })),
        reset: () => {
          set(initialState)
        },
      }),
      {
        name: 'auth-storage',
      }
    )
  )
);
