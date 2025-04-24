# 実装計画書: UC‑2 チャンネルの新規作成・編集

## 1. 実装概要

- ユーザーがチャンネルを新規作成、編集できるようにする。
- ワークスペース作成時に、デフォルトチャンネル（`#general`、`#random`）を自動作成する。
- 特定のワークスペースに紐づくチャンネルを一覧表示する。
- すべてのデータ操作はクライアントサイド (Zustand ストア) で完結させる。

## 2. タスク一覧

### FR‑2‑1: チャンネル作成機能

#### 2.1 UIコンポーネント開発

- [x] 機能実装/新規：チャンネル作成用モーダル/フォームを実装する。
- [x] 機能実装/変更：ワークスペース別チャンネルページ (`app/workspace/[workspaceId]/channels/page.tsx`) に、チャンネル作成モーダルを開くトリガーとなるボタン (`Button`) を追加する。

#### 2.2 ページ/ルーティング実装

- [x] 機能実装/新規：ワークスペースごとのチャンネルを管理するページ (`app/workspace/[workspaceId]/channels/page.tsx`) を作成する。

#### 2.3 データフェッチ/ステート管理

- [x] 機能実装/新規：`store/channelStore.ts` にチャンネル作成ロジックを追加する。
- [x] 機能実装/新規：ワークスペース作成時にデフォルトチャンネルを作成するロジックを追加する。

#### 2.4 バグ修正

- 品質確認
  - [x] 静的解析：`npm run lint:fix`
  - [x] ビルド：`npm run build`

### FR‑2‑2: チャンネル編集機能

#### 2.1 UIコンポーネント開発

1. [ ] 機能実装/新規：チャンネル編集用モーダル/フォームを実装する。
    - `ChannelCreateForm.tsx` を基に、`components/features/channels/ChannelEditForm.tsx` (仮) を作成する。（コンポーネントの共通化も検討）
    - フォームには既存のチャンネル情報（名前、説明）が初期表示されるようにする。
    - デフォルトチャンネル（`#general`、`#random`）の場合は編集不可とする。
2. [ ] 機能実装/変更：`ChannelList.tsx` 内の各チャンネルアイテムに、編集モーダルを開くボタンを追加する。
    - デフォルトチャンネルの場合は編集ボタンを非表示にする。

#### 2.2 ページ/ルーティング実装

- (特定のページ追加は不要。ワークスペース別チャンネルページ内で完結)

#### 2.3 データフェッチ/ステート管理

1. [ ] 機能実装/新規：`stores/channels.ts` (仮) にチャンネル編集ロジックを追加する。
    - 指定されたチャンネルIDの情報を更新するアクションを実装する。（名前、説明）
    - 入力値のバリデーション
        - 名前は必須、英数字とハイフン/アンダースコアのみ許可
        - 名前の重複チェック（同一ワークスペース内）
    - デフォルトチャンネルの編集防止ガード

#### 2.4 バグ修正

- 品質確認
  - [ ] 静的解析：`npm run lint:fix`
  - [ ] ビルド：`npm run build`

### FR‑2‑3: チャンネル一覧・検索機能

#### 2.1 UIコンポーネント開発

- [x] 機能実装/新規：チャンネル一覧表示コンポーネント (`components/features/channels/ChannelList.tsx`) を作成する。
- [x] 機能実装/新規：チャンネル検索用入力フィールド (`Input`) をワークスペース別チャンネルページ (`src/app/workspace/[workspaceId]/channels/page.tsx`) に追加する。

#### 2.2 ページ/ルーティング実装

- [x] 機能実装/変更：ワークスペース別チャンネルページ (`src/app/workspace/[workspaceId]/channels/page.tsx`) に `ChannelList` と検索フィールドを配置する。

#### 2.3 データフェッチ/ステート管理

- [x] 機能実装/新規：`src/lib/store/channelStore.ts` に指定された `workspaceId` に属するチャンネルリストを取得するゲッターを追加する。
- [x] 機能実装/新規：入力キーワードでチャンネルリストをフィルタリングするロジックを実装する。

#### 2.4 バグ修正

- 品質確認
  - [ ] 静的解析：`npm run lint:fix`
  - [ ] ビルド：`npm run build`

### FR-2-4: チャンネルメッセージ表示機能

#### 2.1 UIコンポーネント開発

- [ ] 機能実装/新規：メッセージ表示エリアコンポーネント (`components/features/channels/ChannelMessageArea.tsx`) を作成。選択されたチャンネルのメッセージリストを表示し、選択なしの場合は案内文を提示。

#### 2.2 ページ/レイアウト変更

- [ ] 機能実装/変更：ワークスペースチャンネルページを2ペインレイアウトに変更し、左に `ChannelList`、右に `ChannelMessageArea` コンポーネントを配置。

#### 2.3 状態管理

- [ ] 機能実装/新規：`useChannelStore` に `selectedChannelId` と `setSelectedChannel` アクションを追加し、選択状態を管理。

#### 2.4 データ表示

- [ ] 機能実装/新規：仮のメッセージデータを用意し、選択されたチャンネルのメッセージを表示する。

#### 2.5 バグ修正

- 品質確認
  - [ ] 静的解析：`npm run lint:fix`
  - [ ] ビルド：`npm run build`

## 4. 関連ファイル参照

- 要件定義: [`docs/requirement.md`](mdc:docs/requirement.md)
- 状態管理ストア: [`stores/channels.ts`](mdc:stores/channels.ts) (仮)
- 作成フォームコンポーネント: [`components/features/channels/ChannelCreateForm.tsx`](mdc:components/features/channels/ChannelCreateForm.tsx) (仮)
- 編集フォームコンポーネント: [`components/features/channels/ChannelEditForm.tsx`](mdc:components/features/channels/ChannelEditForm.tsx) (仮)
- チャンネル一覧コンポーネント: [`components/features/channels/ChannelList.tsx`](mdc:components/features/channels/ChannelList.tsx) (仮)
- ワークスペース別チャンネルページ: [`app/workspace/[workspaceId]/channels/page.tsx`](mdc:app/workspace/[workspaceId]/channels/page.tsx) (仮)
- Shadcn インストールルール: [`.cursor/rules/shadcn-installation-command.mdc`](mdc:.cursor/rules/shadcn-installation-command.mdc)

---
