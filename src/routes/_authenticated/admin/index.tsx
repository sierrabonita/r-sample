import { createFileRoute } from '@tanstack/react-router';
import { Center, Container, Heading, Spinner } from '@chakra-ui/react';
import { UserTable } from '@/components/tables/UserTable';
import { useGetUsers } from '@/usecases/useUsers';

export const Route = createFileRoute('/_authenticated/admin/')({
  component: Admin,
});

function Admin() {
  const { data: users = [], isLoading } = useGetUsers();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Container>
      <Heading mb={4}>ユーザー一覧</Heading>
      <UserTable users={users} />
    </Container>
  );
}
