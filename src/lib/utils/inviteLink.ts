import { generateId } from "./index";

// 招待コードに関する型定義
export type InviteCode = {
  code: string;
  workspaceId: string;
  createdBy: string;
  createdAt: string;
  expiresAt: string;
  isActive: boolean;
};

const STORAGE_KEY = "workspace-invite-codes";

// 招待リンクを生成する関数
export function generateInviteLink(workspaceId: string, userId: string, expiresInDays = 7): string {
  const inviteCode = generateId();
  const now = new Date();
  const expiresAt = new Date(now);
  expiresAt.setDate(now.getDate() + expiresInDays);

  const codeData: InviteCode = {
    code: inviteCode,
    workspaceId,
    createdBy: userId,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    isActive: true,
  };

  // ローカルストレージに保存されている既存の招待コードを取得
  const existingCodesStr = localStorage.getItem(STORAGE_KEY);
  const existingCodes: InviteCode[] = existingCodesStr ? JSON.parse(existingCodesStr) : [];

  // 新しい招待コードを追加して保存
  const updatedCodes = [...existingCodes, codeData];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCodes));

  // 完全なURLを返す
  return `${window.location.origin}/workspace/join/${inviteCode}`;
}

// 招待コードの有効性を検証する関数
export function validateInviteCode(code: string): { valid: boolean; workspaceId?: string } {
  const codesStr = localStorage.getItem(STORAGE_KEY);
  if (!codesStr) {
    return { valid: false };
  }

  const codes: InviteCode[] = JSON.parse(codesStr);
  const inviteCode = codes.find((c) => c.code === code);

  if (!inviteCode) {
    return { valid: false };
  }

  // 有効期限と有効状態をチェック
  const now = new Date();
  const expiresAt = new Date(inviteCode.expiresAt);

  if (!inviteCode.isActive || now > expiresAt) {
    return { valid: false };
  }

  return { valid: true, workspaceId: inviteCode.workspaceId };
}

// ワークスペースのすべての招待コードを取得する関数
export function getInviteCodesForWorkspace(workspaceId: string): InviteCode[] {
  const codesStr = localStorage.getItem(STORAGE_KEY);
  if (!codesStr) {
    return [];
  }

  const codes: InviteCode[] = JSON.parse(codesStr);
  return codes.filter(code => code.workspaceId === workspaceId && code.isActive);
}

// 招待コードを無効化する関数
export function deactivateInviteCode(code: string): boolean {
  const codesStr = localStorage.getItem(STORAGE_KEY);
  if (!codesStr) {
    return false;
  }

  const codes: InviteCode[] = JSON.parse(codesStr);
  const updatedCodes = codes.map((c) =>
    c.code === code ? { ...c, isActive: false } : c
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCodes));
  return true;
}
