import { createFileRoute } from '@tanstack/react-router';
import { Container } from '@chakra-ui/react';
import { Header } from '@/components/headers/Header';
import { ReviewList } from '@/components/lists/ReviewList';
import { useGetReviews } from '@/usecases/useReviews';

export const Route = createFileRoute('/')({
  component: Top,
});

function Top() {
  const { data: reviews = [] } = useGetReviews();

  return (
    <>
      <Header />
      <Container maxW="lg">
        <ReviewList reviews={reviews} />
      </Container>
    </>
  );
}
