import { BiSolidCameraMovie } from 'react-icons/bi';
import { Heading, HStack } from '@chakra-ui/react';

export const Header = () => {
  return (
    <>
      <HStack px="4" py="2" backgroundColor="brown">
        <BiSolidCameraMovie color="pink" size="48" />
        <Heading fontSize="4xl" fontWeight="bold" color="white">
          Cinema Review
        </Heading>
      </HStack>
    </>
  );
};
