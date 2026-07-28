import { Box, Table, Text } from '@chakra-ui/react';
import { IoOptions } from 'react-icons/io5';
import { useState } from 'react';
import { SimpleDialog } from '@/components/common/dialogs/SimpleDialog';
import { UpdateUserRoleForm } from '@/components/common/forms/UpdateUserRoleForm';
import type { User } from '@/schemas/user';

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
  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleOnClick = (user: User) => {
    setSelectedUser(user);
    setIsOpenEditDialog(true);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpenEditDialog(open);
    if (!open) {
      setSelectedUser(null);
      setIsOpenEditDialog(false);
    }
  };

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
                  <Box cursor="pointer" onClick={() => handleOnClick(user)}>
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
      <SimpleDialog isOpen={isOpenEditDialog} onOpenChange={handleOpenChange}>
        {selectedUser && (
          <UpdateUserRoleForm
            user={{ id: selectedUser.id, role: selectedUser.role }}
            onSuccess={() => handleOpenChange(false)}
          />
        )}
      </SimpleDialog>
    </>
  );
};
