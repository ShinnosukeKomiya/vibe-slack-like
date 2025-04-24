"use client"

import React from "react"
import { useParams } from "next/navigation"
import { ChannelCreateForm } from "@/components/features/channels/ChannelCreateForm"
import { ChannelList } from "@/components/features/channels/ChannelList"

export default function WorkspaceChannelsPage() {
  const params = useParams()
  const rawWorkspaceId = params?.workspaceId
  const workspaceId = Array.isArray(rawWorkspaceId) ? rawWorkspaceId[0] : rawWorkspaceId ?? ""

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ワークスペース: {workspaceId} のチャンネル</h1>
      <ChannelCreateForm workspaceId={workspaceId} />
      <div className="mt-6">
        <ChannelList workspaceId={workspaceId} />
      </div>
    </div>
  )
}
