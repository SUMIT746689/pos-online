import { Box, Button, Group, LoadingOverlay, Modal, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useForm } from '@mantine/form';
import { notifications } from "@mantine/notifications";
import { FormSubmitButtonWrapper } from "@/components/ButtonWrapper";
import { CreateSupplier, Supplier } from "@/types/supplier";
import { useCreateSupplierMutation, useUpdateSupplierMutation } from "@/redux/services/supplier";
import { PermissionVerify } from "@/components/PermissionVerify";

interface CreateOrUpdateDataInterFace {
  editData: Supplier | null | undefined;
  addEditSupplier: (arg: null) => void;
}

// interface FormInterface {
//   editData: any | undefined | null;
//   handleModalClose: () => void;
// }

const CreateOrUpdateData: React.FC<CreateOrUpdateDataInterFace> = ({ editData, addEditSupplier }) => {
  console.log({ editData })

  const [open, setOpen] = useState(false);

  const [createSupplier, { isLoading: isCreateLoading }] = useCreateSupplierMutation()
  const [updateSupplier, { isLoading: isUpdateLoading }] = useUpdateSupplierMutation()


  const form = useForm({
    initialValues: {
      name: "",
      address: "",
      email: "",
      representative: {
        name: "",
        phone: ""
      }
    },
    validate: {
      name: (value) => (value ? null : 'Type supplier name'),
      address: (value) => (value ? null : 'Type supplier address'),
      email: (value) => (!value || /^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      representative: {
        name: (value) => (value ? null : 'Type representater name'),
        phone: (value) => (value ? null : 'Type representater phone'),
      }
    },
  });

  useEffect(() => {
    if (editData) {
      form.setValues((values) => ({ ...values, ...editData }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);

  const handleFormSubmit = (values: CreateSupplier): void => {
    console.log({ values })
    if (editData) {
      updateSupplier({ id: editData.id, body: values })
        .unwrap()
        .then(() => {
          notifications.show({ message: 'Sucessfully Updated' });
          handleModalClose();
        })
        .catch((error: { data: string }) => { notifications.show({ message: error.data, color: 'red' }) })
    }
    else {
      createSupplier(values).unwrap()
        .then(() => {
          notifications.show({ message: 'Sucessfully Created' });
          handleModalClose();
        })
        .catch((error: { data: string }) => { notifications.show({ message: error.data, color: 'red' }) })
    }
  }

  useEffect(() => {
    if (editData) setOpen(true);
  }, [editData]);

  const handleModalClose = () => {
    setOpen(false);
    addEditSupplier(null);
    form.reset();
  }

  const handleChange = (v: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = v.target;
    form.setValues((values: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const copyRepresentative = { ...values.representative };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      copyRepresentative[name] = value
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return { ...values, representative: { ...copyRepresentative } };
    });
  }

  return (
    <>
      <Group position="center" pr={20} >
        <PermissionVerify havePermission="create_supplier">
          <Button onClick={() => { setOpen(true) }} className=" bg-orange-600 hover:bg-orange-700"> Create Supplier</Button>
        </PermissionVerify>
      </Group>

      <Modal opened={open} onClose={handleModalClose} title="Supplier" centered>
        {/* Modal content */}
        <Box maw={500} mx="auto" pos="relative" px={40}>
          <LoadingOverlay visible={isCreateLoading || isUpdateLoading} overlayBlur={2} />

          <form onSubmit={form.onSubmit((values: CreateSupplier): void => handleFormSubmit(values))}>
            <TextInput
              withAsterisk
              label="Name"
              placeholder="Supplier name..."
              {...form.getInputProps('name')}
            />
            <TextInput
              withAsterisk
              label="Address"
              placeholder="Supplier Address..."
              {...form.getInputProps('address')}
            />
            <TextInput
              label="Email"
              placeholder="Supplier email..."
              {...form.getInputProps('email')}
            />
            <TextInput
              withAsterisk
              name="name"
              label="Representative name"
              placeholder="representative name..."
              error={form.errors?.["representative.name"]}
              // {...form.getInputProps('representative.name')}
              value={form.values.representative?.name}
              onChange={handleChange}
            />
            <TextInput
              withAsterisk
              name="phone"
              label="Representative phone"
              placeholder="representative phone..."
              error={form.errors?.["representative.phone"]}
              value={form.values.representative?.phone}
              onChange={handleChange}
            // {...form.getInputProps('representative.phone')}
            />
            <FormSubmitButtonWrapper>
              Submit
            </FormSubmitButtonWrapper>
          </form>

        </Box>
      </Modal>

    </>
  )
}


export default CreateOrUpdateData;