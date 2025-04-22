"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { generateInviteLink, getInviteCodesForWorkspace } from "@/lib/utils/inviteLink";

interface InviteLinkGeneratorProps {
  workspaceId: string;
}

export function InviteLinkGenerator({ workspaceId }: InviteLinkGeneratorProps) {
  const [inviteLink, setInviteLink] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);

  // 招待リンクを生成する
  const handleGenerateLink = () => {
    // ユーザーIDを取得
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("ユーザー情報が見つかりません");
      return;
    }

    // 既存の有効な招待リンクがあるか確認
    const existingCodes = getInviteCodesForWorkspace(workspaceId);
    if (existingCodes.length > 0) {
      // 最も新しい招待コードからリンクを生成
      const latestCode = existingCodes.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];

      const link = `${window.location.origin}/workspace/join/${latestCode.code}`;
      setInviteLink(link);
    } else {
      // 新しい招待リンクを生成
      const link = generateInviteLink(workspaceId, userId);
      setInviteLink(link);
    }
  };

  // リンクをクリップボードにコピーする
  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      toast.success("招待リンクがコピーされました");
    }).catch(() => {
      toast.error("リンクのコピーに失敗しました");
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => {
          handleGenerateLink();
          setDialogOpen(true);
        }}>
          メンバーを招待
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>ワークスペースにメンバーを招待</DialogTitle>
          <DialogDescription>
            以下の招待リンクを共有して、新しいメンバーをワークスペースに招待できます。
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 pt-4">
          <Input
            value={inviteLink}
            readOnly
            className="flex-1"
          />
          <Button onClick={handleCopyLink} type="button">
            コピー
          </Button>
        </div>
        <DialogFooter className="sm:justify-start pt-4">
          <DialogTrigger asChild>
            <Button type="button" variant="secondary">
              閉じる
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
