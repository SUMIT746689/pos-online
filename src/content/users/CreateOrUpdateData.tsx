import { Box, Button, Grid, Group, LoadingOverlay, Modal, PasswordInput, Select, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useForm } from '@mantine/form';
import { useCreateUserMutation, useUpdateUserMutation } from "@/redux/services/user";
import { User } from "@/types/users";
// import { AuthUser } from "@/types/auth";
import { notifications } from "@mantine/notifications";
import { useCreateUserPermitRoleQuery } from "@/redux/services/role";
import { Role } from "@/types/role";
import { FormSubmitButtonWrapper } from "@/components/ButtonWrapper";
import { useGetAllCompaniesQuery } from "@/redux/services/company";
import { Company } from "@/types/company";
import { PermissionVerify } from "@/components/PermissionVerify";

interface CreateOrUpdateDataInterFace {
  editData: User | null | undefined;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setEditData: Function;
  // authUser: AuthUser | undefined;
}

interface CreateOrUpdateFormInterFace {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role_id: string;
  company_id: string;
}

const CreateOrUpdateData: React.FC<CreateOrUpdateDataInterFace> = ({ editData, setEditData }) => {


  const [open, setOpen] = useState(false);
  const { data: roles } = useCreateUserPermitRoleQuery();
  const { data: companies } = useGetAllCompaniesQuery();
  useEffect(() => {
    if (editData) setOpen(true);
  }, [editData]);

  const handleModalClose = () => {
    setOpen(false);
    setEditData(undefined)
  }
  return (
    <>
      <Modal opened={open} onClose={handleModalClose} title="User" centered>
        {/* Modal content */}
        <PermissionVerify havePermission="create_user" >
          <Form editData={editData} handleModalClose={handleModalClose} roles={roles || []} companies={companies || []} />
        </PermissionVerify>
      </Modal>

      <Group position="center" pr={20} >
        <Button onClick={() => { setOpen(true) }} className=" bg-orange-600 hover:bg-orange-700"> Create User</Button>
      </Group>
    </>
  )
}

interface FormInterface {
  editData: User | undefined | null;
  handleModalClose: () => void;
  roles: Role[] | [];
  companies: Company[] | []
}

const Form: React.FC<FormInterface> = ({ editData, handleModalClose, roles, companies }) => {
  const [createUser, { isLoading: isCreateLoading }] = useCreateUserMutation()
  const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation()

  const form = useForm({
    initialValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      username: '',
      password: '',
      confirm_password: '',
      role_id: '',
      company_id: '',
      // termsOfService: false,
    },
    validate: {
      first_name: (value) => (value ? null : 'Type your first name'),
      last_name: (value) => (value ? null : 'Type your last name'),
      phone_number: (value) => (!value || /^\d+$/.test(value) ? null : 'Invalid phone number'),
      email: (value) => (!value || /^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      username: (value) => (value ? null : 'Provide username'),
      password: (value) => (editData || /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ? null : 'Minimum eight characters, at least one letter and one number'),
      confirm_password: (value, values) => ((value === values.password) ? null : 'Password did not match'),
      role_id: (value) => (/^\d+$/.test(value) ? null : 'Select a role'),
      company_id: (value) => (companies.length === 0 || (/^\d+$/.test(value)) ? null : 'Select a company'),
    },
  });

  useEffect(() => {
    if (editData) {
      form.setValues((prev) => ({ ...prev, ...editData, role_id: String(editData.role_id), company_id: String(editData.company_id) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = (values: CreateOrUpdateFormInterFace): void => {

    const customizeValues = { ...values, role_id: Number(values.role_id), company_id: Number(values.company_id) }
    if (editData) {
      updateUser({ user_id: editData.id, body: customizeValues })
        .unwrap()
        .then(() => {
          notifications.show({ message: 'Sucessfully Updated' });
          handleModalClose();
        })
        .catch((error: { data: string }) => { notifications.show({ message: error.data, color: 'red' }) })
    }
    else {
      createUser(customizeValues).unwrap()
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
      <form onSubmit={form.onSubmit((values: CreateOrUpdateFormInterFace): void => handleFormSubmit(values))} >

        <Grid grow gutter="xs">
          <Grid.Col span={4}>
            <TextInput
              withAsterisk
              label="First name"
              placeholder="your first name..."
              {...form.getInputProps('first_name')}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              withAsterisk
              label="Last name"
              placeholder="your last name..."
              {...form.getInputProps('last_name')}
            />
          </Grid.Col>
        </Grid>

        <TextInput
          // withAsterisk
          type="number"
          label="Phone Number"
          placeholder="your phone number..."
          {...form.getInputProps('phone_number')}
        />

        <TextInput
          // withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
        <TextInput
          withAsterisk
          label="Username"
          placeholder="your username..."
          autoComplete="new-username"
          {...form.getInputProps('username')}
        />
        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="your password..."
          autoComplete="new-password"
          {...form.getInputProps('password')}
        />
        <PasswordInput
          withAsterisk
          label="Confirm Password"
          placeholder="your confirm password..."
          {...form.getInputProps('confirm_password')}
        />

        <Select
          withAsterisk
          label="Select Role"
          placeholder="Select Role"
          {...form.getInputProps('role_id')}
          // sx={{"::selection":{backgroundColor:'orange'}}}
          data={
            roles ? roles?.map(({ id, title }: { id: number, title: string }) => ({ value: String(id), label: title })) : []

          }
        />

        {
          companies.length > 0 &&
          <Select
            withAsterisk
            label="Select Company"
            placeholder="Select Company"
            {...form.getInputProps('company_id')}
            // sx={{"::selection":{backgroundColor:'orange'}}}
            data={
              companies?.map(({ id, name }: { id: number, name: string }) => ({ value: String(id), label: name }))
            }
          />
        }

        <FormSubmitButtonWrapper>
          Submit
        </FormSubmitButtonWrapper>
      </form>
    </Box>
  );
}

export default CreateOrUpdateData;