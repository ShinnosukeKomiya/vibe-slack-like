import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Channel = {
  id: string
  workspaceId: string
  name: string
  isPublic: boolean
  description?: string
  createdAt: string
}

type ChannelState = {
  channels: Channel[]
  addChannel: (channelData: Omit<Channel, 'id' | 'createdAt'>) => void
  getChannelsByWorkspace: (workspaceId: string) => Channel[]
}

export const useChannelStore = create<ChannelState>()(
  persist(
    (set, get) => ({
      channels: [],
      addChannel: (channelData) => {
        const newChannel: Channel = {
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          ...channelData,
        }
        set((state) => ({ channels: [...state.channels, newChannel] }))
      },
      getChannelsByWorkspace: (workspaceId) => {
        return get().channels.filter((c) => c.workspaceId === workspaceId)
      },
    }),
    {
      name: 'channel-storage',
    }
  )
)
