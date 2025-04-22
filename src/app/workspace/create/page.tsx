import { Metadata } from "next";
import Link from "next/link";
import { CreateWorkspaceForm } from "@/components/workspace/CreateWorkspaceForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "ワークスペース作成 | Vibe",
  description: "新しいワークスペースを作成します",
};

export default function CreateWorkspacePage() {
  return (
    <div className="max-w-md mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-[#4A154B] dark:text-[#D1D2D3] hover:bg-[#F8F8F8] dark:hover:bg-[#222529]">
            <ArrowLeft className="h-4 w-4 mr-2" />
            ホームに戻る
          </Button>
        </Link>
      </div>

      <div className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-md slack-border">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[#1D1C1D] dark:text-white">新しいワークスペースを作成</h1>
          <p className="text-muted-foreground">
            チームの名前を入力して、新しいワークスペースを作成しましょう
          </p>
        </div>

        <CreateWorkspaceForm />
      </div>
    </div>
  );
}
