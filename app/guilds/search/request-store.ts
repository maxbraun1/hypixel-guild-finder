import { create } from "zustand";

interface useRequestStore {
  guild_id: string | null;
  guild_name: string | null;
  setGuildId: (id: string) => void;
  setGuildName: (name: string) => void;
  clear: () => void;
}

export const useRequestStore = create<useRequestStore>((set) => ({
  guild_id: null,
  guild_name: null,
  setGuildId: (id: string) => set(() => ({ guild_id: id })),
  setGuildName: (name: string) => set(() => ({ guild_name: name })),
  clear: () => set(() => ({ guild_id: null, guild_name: null })),
}));
