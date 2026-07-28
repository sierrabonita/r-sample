import { Heading, Stack, Flex } from '@chakra-ui/react';
import { TextButton } from '@/components/common/buttons/TextButton';
import type { DialogInHeaderType } from '@/types/dialogs';

type Props = {
  setDialogType: (type: DialogInHeaderType | null) => void;
};

export const SignUpEmailForm = ({ setDialogType }: Props) => {
  return (
    <Stack p={8} gap={6}>
      <Heading size="xl" textAlign="center">
        新規登録
      </Heading>
      <Flex justifyContent="right">
        <TextButton text="ログインはこちら" onClick={() => setDialogType('login')} />
      </Flex>
    </Stack>
  );
};
