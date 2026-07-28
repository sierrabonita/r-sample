import { BiSolidCameraMovie } from 'react-icons/bi';
import { useState } from 'react';
import { Heading, HStack } from '@chakra-ui/react';
import { TextButton } from '@/components/common/buttons/TextButton';
import { SimpleDialog } from '@/components/common/dialogs/SimpleDialog';
import { LoginForm } from '@/components/common/forms/LoginForm';
import { SignUpEmailForm } from '@/components/common/forms/SignUpEmailForm';
import type { DialogInHeaderType } from '@/types/dialogs';

export const Header = () => {
  const [dialogType, setDialogType] = useState<DialogInHeaderType | null>(null);
  const isDialogOpen = dialogType !== null;
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setDialogType(null);
    }
  };

  return (
    <>
      <HStack px="4" py="2" justifyContent="flex-end" alignItems="center">
        <TextButton text="新規登録" onClick={() => setDialogType('signup')} />
        <TextButton text="ログイン" onClick={() => setDialogType('login')} />
      </HStack>
      <HStack px="4" py="2" backgroundColor="brown">
        <BiSolidCameraMovie color="pink" size="48" />
        <Heading fontSize="4xl" fontWeight="bold" color="white">
          Cinema Review
        </Heading>
      </HStack>
      <SimpleDialog isOpen={isDialogOpen} onOpenChange={handleOpenChange}>
        {dialogType === 'login' && <LoginForm setDialogType={setDialogType} />}
        {dialogType === 'signup' && <SignUpEmailForm setDialogType={setDialogType} />}
      </SimpleDialog>
    </>
  );
};
