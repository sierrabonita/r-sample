import { createFileRoute } from '@tanstack/react-router';
import { Box, Center, HStack, Heading, List, Spinner, Text } from '@chakra-ui/react';

export const Route = createFileRoute('/_authenticated/home/')({
  component: Home,
});

// ダミーデータ
const fetching = false;
const data = {
  reviews: [
    {
      id: 1,
      content: 'レビュー・コメント',
      isSpoiler: 0,
      createdAt: '2026-07-25',
      user: { name: 'ユーザー名' },
      movie: { title: '映画タイトル' },
    },
  ],
};

function Home() {
  if (fetching) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  const reviews = data?.reviews ?? [];

  if (!reviews.length) {
    return <Box>レビューがありません</Box>;
  }

  return (
    <Box>
      <Heading mb={4}>レビュー履歴</Heading>
      <List.Root>
        {reviews.map((review) => (
          <>
            <List.Item pb="1rem" listStyle="none">
              <HStack justifyContent="start">
                <Text fontSize="xs">{review.createdAt}</Text>
                <Text fontWeight="bold" fontSize="md">
                  {review.movie.title}
                </Text>
                <Text>{review.content}</Text>
              </HStack>
            </List.Item>
          </>
        ))}
      </List.Root>
    </Box>
  );
}
