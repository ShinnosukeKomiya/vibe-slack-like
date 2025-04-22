"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { InviteLinkGenerator } from "@/components/workspace/InviteLinkGenerator";
import { MemberList } from "@/components/workspace/MemberList";
import { useWorkspaceStore } from "@/lib/store/workspaceStore";
import { useMemberStore } from "@/lib/store/memberStore";
import { generateId, getCurrentDateTime } from "@/lib/utils";

export default function WorkspaceSettingsPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = use(params);
  const router = useRouter();
  const { workspaces, currentWorkspace, setCurrentWorkspace } = useWorkspaceStore();
  const { members, addMember } = useMemberStore();
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string>("");

  // 現在のワークスペースを設定
  useEffect(() => {
    if (workspaces.length > 0) {
      setCurrentWorkspace(workspaceId);
      setIsLoading(false);
    }

    // ユーザーIDの取得または生成
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const newUserId = generateId();
      localStorage.setItem("userId", newUserId);
      setUserId(newUserId);
    }
  }, [workspaceId, workspaces, setCurrentWorkspace]);

  // ワークスペースが見つからない場合の処理
  useEffect(() => {
    if (!isLoading && !currentWorkspace) {
      toast.error("ワークスペースが見つかりません");
      router.push("/");
    }
  }, [currentWorkspace, isLoading, router]);

  // ワークスペース作成者をメンバーとして追加
  useEffect(() => {
    if (currentWorkspace && userId) {
      const existingMember = members.find(
        (m) => m.id === userId && m.workspaceId === workspaceId
      );

      if (!existingMember) {
        // ワークスペースのオーナーとしてメンバーに追加
        addMember({
          id: userId,
          name: "管理者",
          workspaceId: workspaceId,
          isOwner: true,
          joinedAt: getCurrentDateTime(),
        });
      }
    }
  }, [currentWorkspace, userId, workspaceId, members, addMember]);

  if (isLoading || !currentWorkspace) {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4">
        <div className="text-center p-8">
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-6 w-32 mx-auto rounded mb-4"></div>
          <p className="text-muted-foreground">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1D1C1D] dark:text-white">{currentWorkspace.name}</h1>
          <p className="text-sm text-muted-foreground">
            ワークスペースID: {workspaceId}
          </p>
        </div>

        <InviteLinkGenerator workspaceId={workspaceId} />
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-md slack-border p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-[#1D1C1D] dark:text-white">メンバー管理</h2>
        <MemberList workspaceId={workspaceId} currentUserId={userId} />
      </div>
    </div>
  );
}
