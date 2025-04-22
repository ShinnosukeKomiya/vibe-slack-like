"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateInviteCode } from "@/lib/utils/inviteLink";
import { useMemberStore } from "@/lib/store/memberStore";
import { useWorkspaceStore } from "@/lib/store/workspaceStore";
import { generateId, getCurrentDateTime } from "@/lib/utils";

// ワークスペースの型定義
interface Workspace {
  id: string;
  name: string;
  createdAt: string;
  ownerId: string;
}

export default function JoinWorkspacePage({
  params,
}: {
  params: Promise<{ inviteCode: string }>;
}) {
  const router = useRouter();
  const { inviteCode } = use(params);
  const { addMember } = useMemberStore();
  const { workspaces, setCurrentWorkspace } = useWorkspaceStore();
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);

  // 招待コードを検証
  useEffect(() => {
    if (typeof window !== "undefined") {
      const result = validateInviteCode(inviteCode);
      if (result.valid && result.workspaceId) {
        setWorkspaceId(result.workspaceId);

        // ワークスペース情報を取得
        const foundWorkspace = workspaces.find(w => w.id === result.workspaceId);
        setWorkspace(foundWorkspace || null);
      } else {
        toast.error("無効な招待リンクです");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
      setIsLoading(false);
    }
  }, [inviteCode, router, workspaces]);

  // ワークスペースに参加する
  const handleJoin = () => {
    if (!workspaceId) {
      toast.error("ワークスペースIDが見つかりません");
      return;
    }

    // ユーザーIDの取得または生成
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = generateId();
      localStorage.setItem("userId", userId);
    }

    // メンバーとして追加
    addMember({
      id: userId,
      name: userName.trim() || "ゲスト",
      workspaceId: workspaceId,
      isOwner: false,
      joinedAt: getCurrentDateTime(),
    });

    // 現在のワークスペースを設定
    setCurrentWorkspace(workspaceId);

    toast.success("ワークスペースに参加しました");
    router.push(`/workspace/${workspaceId}/settings`);
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto py-8 px-4">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-md slack-border text-center">
          <div className="animate-pulse">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-4"></div>
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">招待リンクを検証中...</p>
        </div>
      </div>
    );
  }

  if (!workspaceId || !workspace) {
    return (
      <div className="max-w-md mx-auto py-8 px-4">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-md slack-border text-center">
          <div className="text-red-500 mb-2">❌</div>
          <h1 className="text-2xl font-bold mb-2 text-[#1D1C1D] dark:text-white">無効な招待リンク</h1>
          <p className="text-muted-foreground mb-6">
            この招待リンクは無効であるか、期限が切れています。
          </p>
          <Button
            onClick={() => router.push("/")}
            className="bg-[#4A154B] hover:bg-[#3F0E40] text-white"
          >
            ホームに戻る
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-8 px-4">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-md slack-border">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2 text-[#1D1C1D] dark:text-white">ワークスペースに参加</h1>
          <p className="text-muted-foreground">
            <span className="font-medium">「{workspace.name}」</span>に参加します。
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="userName" className="block text-sm font-medium text-[#1D1C1D] dark:text-white">
              あなたの名前
            </label>
            <Input
              id="userName"
              placeholder="名前を入力"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="border-[#dddddd] dark:border-[#4D4C4D] focus:border-[#4A154B] focus:ring-[#4A154B]"
            />
            <p className="text-xs text-muted-foreground">入力しない場合は「ゲスト」として参加します</p>
          </div>

          <Button
            onClick={handleJoin}
            className="w-full bg-[#4A154B] hover:bg-[#3F0E40] text-white py-5"
          >
            参加する
          </Button>
        </div>
      </div>
    </div>
  );
}
