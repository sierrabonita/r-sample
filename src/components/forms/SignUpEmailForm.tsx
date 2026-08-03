import { USER_ROLES } from '@/types/roles';
import { type CreateUserDto, createUserSchema } from '@/schemas/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuMailCheck } from 'react-icons/lu';
import { TextButton } from '@/components/buttons/TextButton';
import { FormField } from '@/components/forms/FormField';
import { toaster } from '@/libs/chakra/toaster';
import { Box, Button, Center, Flex, Heading, Input, Stack, Text } from '@chakra-ui/react';

type Props = {
  setDialogType: (type: 'login' | 'signup' | null) => void;
};

export const SignUpEmailForm = ({ setDialogType }: Props) => {
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<CreateUserDto>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      role: USER_ROLES.NORMAL,
    },
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = async (data: CreateUserDto) => {
    // const result = await executeMutation({
    //   input: {
    //     email: data.email,
    //     password: data.password,
    //     name: data.name,
    //     role: data.role,
    //   },
    // });

    // oxlint-disable-next-line no-console
    console.log('data: ', data);

    // ダミー
    const result = { data: { sendVerificationEmail: true } };

    // if (result.error) {
    //   toaster.create({
    //     title: '登録メール送信失敗',
    //     description: result.error.message,
    //     type: 'error',
    //   });
    //   return;
    // }

    if (result.data?.sendVerificationEmail) {
      setIsSent(true);
      toaster.create({
        title: '認証メール送信完了',
        description: '入力されたメールアドレスに登録案内を送信しました。',
        type: 'success',
      });
    }
  };

  if (isSent) {
    return (
      <Stack p={8} gap={6} align="center" textAlign="center">
        <Center w="16" h="16" borderRadius="full" bg="green.50">
          <LuMailCheck size={40} color="green" />
        </Center>
        <Heading size="xl">仮登録完了</Heading>
        <Text color="gray.600">
          <strong>{getValues('email')}</strong> 宛てに認証メールを送信しました。
        </Text>
        <Text fontSize="sm" color="gray.500">
          メール内の確認リンクをクリックして、新規登録を完了してください。
          <br />
          ※確認リンクの有効期限は1時間です。
        </Text>
      </Stack>
    );
  }

  return (
    <Stack p={8} gap={6}>
      <Heading size="xl" textAlign="center">
        新規登録
      </Heading>

      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          <FormField label="名前" invalid={!!errors.name} errorText={errors.name?.message}>
            <Input placeholder="名前を入力" {...register('name')} />
          </FormField>

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
            新規登録する
          </Button>
        </Stack>
      </Box>
      <Flex justifyContent="right">
        <TextButton text="登録済の方はこちら" onClick={() => setDialogType('login')} />
      </Flex>
    </Stack>
  );
};
