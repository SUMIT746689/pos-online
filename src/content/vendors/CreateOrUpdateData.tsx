import { Box, Button, Group, LoadingOverlay, Modal, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useForm } from '@mantine/form';
import { notifications } from "@mantine/notifications";
import { FormSubmitButtonWrapper } from "@/components/ButtonWrapper";
import { CreateVendor, Vendor } from "@/types/vendor";
import { useCreateVendorMutation, useUpdateVendorMutation } from "@/redux/services/vendor";
import { PermissionVerify } from "@/components/PermissionVerify";

interface CreateOrUpdateDataInterFace {
  editData: Vendor | null | undefined;
  addEditVendor: (arg: null) => void;
}

// interface FormInterface {
//   editData: any | undefined | null;
//   handleModalClose: () => void;
// }

const CreateOrUpdateData: React.FC<CreateOrUpdateDataInterFace> = ({ editData, addEditVendor }) => {
  console.log({ editData })

  const [open, setOpen] = useState(false);

  const [createVendor, { isLoading: isCreateLoading }] = useCreateVendorMutation()
  const [updateVendor, { isLoading: isUpdateLoading }] = useUpdateVendorMutation()


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

  const handleFormSubmit = (values: CreateVendor): void => {
    if (editData) {
      updateVendor({ id: editData.id, body: values })
        .unwrap()
        .then(() => {
          notifications.show({ message: 'Sucessfully Updated Vendor' });
          handleModalClose();
        })
        .catch((error: { data: string }) => { notifications.show({ message: error.data, color: 'red' }) })
    }
    else {
      createVendor(values).unwrap()
        .then(() => {
          notifications.show({ message: 'Sucessfully Created Vendor' });
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
    addEditVendor(null);
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
        <PermissionVerify havePermission="create_vendor">
          <Button onClick={() => { setOpen(true) }} className=" bg-orange-600 hover:bg-orange-700"> Create Vendor</Button>
        </PermissionVerify>
      </Group>

      <Modal opened={open} onClose={handleModalClose} title="Vendor" centered>
        {/* Modal content */}
        <Box maw={500} mx="auto" pos="relative" px={40}>
          <LoadingOverlay visible={isCreateLoading || isUpdateLoading} overlayBlur={2} />

          <form onSubmit={form.onSubmit((values: CreateVendor): void => handleFormSubmit(values))}>
            <TextInput
              withAsterisk
              label="Name"
              placeholder="vendor name..."
              {...form.getInputProps('name')}
            />
            <TextInput
              withAsterisk
              label="Address"
              placeholder="vendor Address..."
              {...form.getInputProps('address')}
            />
            <TextInput
              label="Email"
              placeholder="vendor email..."
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