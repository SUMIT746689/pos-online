import PaginationWithPageSizeSelectorWrapper from "@/components/PaginationWithPageSizeSelectorWrapper";
import { PermissionVerify } from "@/components/PermissionVerify";
import { useDeleteUserMutation, useGetAllUsersQuery } from "@/redux/services/user";
import { User } from "@/types/users";
import { ActionIcon, Group, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React from "react";


interface ShowDataInterface {
  // setEditUser: React.Component<User,User>
  // setEditUser: any;
  addEditData: (arg: User) => void;
}

const ShowData: React.FC<ShowDataInterface> = ({ addEditData }) => {

  const { data: users } = useGetAllUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = (id: number): void => {
    deleteUser(id).unwrap()
      .then(() => { notifications.show({ message: 'deleted successfully', }) })
      .catch((error: { message: string }) => { notifications.show({ message: error.message, color: 'red' }) })
  }

  return (
    <>
      
        <PaginationWithPageSizeSelectorWrapper
          headColumns={[
            { accessor: 'id', width: 100 },
            { accessor: 'first_name' },
            { accessor: 'last_name' },
            { accessor: 'username' },
            { accessor: 'email' },
            // { accessor: 'role.title' },
            { accessor: 'phone_number' },
            {
              accessor: 'actions',
              title: <Text mr="xs">Row actions</Text>,
              textAlignment: 'right',
              render: (data: User) => (
                <Group spacing={4} position="right" noWrap>
                  <PermissionVerify havePermission="update_user">
                    <ActionIcon color="sky" onClick={() => addEditData(data)}>
                      <IconEdit size={20} />
                    </ActionIcon>
                  </PermissionVerify>
                  <PermissionVerify havePermission="delete_user">
                    <ActionIcon color="red" onClick={() => handleDelete(data.id)}>
                      <IconTrash size={20} />
                    </ActionIcon>
                  </PermissionVerify>
                </Group>
              ),
            },
          ]}
          datas={users || []}
        />
    </>
  )
}

export default ShowData;