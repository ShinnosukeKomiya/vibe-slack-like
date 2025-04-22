"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="bg-[#4A154B] text-white h-14 px-4 flex items-center justify-between shadow-md">
      <div className="flex items-center">
        <Link href="/" className="font-bold text-xl flex items-center">
          <span className="mr-1 text-2xl">⚡</span> Vibe
        </Link>
      </div>

      {!isHome && (
        <div className="text-sm opacity-80">
          {pathname.includes("/workspace/") && "ワークスペース"}
        </div>
      )}
    </header>
  );
}
