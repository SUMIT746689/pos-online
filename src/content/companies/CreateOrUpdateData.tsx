import { Box, Button, Group, LoadingOverlay, Modal, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useForm } from '@mantine/form';
import { notifications } from "@mantine/notifications";
import { useCreateCompanyMutation, useUpdateCompanyMutation } from "@/redux/services/company";
import { Company, CreateCompany } from "@/types/company";
import { FormSubmitButtonWrapper } from "@/components/ButtonWrapper";
import { PermissionVerify } from "@/components/PermissionVerify";

interface CreateOrUpdateDataInterFace {
  editData: Company | null | undefined;
  addEditCompany: (arg: null) => void;
}

interface FormInterface {
  editData: Company | undefined | null;
  handleModalClose: () => void;
}

const CreateOrUpdateData: React.FC<CreateOrUpdateDataInterFace> = ({ editData, addEditCompany }) => {

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (editData) setOpen(true);
  }, [editData]);

  const handleModalClose = () => {
    setOpen(false);
    addEditCompany(null);
  }
  return (
    <>
      <Modal opened={open} onClose={handleModalClose} title="Company" centered>
        {/* Modal content */}
        <Form editData={editData} handleModalClose={handleModalClose} />
      </Modal>

      <Group position="center" pr={20} >
        <PermissionVerify havePermission="create_company">
          <Button onClick={() => { setOpen(true) }} className=" bg-orange-600 hover:bg-orange-700"> Create Company</Button>
        </PermissionVerify>
      </Group>
    </>
  )
}
const Form: React.FC<FormInterface> = ({ editData, handleModalClose }) => {
  const [createUser, { isLoading: isCreateLoading }] = useCreateCompanyMutation()
  const [updateUser, { isLoading: isUpdateLoading }] = useUpdateCompanyMutation()


  const form = useForm({
    initialValues: {
      name: "",
      domain: ""
    },
    validate: {
      name: (value) => (value ? null : 'Type your first name'),
      domain: (value) => (value ? null : 'Type your last name'),
    },
  });

  useEffect(() => {
    if (editData) {
      form.setValues((prev) => ({ ...prev, ...editData }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = (values: CreateCompany): void => {

    if (editData) {
      updateUser({ id: editData.id, body: values })
        .unwrap()
        .then(() => {
          notifications.show({ message: 'Sucessfully Updated' });
          handleModalClose();
        })
        .catch((error: { data: string }) => { notifications.show({ message: error.data, color: 'red' }) })
    }
    else {
      createUser(values).unwrap()
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
      <form onSubmit={form.onSubmit((values: CreateCompany): void => handleFormSubmit(values))} >


        <TextInput
          withAsterisk
          label="Name"
          placeholder="your company name..."
          {...form.getInputProps('name')}
        />
        <TextInput
          withAsterisk
          label="Damain"
          placeholder="your domain url..."
          {...form.getInputProps('domain')}
        />

        <FormSubmitButtonWrapper>
          Submit
        </FormSubmitButtonWrapper>
      </form>
    </Box>
  );
}

export default CreateOrUpdateData;