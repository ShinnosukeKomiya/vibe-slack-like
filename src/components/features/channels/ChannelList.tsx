import React, { useMemo } from "react"
import Link from "next/link"
import { useChannelStore } from "@/lib/store/channelStore"

export function ChannelList({ workspaceId }: { workspaceId: string }) {
  // 全チャネルを取得し、workspaceIdでフィルタリング
  const allChannels = useChannelStore(state => state.channels)
  const channels = useMemo(
    () => allChannels.filter(c => c.workspaceId === workspaceId),
    [allChannels, workspaceId]
  )

  if (channels.length === 0) {
    return <p className="text-muted-foreground">チャンネルがありません。</p>
  }

  return (
    <ul className="grid gap-4">
      {channels.map(channel => (
        <li key={channel.id} className="border p-4 rounded-md">
          <div className="flex justify-between items-center">
            <Link
              href={`/workspace/${workspaceId}/channels/${channel.id}`}
              className="text-lg font-semibold"
            >
              #{channel.name}
            </Link>
            <span className={channel.isPublic ? "text-green-600 text-sm" : "text-gray-500 text-sm"}>
              {channel.isPublic ? "公開" : "非公開"}
            </span>
          </div>
          {channel.description && (
            <p className="mt-2 text-sm text-muted-foreground">{channel.description}</p>
          )}
        </li>
      ))}
    </ul>
  )
}
