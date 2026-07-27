import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Box, Button, Heading, NativeSelect, Stack } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import { toaster } from '@/components/ui/toaster';
import { FormField } from '@/components/common/forms/FormField';
import { USER_ROLES } from '@/types/roles';
import { type UpdateUserRoleDto, updateUserRoleSchema } from '@/schemas/user';

export const UpdateUserRoleForm = ({
  user,
  onSuccess,
}: {
  user: {
    id: number;
    role: 0 | 1;
  };
  onSuccess?: () => void;
}) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserRoleDto>({
    defaultValues: {
      id: user.id,
      role: user.role,
    },
    resolver: zodResolver(updateUserRoleSchema),
  });

  const onSubmit = async (data: UpdateUserRoleDto) => {
    // TODO: API連携(下記はGraphQLを想定)
    // const result = await executeMutation({
    //   input: {
    //     id: data.id,
    //     role: data.role,
    //   },
    // });

    // oxlint-disable-next-line no-console
    console.log('data', data);

    // ダミーデータ
    const result = {
      data: {
        updateUserRole: true,
      },
    };

    // if (result.error) {
    //   toaster.create({
    //     title: '更新失敗',
    //     description: result.error.message,
    //     type: 'error',
    //   });
    //   return;
    // }

    if (result.data?.updateUserRole) {
      toaster.create({
        title: '更新成功',
        description: 'ユーザー情報を更新しました',
        type: 'success',
      });

      onSuccess?.();
      navigate({ to: '/admin' });
    }
  };

  return (
    <Stack p={8} gap={6}>
      <Heading size="xl" textAlign="center">
        ユーザー情報更新
      </Heading>

      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          <FormField label="権限" invalid={!!errors.role} errorText={errors.role?.message}>
            <NativeSelect.Root>
              <NativeSelect.Field
                {...register('role', {
                  valueAsNumber: true,
                })}
              >
                <option value={USER_ROLES.NORMAL}>一般</option>
                <option value={USER_ROLES.ADMIN}>管理</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </FormField>

          <Button type="submit" colorScheme="blue" width="full" mt={4} loading={isSubmitting}>
            更新する
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};
