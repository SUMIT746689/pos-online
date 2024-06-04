import PaginationWithPageSizeSelectorWrapper from "@/components/PaginationWithPageSizeSelectorWrapper";
import { PermissionVerify } from "@/components/PermissionVerify";
import { useDeleteBrandMutation, useGetAllBrandQuery } from "@/redux/services/brand";
import { Brand } from "@/types/brand";
import { ActionIcon, Group, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React from "react";


interface ShowDataInterface {
  addEditData: (arg: Brand) => void;
}

const ShowData: React.FC<ShowDataInterface> = ({ addEditData }) => {

  const { data: brands } = useGetAllBrandQuery();

  const [deleteBrand] = useDeleteBrandMutation();

  const handleDelete = (id: number): void => {
    deleteBrand(id).unwrap()
      .then(() => { notifications.show({ message: 'Brand deleted successfully', }) })
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
                <PermissionVerify havePermission="update_brand">
                  <ActionIcon color="sky" onClick={() => addEditData(data)}>
                    <IconEdit size={20} />
                  </ActionIcon>
                </PermissionVerify>

                <PermissionVerify havePermission="delete_brand">
                  <ActionIcon color="red" onClick={() => handleDelete(data.id)}>
                    <IconTrash size={20} />
                  </ActionIcon>
                </PermissionVerify>
              </Group>
            ),
          },
        ]}
        datas={brands || []}
      />
    </>
  )
}

export default ShowData;