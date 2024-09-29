import {create} from "zustand";
import { createProjectSlice, type ProjectState } from "./slices/projectSlice";
import { createTaskSlice, type TaskState } from "./slices/taskSlice";

export const useBoundStore = create<ProjectState & TaskState>((...a) => ({
 ...createProjectSlice(...a),
 ...createTaskSlice(...a),
}))