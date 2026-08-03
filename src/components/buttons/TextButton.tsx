import { Button } from '@chakra-ui/react';

export type Props = {
  text: string;
  onClick: () => void;
};

export const TextButton = ({ text, onClick }: Props) => {
  return (
    <Button
      variant="plain"
      h="auto"
      p="0"
      minW="unset"
      minH="unset"
      fontSize="md"
      _hover={{ textDecoration: 'underline' }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
