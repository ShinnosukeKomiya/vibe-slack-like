import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] bg-gradient-to-br from-[#4A154B] to-[#3B0E3C]">
      <div className="max-w-md w-full mx-4 p-8 bg-white dark:bg-gray-900 rounded-lg shadow-xl text-center">
        <div className="flex justify-center mb-6">
          <span className="text-4xl">⚡</span>
        </div>

        <h1 className="text-3xl font-bold mb-4 text-[#1D1C1D] dark:text-white">Vibe ワークスペース</h1>

        <p className="text-muted-foreground mb-8">
          チーム作業を簡単に管理できるワークスペースアプリへようこそ。新しいワークスペースを作成して始めましょう。
        </p>

        <Link href="/workspace/create">
          <Button className="w-full bg-[#4A154B] hover:bg-[#3F0E40] text-white text-lg py-6">
            ワークスペースを作成
          </Button>
        </Link>
      </div>
    </div>
  );
}
