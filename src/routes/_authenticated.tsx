import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Box, Flex } from '@chakra-ui/react';
import { AuthHeader } from '@/components/common/headers/AuthHeader';

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <Flex direction="column" minHeight="100vh">
      <AuthHeader />
      <Box as="main" flex="1" p="8">
        <Outlet />
      </Box>
    </Flex>
  );
}
