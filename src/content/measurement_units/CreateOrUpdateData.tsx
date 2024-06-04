import { Box, Button, Group, LoadingOverlay, Modal, NumberInput, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useForm } from '@mantine/form';
import { notifications } from "@mantine/notifications";
import { FormSubmitButtonWrapper } from "@/components/ButtonWrapper";
import { PermissionVerify } from "@/components/PermissionVerify";
import { CreateMeasurementUnit, MeasurementUnit } from "@/types/measurement_unit";
import { useCreateMeasurementUnitMutation, useUpdateMeasurementUnitMutation } from "@/redux/services/measurement_unit";

interface CreateOrUpdateDataInterFace {
  editData: MeasurementUnit | null | undefined;
  addEditBrand: (arg: null) => void;
}

interface FormInterface {
  editData: MeasurementUnit | undefined | null;
  handleModalClose: () => void;
}

const CreateOrUpdateData: React.FC<CreateOrUpdateDataInterFace> = ({ editData, addEditBrand }) => {

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (editData) setOpen(true);
  }, [editData]);

  const handleModalClose = () => {
    setOpen(false);
    addEditBrand(null);
  }

  return (
    <>
      <Modal opened={open} onClose={handleModalClose} title="Measurement Unit" centered>
        {/* Modal content */}
        <Form editData={editData} handleModalClose={handleModalClose} />
      </Modal>

      <Group position="center" pr={20} >
        <PermissionVerify havePermission="create_measurement_unit">
          <Button onClick={() => { setOpen(true) }} className=" bg-orange-600 hover:bg-orange-700"> Create Measurement Unit</Button>
        </PermissionVerify>
      </Group>
    </>
  )
}

const Form: React.FC<FormInterface> = ({ editData, handleModalClose }) => {
  const [createMeasurementUnit, { isLoading: isCreateLoading }] = useCreateMeasurementUnitMutation()
  const [updateMeasurementUnit, { isLoading: isUpdateLoading }] = useUpdateMeasurementUnitMutation()


  const form = useForm({
    initialValues: {
      title: "",
      value: 0,
    },
    validate: {
      title: (value) => (value ? null : 'Type your measurement unit title'),
      value: (value) => (value ? null : 'Type your measurement unit value'),
    },
  });

  useEffect(() => {
    if (editData) {
      form.setValues((prev) => ({ ...prev, ...editData }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = (values: CreateMeasurementUnit): void => {
    console.log({values})
    if (editData) {
      updateMeasurementUnit({ id: editData.id, body: values })
        .unwrap()
        .then(() => {
          notifications.show({ message: 'Sucessfully Updated' });
          handleModalClose();
        })
        .catch((error: { data: string }) => { notifications.show({ message: error.data, color: 'red' }) })
    }
    else {
      createMeasurementUnit(values).unwrap()
        .then(() => {
          notifications.show({ message: 'Sucessfully Created' });
          handleModalClose();
        })
        .catch((error: { data: string }) => { notifications.show({ message: error.data, color: 'red' }) })
    }
  }

  return (
    <Box maw={500} mx="auto" pos="relative" px={40}>
      <LoadingOverlay visible={isCreateLoading || isUpdateLoading} overlayBlur={2} />
      <form onSubmit={form.onSubmit((values: CreateMeasurementUnit): void => handleFormSubmit(values))} >


        <TextInput
          withAsterisk
          label="Title"
          placeholder="type title..."
          {...form.getInputProps('title')}
        />

        <NumberInput
          withAsterisk
          // precision={3}
          type="number"
          label="Value"
          placeholder="type value..."
          {...form.getInputProps('value')}
        />

        <FormSubmitButtonWrapper>
          Submit
        </FormSubmitButtonWrapper>
      </form>
    </Box>
  );
}

export default CreateOrUpdateData;