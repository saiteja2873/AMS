import { create } from 'zustand';

type UserState = {
  isAuthenticated: boolean;
  email: string;
  user_role : string;
  toggleAuth: () => void;
  toggleEmail: (login_email: string) => void;
  toggleRole: (login_role: string) => void;
  toggleAuth2: () => void;
}

const useUser = create<UserState>((set) => ({
  isAuthenticated: false,  // Default to false (assuming initially not authenticated)
  email: '',
  user_role : 'USER',
  toggleAuth: () => set((state) => ({ isAuthenticated: !state.isAuthenticated })),  // Toggle between true/false
  toggleEmail: (login_email: string) => set(() => ({ email: login_email })),
  toggleAuth2: () => set(() => ({ isAuthenticated: true })),
  toggleRole: (login_role: string) => set(() => ({ user_role: login_role }))
}));

export default useUser;
