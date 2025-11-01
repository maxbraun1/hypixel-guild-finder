import { create } from "zustand";

export type User = {
  id: string;
  email: string;
} | null;

interface UserState {
  user: User | null;
  guild: guild | null;
  request_count: number;
  init: (data: { user: User | null, guild: guild | null, request_count: number }) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  guild: null,
  request_count: 0,
  init: (data) => set({ user: data.user, guild: data.guild, request_count: data.request_count })
}));