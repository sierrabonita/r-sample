import { Link } from '@tanstack/react-router';
import { Badge, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { USER_ROLES } from '@/types/roles';

export const AuthHeader = () => {
  // ダミー
  const data = { name: 'test', role: USER_ROLES.ADMIN };
  const fetching = false;

  const isAdmin = data.role === USER_ROLES.ADMIN;

  return (
    <>
      <Flex
        as="header"
        width="100%"
        height="80px"
        alignItems="center"
        justifyContent="space-between"
        px={8}
        borderBottomWidth={1}
        bg="white"
        boxShadow="sm"
      >
        <Flex alignItems="center" gap={4}>
          <Heading size="md">
            <Link
              to={isAdmin ? '/admin' : '/home'}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Cinema Review
            </Link>
          </Heading>
          {isAdmin && (
            <Badge
              color="red.600"
              bg="red.50"
              borderWidth={1}
              borderColor="red.200"
              px={2}
              py={0.5}
              borderRadius="md"
            >
              管理者
            </Badge>
          )}
        </Flex>

        <Flex alignItems="center" gap={6}>
          {!fetching && data && (
            <Text fontSize="sm" color="gray.800">
              {data.name}さん
            </Text>
          )}

          <Button onClick={() => {}} variant="outline">
            ログアウト
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
