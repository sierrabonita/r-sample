import { createFileRoute } from '@tanstack/react-router';
import { Center, Container, Heading, Spinner } from '@chakra-ui/react';
import { UserTable } from '@/components/pages/admin/UserTable';

export const Route = createFileRoute('/admin/')({
  component: Admin,
});

// ダミーデータ
const fetching = false;
const users = [
  {
    id: '1',
    name: 'ユーザー1',
    email: 'test@test.com',
    role: 0,
    createdAt: '2026-07-27',
  },
  {
    id: '2',
    name: 'ユーザー2',
    email: 'test@test.com',
    role: 1,
    createdAt: '2026-07-27',
  },
];

function Admin() {
  if (fetching) {
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
