import {create} from "zustand";
import { createProjectSlice, type ProjectState } from "./slices/projectSlice";
import { createTaskSlice, type TaskState } from "./slices/taskSlice";
import { createSidebarSlice, type SidebarState } from "./slices/sidebarSlice";

export const useBoundStore = create<ProjectState & TaskState & SidebarState>((...a) => ({
 ...createProjectSlice(...a),
 ...createTaskSlice(...a),
 ...createSidebarSlice(...a),
}))