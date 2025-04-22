"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMemberStore } from "@/lib/store/memberStore";

interface DeleteMemberButtonProps {
  memberId: string;
  memberName: string;
}

export function DeleteMemberButton({ memberId, memberName }: DeleteMemberButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { removeMember } = useMemberStore();

  const handleDelete = () => {
    try {
      removeMember(memberId);
      toast.success(`${memberName}がメンバーから削除されました`);
    } catch (error) {
      console.error("メンバー削除エラー:", error);
      toast.error("メンバーの削除中にエラーが発生しました");
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-destructive">
          削除
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>メンバーを削除しますか？</DialogTitle>
          <DialogDescription>
            {memberName}をワークスペースから削除します。この操作は元に戻せません。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>キャンセル</Button>
          <Button variant="destructive" onClick={handleDelete}>
            削除
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
