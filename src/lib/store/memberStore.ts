import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Member = {
  id: string;
  name: string;
  workspaceId: string;
  isOwner: boolean;
  joinedAt: string;
};

type MemberState = {
  members: Member[];
  addMember: (member: Member) => void;
  removeMember: (memberId: string) => void;
  getMembersByWorkspace: (workspaceId: string) => Member[];
  updateMember: (memberId: string, memberData: Partial<Member>) => void;
};

export const useMemberStore = create<MemberState>()(
  persist(
    (set, get) => ({
      members: [],
      addMember: (member) => {
        set((state) => ({
          members: [...state.members, member],
        }));
      },
      removeMember: (memberId) => {
        set((state) => ({
          members: state.members.filter((member) => member.id !== memberId),
        }));
      },
      getMembersByWorkspace: (workspaceId) => {
        return get().members.filter((member) => member.workspaceId === workspaceId);
      },
      updateMember: (memberId, memberData) => {
        set((state) => ({
          members: state.members.map((member) =>
            member.id === memberId ? { ...member, ...memberData } : member
          ),
        }));
      },
    }),
    {
      name: 'member-storage',
    }
  )
);
