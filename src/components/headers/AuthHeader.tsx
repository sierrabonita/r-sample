import { Link, useNavigate } from '@tanstack/react-router';
import { Badge, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { USER_ROLES } from '@/types/roles';
import { useState } from 'react';
import { ConfirmDialog } from '../dialogs/ConfirmDialog';
import { useAuthUser, useLogout } from '@/usecases/useAuth';

export const AuthHeader = () => {
  const { data: user, isLoading } = useAuthUser();
  const { mutateAsync: logout } = useLogout();
  const navigate = useNavigate();

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleClickAccept = async () => {
    try {
      setIsLoggingOut(true);

      await logout();
      navigate({ to: '/' });
    } catch (error) {
      // oxlint-disable-next-line no-console
      console.error('ログアウト中にエラーが発生しました:', error);
      setIsLoggingOut(false);
    }
  };

  const isAdmin = user?.role === USER_ROLES.ADMIN;

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
          {!isLoading && user && (
            <Text fontSize="sm" color="gray.800">
              {user.name}さん
            </Text>
          )}

          <Button onClick={() => setIsOpenDialog(true)} variant="outline">
            ログアウト
          </Button>
        </Flex>
      </Flex>
      <ConfirmDialog
        body="ログアウトします。よろしいですか？"
        title="ログアウト確認"
        isOpen={isOpenDialog}
        isLoading={isLoggingOut}
        onClickConfirm={handleClickAccept}
        onOpenChange={setIsOpenDialog}
      />
    </>
  );
};
