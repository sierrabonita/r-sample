import type { LoginDto, SendVerificationEmailDto } from '@/schemas/auth';
import type { User } from '@/schemas/user';
import { USER_ROLES } from '@/types/roles';

export const authRepository = {
  // ダミーログイン
  login: async (props: LoginDto): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (props.email === 'normal_1@example.com' && props.password === 'temporary_password') {
          resolve({
            id: 1,
            slug: 'user1',
            name: 'ダミー一般ユーザー',
            email: props.email,
            role: USER_ROLES.NORMAL,
            createdAt: '2026-07-27',
          });
        } else if (
          props.email === 'admin_1@example.com' &&
          props.password === 'temporary_password'
        ) {
          resolve({
            id: 2,
            slug: 'admin1',
            name: 'ダミー管理者ユーザー',
            email: props.email,
            role: USER_ROLES.ADMIN,
            createdAt: '2026-07-27',
          });
        } else {
          // TODO: throw new AuthenticationError("メールアドレスまたはパスワードが正しくありません");
          throw new Error('メールアドレスまたはパスワードが正しくありません');
        }
      }, 500);
    });
  },

  // ダミーログアウト
  logout: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, 300);
    });
  },

  // ダミー仮登録
  sendVerificationEmail: async (props: SendVerificationEmailDto): Promise<{ email: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          email: props.email,
        });
      }, 500);
    });
  },
};
