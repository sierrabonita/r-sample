import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Box } from '@chakra-ui/react';

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <>
      <Box as="main" p={4}>
        <Outlet />
      </Box>
    </>
  );
}
