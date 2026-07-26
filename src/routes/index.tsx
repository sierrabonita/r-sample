import { createFileRoute } from '@tanstack/react-router';
import { Container } from '@chakra-ui/react';
import { Header } from '@/components/pages/top/Header';
import { ReviewList } from '@/components/pages/top/ReviewList';

export const Route = createFileRoute('/')({
  component: Top,
});

// ダミーデータ
const reviews = [
  {
    id: 1,
    content: 'レビュー・コメント',
    isSpoiler: 0,
    createdAt: '2026-07-25',
    user: { name: 'ユーザー名' },
    movie: { title: '映画タイトル' },
  },
];

function Top() {
  return (
    <>
      <Header />
      <Container maxW="lg">
        <ReviewList reviews={reviews} />
      </Container>
    </>
  );
}
