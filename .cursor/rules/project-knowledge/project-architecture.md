# プロジェクトアーキテクチャの概要

このプロジェクトはフロントエンドのみで構成されたステートレスアプリケーションです。
Next.js (v15.3.1) の App Router を使用しています。
デザインは [shadcn](https://ui.shadcn.com/docs/installation) をベースとしており、特に特殊な拘りは持たないようにします。

## ディレクトリ構成

- `src/app`: Next.js の App Router に基づくルーティングとページコンポーネントを格納します。
  - 例: [src/app/workspace/[workspaceId]/channels/page.tsx](../../../src/app/workspace/[workspaceId]/channels/page.tsx) - チャンネル一覧ページ
- `src/domains`: ドメインロジックと型定義をドメインごとに整理します。
  - `channel`: チャンネル関連のドメイン
    - [src/domains/channel/types.ts](../../../src/domains/channel/types.ts) - 型定義
    - [src/domains/channel/service.ts](../../../src/domains/channel/service.ts) - ドメインロジック
  - `thread`: スレッド関連のドメイン
    - [src/domains/thread/types.ts](../../../src/domains/thread/types.ts) - 型定義
    - [src/domains/thread/service.ts](../../../src/domains/thread/service.ts) - ドメインロジック
- `src/components`: 再利用可能な UI コンポーネントを格納します。
  - `feature`: 特定の機能やユースケースに関連するコンポーネントを格納します。
    - 例: `src/components/feature/channels` - チャンネル機能関連コンポーネント
- `docs`: プロジェクトのドキュメントを格納します。
  - `docs/requirement.md` - プロジェクトの要件定義書
