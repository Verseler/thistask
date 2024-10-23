import { StateCreator } from "zustand";

export type SidebarState = {
  sidebarIsOpenInMobile: boolean;
  toggleShowMobileSidebar: () => void;
}

export const createSidebarSlice: StateCreator<SidebarState> = (set) => ({
  sidebarIsOpenInMobile: false,
  toggleShowMobileSidebar: () => set((state) => ({ sidebarIsOpenInMobile: !state.sidebarIsOpenInMobile })),
});