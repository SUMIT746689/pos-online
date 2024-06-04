import PaginationWithPageSizeSelectorWrapper from "@/components/PaginationWithPageSizeSelectorWrapper";
import { PermissionVerify } from "@/components/PermissionVerify";
import { useDeleteCategoryMutation, useGetAllCategoryQuery } from "@/redux/services/category";
import { Brand } from "@/types/brand";
import { ActionIcon, Group, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React from "react";


interface ShowDataInterface {
  addEditData: (arg: Brand) => void;
}

const ShowData: React.FC<ShowDataInterface> = ({ addEditData }) => {

  const { data: categories } = useGetAllCategoryQuery("with_sub_category=true");

  const [deleteUser] = useDeleteCategoryMutation();

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
          { accessor: 'title' },
          // { accessor: 'create_time', },
          // { accessor: 'update_time' },
          {
            accessor: 'actions',
            title: <Text mr="xs">actions</Text>,
            textAlignment: 'right',
            render: (data: Brand) => (
              <Group spacing={4} position="right" noWrap>
                <PermissionVerify havePermission="update_category">
                  <ActionIcon color="sky" onClick={() => addEditData(data)}>
                    <IconEdit size={20} />
                  </ActionIcon>
                </PermissionVerify>

                <PermissionVerify havePermission="delete_category">
                  <ActionIcon color="red" onClick={() => handleDelete(data.id)}>
                    <IconTrash size={20} />
                  </ActionIcon>
                </PermissionVerify>
              </Group>
            ),
          },
        ]}
        datas={categories || []}
      />
    </>
  )
}

export default ShowData;