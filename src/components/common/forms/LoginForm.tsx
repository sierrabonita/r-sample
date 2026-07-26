import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormField } from '@/components/common/forms/FormField';
import { TextButton } from '@/components/common/buttons/TextButton';
import { toaster } from '@/components/ui/toaster';
import { Box, Button, Flex, Heading, Input, Stack } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';

import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email({ message: '無効なメールアドレス形式です' }),
  password: z.string().min(1, { message: 'パスワードを入力してください' }),
});

export type LoginDto = z.infer<typeof loginSchema>;

type LoginFormProps = {
  setDialogType: (type: 'signup' | 'login' | null) => void;
};

const LoginForm = ({ setDialogType }: LoginFormProps) => {
  const navigate = useNavigate();
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
    // TODO: API連携(下記はGraphQLを想定)
    // const result = await executeMutation({
    //   input: {
    //     email: data.email,
    //     password: data.password,
    //   },
    // });

    // oxlint-disable-next-line no-console
    console.log('data: ', data);

    // ダミーデータ
    const result = { data: { login: { user: { name: 'test', role: 0 } } } };

    // if (result.error) {
    //   toaster.create({
    //     title: 'ログイン失敗',
    //     description: result.error.message,
    //     type: 'error',
    //   });
    //   return;
    // }

    if (result.data?.login) {
      toaster.create({
        title: 'ログイン成功',
        description: `${result.data.login.user.name}さん、ようこそ！`,
        type: 'success',
      });

      // TODO: リンク修正
      if (result.data.login.user.role === 1) {
        navigate({ to: '/' });
      } else {
        navigate({ to: '/' });
      }
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

export default LoginForm;
