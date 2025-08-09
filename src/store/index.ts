import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface GlobalState {
  isExpandedPlayer: boolean;
  setIsExpandedPlayer: (expanded: boolean) => void;
}

const useGlobalStore = create<GlobalState>()(
  devtools(
    persist(
      (set) => ({
        isExpandedPlayer: false,
        setIsExpandedPlayer: (expanded: boolean) =>
          set({
            isExpandedPlayer: expanded,
          }),
      }),
      {
        name: 'global-storage',
      },
    ),
  ),
);

export default useGlobalStore;
