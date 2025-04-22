"use client";

import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useMemberStore } from "@/lib/store/memberStore";
import { DeleteMemberButton } from "./DeleteMemberButton";

interface MemberListProps {
  workspaceId: string;
  currentUserId: string;
}

export function MemberList({ workspaceId, currentUserId }: MemberListProps) {
  const { getMembersByWorkspace } = useMemberStore();

  // 現在のワークスペースのメンバーのみをフィルタリング
  const workspaceMembers = useMemo(() => {
    return getMembersByWorkspace(workspaceId);
  }, [getMembersByWorkspace, workspaceId]);

  // 現在のユーザーが管理者かどうかを確認
  const isCurrentUserOwner = useMemo(() => {
    return workspaceMembers.some(
      (member) => member.id === currentUserId && member.isOwner
    );
  }, [workspaceMembers, currentUserId]);

  // 日付をフォーマットする関数
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">メンバー一覧</h3>
      {workspaceMembers.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>名前</TableHead>
              <TableHead>役割</TableHead>
              <TableHead>参加日</TableHead>
              {isCurrentUserOwner && <TableHead className="text-right">アクション</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {workspaceMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name || "名前なし"}</TableCell>
                <TableCell>{member.isOwner ? "管理者" : "メンバー"}</TableCell>
                <TableCell>{formatDate(member.joinedAt)}</TableCell>
                {isCurrentUserOwner && (
                  <TableCell className="text-right">
                    {member.id !== currentUserId && (
                      <DeleteMemberButton
                        memberId={member.id}
                        memberName={member.name || "このメンバー"}
                      />
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-4 text-muted-foreground">
          メンバーがいません。招待リンクを使って新しいメンバーを招待しましょう。
        </div>
      )}
    </div>
  );
}
