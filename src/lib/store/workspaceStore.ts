import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Workspace = {
  id: string;
  name: string;
  createdAt: string;
  ownerId: string;
};

type WorkspaceState = {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  addWorkspace: (workspace: Workspace) => void;
  setCurrentWorkspace: (workspaceId: string) => void;
  updateWorkspace: (id: string, workspace: Partial<Workspace>) => void;
  deleteWorkspace: (id: string) => void;
};

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      workspaces: [],
      currentWorkspace: null,
      addWorkspace: (workspace) => {
        set((state) => ({
          workspaces: [...state.workspaces, workspace],
          currentWorkspace: workspace,
        }));
      },
      setCurrentWorkspace: (workspaceId) => {
        const workspace = get().workspaces.find((w) => w.id === workspaceId) || null;
        set({ currentWorkspace: workspace });
      },
      updateWorkspace: (id, updatedWorkspace) => {
        set((state) => ({
          workspaces: state.workspaces.map((workspace) =>
            workspace.id === id ? { ...workspace, ...updatedWorkspace } : workspace
          ),
          currentWorkspace:
            state.currentWorkspace?.id === id
              ? { ...state.currentWorkspace, ...updatedWorkspace }
              : state.currentWorkspace,
        }));
      },
      deleteWorkspace: (id) => {
        set((state) => ({
          workspaces: state.workspaces.filter((workspace) => workspace.id !== id),
          currentWorkspace:
            state.currentWorkspace?.id === id ? null : state.currentWorkspace,
        }));
      },
    }),
    {
      name: 'workspace-storage',
    }
  )
);
