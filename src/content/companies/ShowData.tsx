import PaginationWithPageSizeSelectorWrapper from "@/components/PaginationWithPageSizeSelectorWrapper";
import { PermissionVerify } from "@/components/PermissionVerify";
import { useDeleteCompanyMutation, useGetAllCompaniesQuery } from "@/redux/services/company";
import { Company } from "@/types/company";
import { ActionIcon, Group, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React from "react";


interface ShowDataInterface {
  addEditData: (arg: Company) => void;
}

const ShowData: React.FC<ShowDataInterface> = ({ addEditData }) => {

  const { data: companies } = useGetAllCompaniesQuery();

  const [deleteUser] = useDeleteCompanyMutation();

  const handleDelete = (id: number): void => {
    deleteUser(id).unwrap()
      .then(() => { notifications.show({ message: 'Company deleted successfully', }) })
      .catch((error: { message: string }) => { notifications.show({ message: error.message, color: 'red' }) })
  }

  return (
    <>
      <PaginationWithPageSizeSelectorWrapper
        headColumns={[
          { accessor: 'id', width: 100 },
          { accessor: 'name' },
          { accessor: 'domain' },
          { accessor: 'create_time', },
          { accessor: 'update_time' },
          {
            accessor: 'actions',
            title: <Text mr="xs">actions</Text>,
            textAlignment: 'right',
            render: (data: Company) => (
              <Group spacing={4} position="right" noWrap>
                <PermissionVerify havePermission="update_company">
                  <ActionIcon color="sky" onClick={() => addEditData(data)}>
                    <IconEdit size={20} />
                  </ActionIcon>
                </PermissionVerify>
                <PermissionVerify havePermission="delete_company">
                  <ActionIcon color="red" onClick={() => handleDelete(data.id)}>
                    <IconTrash size={20} />
                  </ActionIcon>
                </PermissionVerify>
              </Group>
            ),
          },
        ]}
        datas={companies || []}
      />
    </>
  )
}

export default ShowData;