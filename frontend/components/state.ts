import { create } from 'zustand';

interface UserState {
  isAuthenticated: boolean;
  email: string;
  toggleAuth: () => void;
  toggleEmail: (login_email: string) => void;
}

const useUser = create<UserState>((set) => ({
  isAuthenticated: false,  // Default to false (assuming initially not authenticated)
  email: '',
  toggleAuth: () => set((state) => ({ isAuthenticated: !state.isAuthenticated })),  // Toggle between true/false
  toggleEmail: (login_email: string) => set(() => ({ email: login_email })),
}));

export default useUser;
