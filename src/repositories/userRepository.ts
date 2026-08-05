import type { User } from '@/schemas/user';

const dummyUsers: User[] = [
  {
    id: 1,
    slug: 'user1',
    name: 'ユーザー1',
    email: 'test@test.com',
    role: 0,
    createdAt: '2026-07-27',
  },
  {
    id: 2,
    slug: 'user2',
    name: 'ユーザー2',
    email: 'test@test.com',
    role: 1,
    createdAt: '2026-07-27',
  },
];

export const userRepository = {
  getUsers: async (): Promise<User[]> => {
    // API通信を模した疑似非同期処理
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyUsers);
      }, 500); // 500ms遅延
    });
  },
};
