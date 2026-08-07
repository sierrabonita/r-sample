import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormField } from '@/components/forms/FormField';
import { TextButton } from '@/components/buttons/TextButton';
import { toaster } from '@/libs/chakra/toaster';
import { Box, Button, Flex, Heading, Input, Stack } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import { type LoginDto, loginSchema } from '@/schemas/auth';
import type { DialogInHeaderType } from '@/types/dialogs';
import { useLogin } from '@/usecases/useAuth';

type Props = {
  setDialogType: (type: DialogInHeaderType | null) => void;
};

export const LoginForm = ({ setDialogType }: Props) => {
  const navigate = useNavigate();
  const { mutateAsync: login, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginDto>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginDto) => {
    const result = await login(data);

    // oxlint-disable-next-line no-console
    console.log('result: ', result);

    if (error) {
      toaster.create({
        title: 'ログイン失敗',
        description: error.message,
        type: 'error',
      });
      return;
    }

    toaster.create({
      title: 'ログイン成功',
      description: `${result.name}さん、ようこそ！`,
      type: 'success',
    });

    if (result.role === 1) {
      navigate({ to: '/admin' });
    } else {
      navigate({ to: '/home' });
    }
  };

  return (
    <Stack p={8} gap={6}>
      <Heading size="xl" textAlign="center">
        ログイン
      </Heading>

      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          <FormField
            label="メールアドレス"
            invalid={!!errors.email}
            errorText={errors.email?.message}
          >
            <Input type="email" placeholder="example@test.com" {...register('email')} />
          </FormField>

          <FormField
            label="パスワード"
            invalid={!!errors.password}
            errorText={errors.password?.message}
          >
            <Input type="password" placeholder="パスワードを入力" {...register('password')} />
          </FormField>

          <Button type="submit" colorScheme="blue" width="full" mt={4} loading={isSubmitting}>
            ログインする
          </Button>
        </Stack>
      </Box>

      <Flex justifyContent="right">
        <TextButton text="新規登録はこちら" onClick={() => setDialogType('signup')} />
      </Flex>
    </Stack>
  );
};
