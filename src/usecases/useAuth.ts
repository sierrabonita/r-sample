import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authRepository } from '@/repositories/authRepository';
import type { LoginDto, SendVerificationEmailDto } from '@/schemas/auth';
import type { User } from '@/schemas/user';

const AUTH_USER_KEY = ['authUser'];

// 現在ログインしているユーザー情報を取得するフック（状態共有用）
export const useAuthUser = () => {
  return useQuery<User | null>({
    queryKey: AUTH_USER_KEY,
    queryFn: () => null, // 初期状態は未ログイン（null）
    staleTime: Infinity, // 自動再取得防止(refetchOn...よりも強力)
    gcTime: Infinity, // 自動削除防止
  });
};

// ログインを実行するフック
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginDto) => authRepository.login(data),
    onSuccess: (data) => {
      // 取得したユーザー情報をキャッシュに書き込み、アプリ全体で共有する
      queryClient.setQueryData(AUTH_USER_KEY, data);
    },
  });
};

// ログアウトを実行するフック
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authRepository.logout,
    onSuccess: () => {
      // キャッシュをクリアして未ログイン状態にする
      queryClient.setQueryData(AUTH_USER_KEY, null);
    },
  });
};

export const useSendVerificationEmail = () => {
  return useMutation({
    mutationFn: (data: SendVerificationEmailDto) => authRepository.sendVerificationEmail(data),
  });
};
