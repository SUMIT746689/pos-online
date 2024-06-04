import PaginationWithPageSizeSelectorWrapper from "@/components/PaginationWithPageSizeSelectorWrapper";
import { PermissionVerify } from "@/components/PermissionVerify";
import { useDeleteVendorMutation, useGetAllVendorsQuery } from "@/redux/services/vendor";
import { Vendor } from "@/types/vendor";
import { ActionIcon, Group, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React from "react";


interface ShowDataInterface {
  addEditData: (arg: Vendor) => void;
}

const ShowData: React.FC<ShowDataInterface> = ({ addEditData }) => {

  const { data: vendors } = useGetAllVendorsQuery();
  const [deleteVendor] = useDeleteVendorMutation();

  const handleDelete = (id: number): void => {
    deleteVendor(id).unwrap()
      .then(() => { notifications.show({ message: 'Supplier deleted successfully', }) })
      .catch((error: { message: string }) => { notifications.show({ message: error.message, color: 'red' }) })
  }

  const headColumns = [
    { accessor: 'name' },
    { accessor: 'address' },
    { accessor: 'email' },
    { accessor: 'representative.name' },
    { accessor: 'representative.phone', },
    {
      accessor: 'actions',
      title: <Text mr="xs">actions</Text>,
      textAlignment: 'right',
      render: (data: Vendor) => (
        <Group spacing={4} position="right" noWrap>
          <PermissionVerify havePermission="update_vendor">
            <ActionIcon color="sky" onClick={() => addEditData(data)}>
              <IconEdit size={20} />
            </ActionIcon>
          </PermissionVerify>

          <PermissionVerify havePermission="delete_vendor">
            <ActionIcon color="red" onClick={() => handleDelete(data.id)}>
              <IconTrash size={20} />
            </ActionIcon>
          </PermissionVerify>
        </Group>
      ),
    },
  ]

  return (
    <>
      <PaginationWithPageSizeSelectorWrapper
        headColumns={headColumns}
        datas={vendors || []}
      />
    </>
  )
}

export default ShowData;