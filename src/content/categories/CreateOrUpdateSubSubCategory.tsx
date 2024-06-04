import { FormSubmitButtonWrapper } from "@/components/ButtonWrapper";
import { useGetAllSubCategoryQuery } from "@/redux/services/sub_category";
import { useCreateSubSubCategoryMutation, useUpdateSubSubCategoryMutation } from "@/redux/services/sub_sub_category";
import { CreateSubSubCategory, SubSubCategory } from "@/types/sub__sub_category";
import { Box, LoadingOverlay, Modal, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";


interface CreateOrUpdateCategoryInterFace {
  editData: SubSubCategory | null | undefined;
  addEditCategory: (arg: null) => void;
  open: boolean;
  handleOpen: (arg: boolean) => void;
}

interface FormInterface {
  editData: SubSubCategory | undefined | null;
  handleModalClose: () => void;
}

interface CreateSubSubCategoryInterface {
  title: string;
  sub_category_id: string;
}


const CreateOrUpdateSubSubCategory: React.FC<CreateOrUpdateCategoryInterFace> = ({ open, handleOpen, editData, addEditCategory }) => {


  useEffect(() => {
    if (editData) handleOpen(true);
  }, [editData]);

  const handleModalClose = () => {
    handleOpen(false);
    addEditCategory(null);
  }



  return (
    <>
      <Modal opened={open} onClose={handleModalClose} title="Sub Sub Category" centered>
        {/* Modal content */}
        <Form editData={editData} handleModalClose={handleModalClose} />
      </Modal>
    </>
  )
}

const Form: React.FC<FormInterface> = ({ editData, handleModalClose }) => {
  const { data: subCategoris } = useGetAllSubCategoryQuery()
  const [createCategory, { isLoading: isCreateLoading }] = useCreateSubSubCategoryMutation()
  const [updateCategory, { isLoading: isUpdateLoading }] = useUpdateSubSubCategoryMutation()


  const form = useForm({
    initialValues: {
      title: "",
      sub_category_id: "",
    },
    validate: {
      title: (value) => (value ? null : 'Type your category title'),
    },
  });

  useEffect(() => {
    if (editData) {
      form.setValues((prev) => ({ ...prev, ...editData }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = (values: CreateSubSubCategoryInterface): void => {
    const customizeValue: CreateSubSubCategory = { ...values, sub_category_id: parseInt(values.sub_category_id) }
    if (editData) {
      updateCategory({ id: editData.id, body: customizeValue })
        .unwrap()
        .then(() => {
          notifications.show({ message: 'Sucessfully Updated' });
          handleModalClose();
        })
        .catch((error: { data: string }) => { notifications.show({ message: error.data, color: 'red' }) })
    }
    else {
      createCategory(customizeValue).unwrap()
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
      <form onSubmit={form.onSubmit((values: CreateSubSubCategoryInterface): void => handleFormSubmit(values))} >

        <Select
          withAsterisk
          label="Select Sub Category"
          placeholder="pick one sub category..."
          {...form.getInputProps('sub_category_id')}
          // sx={{ "::selection": { backgroundColor: 'orange' } }}
          data={
            subCategoris ? subCategoris?.map(({ id, title }: { id: number, title: string }) => ({ value: String(id), label: title })) : []

          }
        />

        <TextInput
          withAsterisk
          label="Title"
          placeholder="type sub sub category title..."
          {...form.getInputProps('title')}
        />

        <FormSubmitButtonWrapper>
          Submit
        </FormSubmitButtonWrapper>
      </form>
    </Box>
  );
}

export default CreateOrUpdateSubSubCategory;