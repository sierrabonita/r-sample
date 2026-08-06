import { useQuery } from '@tanstack/react-query';
import { reviewRepository } from '@/repositories/reviewRepository';
import type { Review } from '@/types/review';

export const useGetReviews = () => {
  return useQuery<Review[]>({
    queryKey: ['reviews'],
    queryFn: reviewRepository.getReviews,
  });
};
