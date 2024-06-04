import PaginationWithPageSizeSelectorWrapper from "@/components/PaginationWithPageSizeSelectorWrapper";
import { PermissionVerify } from "@/components/PermissionVerify";
import { useDeleteMeasurementUnitMutation, useGetAllMeasurementUnitQuery } from "@/redux/services/measurement_unit";
import { MeasurementUnit } from "@/types/measurement_unit";
import { ActionIcon, Group, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React from "react";


interface ShowDataInterface {
  addEditData: (arg: MeasurementUnit) => void;
}

const ShowData: React.FC<ShowDataInterface> = ({ addEditData }) => {

  const { data: attributes } = useGetAllMeasurementUnitQuery();

  const [deleteUser] = useDeleteMeasurementUnitMutation();

  const handleDelete = (id: number): void => {
    deleteUser(id).unwrap()
      .then(() => { notifications.show({ message: 'Attribute deleted successfully', }) })
      .catch((error: { message: string }) => { notifications.show({ message: error.message, color: 'red' }) })
  }

  return (
    <>
      <PaginationWithPageSizeSelectorWrapper
        headColumns={[
          { accessor: 'id', width: 100 },
          { accessor: 'title' },
          { accessor: 'value' },
          // { accessor: 'create_time', },
          // { accessor: 'update_time' },
          {
            accessor: 'actions',
            title: <Text mr="xs">actions</Text>,
            textAlignment: 'right',
            render: (data: MeasurementUnit) => (
              <Group spacing={4} position="right" noWrap>
                <PermissionVerify havePermission="update_attribute">
                  <ActionIcon color="sky" onClick={() => addEditData(data)}>
                    <IconEdit size={20} />
                  </ActionIcon>
                </PermissionVerify>

                <PermissionVerify havePermission="delete_attribute">
                  <ActionIcon color="red" onClick={() => handleDelete(data.id)}>
                    <IconTrash size={20} />
                  </ActionIcon>
                </PermissionVerify>
              </Group>
            ),
          },
        ]}
        datas={attributes || []}
      />
    </>
  )
}

export default ShowData;