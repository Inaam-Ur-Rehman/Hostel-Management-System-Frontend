import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: {
        data: null,
        token: null,
      },
      setUser: (data) =>
        set({
          user: {
            data: data.user,
            token: data.token,
          },
        }),
      getUser: () => get().user,
      logout: () =>
        set({
          user: {
            data: null,
            token: null,
          },
        }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
