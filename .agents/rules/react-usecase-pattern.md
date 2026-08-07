# React Usecase パターン設計ガイドライン

本プロジェクトでは、React + TanStack Query のパフォーマンスとコードの整理を両立させるため、以下の設計パターンを採用します。

## レイヤー構造

- **コンポーネント（UI層）**: データの表示とUIインタラクションのみ。
- **Usecase層（カスタムフック）**: 画面操作ごとの状態管理やキャッシュ制御（React Queryの呼び出しなど）。
- **Repository層（データアクセス）**: APIと通信する純粋な関数。

---

## 基本ルール

### 1. Usecaseは「1フック = 1アクション」で実装する

Reactの不要な再レンダリングを防ぐため、1つのカスタムフックに複数のクエリや更新処理（Mutation）を同居させる「Serviceパターン」は禁止します。必ず処理ごとに個別のカスタムフックに分離してください。

### 2. ファイル数削減のため、1ファイルに関連フックをまとめる

ファイル数の爆発を防ぐため、関連する機能（例: ユーザー情報に関する取得・作成・更新など）のカスタムフックは、1つのファイルに記述し、それぞれ個別に `export` します。

### コード例（推奨される構成）

```typescript
// @/usecases/useUsers.ts (1つのファイルにまとめる)

// 一覧取得のUsecase（フック）
export const useGetUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: userRepository.getUsers,
  });
};

// 新規作成のUsecase（フック）
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userRepository.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
```
