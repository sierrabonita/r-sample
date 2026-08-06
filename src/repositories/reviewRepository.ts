import type { Review } from '@/types/review';

const dummyReview = [
  {
    id: 1,
    content: 'レビュー・コメント',
    isSpoiler: 0,
    createdAt: '2026-07-25',
    user: { name: 'ユーザー名' },
    movie: { title: '映画タイトル' },
  },
];

export const reviewRepository = {
  getReviews: async (): Promise<Review[]> => {
    // API通信を模した疑似非同期処理
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyReview);
      }, 500); // 500ms遅延
    });
  },
};
