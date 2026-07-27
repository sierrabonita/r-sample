import { Box, Table, Text } from '@chakra-ui/react';
import { IoOptions } from 'react-icons/io5';

type User = {
  id: string;
  name: string;
  email: string;
  role: number;
  createdAt: string;
};

const getRoleLabel = (role: number) => {
  switch (role) {
    case 0:
      return '一般';
    case 1:
      return '管理';
    default:
      return '不明';
  }
};

export const UserTable = ({ users }: { users: User[] }) => {
  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>名前</Table.ColumnHeader>
            <Table.ColumnHeader>メールアドレス</Table.ColumnHeader>
            <Table.ColumnHeader>権限</Table.ColumnHeader>
            <Table.ColumnHeader>登録日時</Table.ColumnHeader>
            <Table.ColumnHeader></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.length > 0 ? (
            users.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{getRoleLabel(user.role)}</Table.Cell>
                <Table.Cell>{user.createdAt}</Table.Cell>
                <Table.Cell>
                  <Box cursor="pointer" onClick={() => {}}>
                    <IoOptions />
                  </Box>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Text>ユーザーがいません</Text>
          )}
        </Table.Body>
      </Table.Root>
    </>
  );
};
