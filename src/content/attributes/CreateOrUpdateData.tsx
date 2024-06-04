import { Box, Button, Group, LoadingOverlay, Modal, Select, Switch, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useForm } from '@mantine/form';
import { notifications } from "@mantine/notifications";
import { FormSubmitButtonWrapper } from "@/components/ButtonWrapper";
import { PermissionVerify } from "@/components/PermissionVerify";
import { Attribute, CreateAttribute } from "@/types/attribute";
import { useCreateAttributeMutation, useGetAllAttributeQuery, useUpdateAttributeMutation } from "@/redux/services/attribute";

interface CreateOrUpdateDataInterFace {
  editData: Attribute | null | undefined;
  addEditBrand: (arg: null) => void;
}

interface FormInterface {
  editData: Attribute | undefined | null;
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
      <Modal opened={open} onClose={handleModalClose} title="Attribute" centered>
        {/* Modal content */}
        <Form editData={editData} handleModalClose={handleModalClose} />
      </Modal>

      <Group position="center" pr={20} >
        <PermissionVerify havePermission="create_attribute">
          <Button onClick={() => { setOpen(true) }} className=" bg-orange-600 hover:bg-orange-700"> Create Attribute</Button>
        </PermissionVerify>
      </Group>
    </>
  )
}

const Form: React.FC<FormInterface> = ({ editData, handleModalClose }) => {
  const { data: allAttributes, isSuccess } = useGetAllAttributeQuery();
  const [createAttribute, { isLoading: isCreateLoading }] = useCreateAttributeMutation()
  const [updatAttribute, { isLoading: isUpdateLoading }] = useUpdateAttributeMutation()

  const [checked, setChecked] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      value: "",
    },
    validate: {
      title: (value) => (value ? null : 'Type your attribute title'),
      value: (value) => (value ? null : 'Type your attribute value'),
    },
  });

  useEffect(() => {
    if (editData) {
      form.setValues((prev) => ({ ...prev, ...editData }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = (values: CreateAttribute): void => {

    if (editData) {
      updatAttribute({ id: editData.id, body: values })
        .unwrap()
        .then(() => {
          notifications.show({ message: 'Sucessfully Updated' });
          handleModalClose();
        })
        .catch((error: { data: string }) => { notifications.show({ message: error.data, color: 'red' }) })
    }
    else {
      createAttribute(values).unwrap()
        .then(() => {
          notifications.show({ message: 'Sucessfully Created' });
          handleModalClose();
        })
        .catch((error: { data: string }) => { notifications.show({ message: error.data, color: 'red' }) })
    }
  }
  console.log({ allAttributes })
  return (
    <Box maw={500} mx="auto" pos="relative" px={40}>
      <LoadingOverlay visible={isCreateLoading || isUpdateLoading} overlayBlur={2} />
      <form onSubmit={form.onSubmit((values: CreateAttribute): void => handleFormSubmit(values))} >
        <div>

          <div>
            {
              checked &&
              <TextInput
                withAsterisk
                label="Title"
                placeholder="type attribute title..."
                {...form.getInputProps('title')}
              />
            }

            {
              isSuccess && !checked
              &&
              <Select
                label="Title"
                data={allAttributes.map(attribute => ({ value: attribute.title, label: attribute.title })) || []}
                placeholder="Select item"
                nothingFound="Nothing found"
                searchable
                creatable
              // getCreateLabel={(query) => `+ Create ${query}`}
              // onCreate={(query) => {
              //   const item = { value: query, label: query };
              //   setData((current) => [...current, item]);
              //   return item;
              // }}
              />
            }
          </div>

          <Switch
            pt={2}
            label="Create New Title"
            checked={checked}
            onChange={() => { setChecked((check) => !check) }}
          />
        </div>


        <TextInput
          withAsterisk
          label="Value"
          placeholder="type attribute value..."
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