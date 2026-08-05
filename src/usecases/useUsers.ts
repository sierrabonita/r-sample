import { useQuery } from '@tanstack/react-query';
import { userRepository } from '@/repositories/userRepository';
import type { User } from '@/schemas/user';

export const useGetUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: userRepository.getUsers,
  });
};
