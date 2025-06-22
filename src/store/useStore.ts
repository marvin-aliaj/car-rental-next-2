import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  cars: Car[] | [];
  setCars: (data: Car[] | []) => void;
  user: User | null;
  setUser: (data: User | null) => void;
};

export const useStore = create<State>()(
  persist(
    (set) => ({
      cars: [],
      setCars: (data: Car[] | []) => set(() => ({ cars: data })),
      user: null,
      setUser: (data: User | null) => set(() => ({ user: data })),
    }),
    {
      name: "global-store",
    },
  ),
);
