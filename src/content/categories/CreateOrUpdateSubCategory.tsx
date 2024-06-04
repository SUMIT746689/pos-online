import { FormSubmitButtonWrapper } from "@/components/ButtonWrapper";
import { useGetAllCategoryQuery } from "@/redux/services/category";
import { useCreateSubCategoryMutation, useUpdateSubCategoryMutation } from "@/redux/services/sub_category";
import { CreateSubCategory, SubCategory } from "@/types/sub_category";
import { Box, LoadingOverlay, Modal, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";


interface CreateOrUpdateSubCategoryInterFace {
  editData: SubCategory | null | undefined;
  addEditCategory: (arg: null) => void;
  open: boolean;
  handleOpen: (arg: boolean) => void;
}

interface FormInterface {
  editData: SubCategory | undefined | null;
  handleModalClose: () => void;
}

interface CreateSubCategoryInterface {
  title: string;
  category_id: string;
}

const CreateOrUpdateSubCategory: React.FC<CreateOrUpdateSubCategoryInterFace> = ({ open, handleOpen, editData, addEditCategory }) => {


  useEffect(() => {
    if (editData) handleOpen(true);
  }, [editData]);

  const handleModalClose = () => {
    handleOpen(false);
    addEditCategory(null);
  }



  return (
    <>
      <Modal opened={open} onClose={handleModalClose} title="Sub Category" centered>
        {/* Modal content */}
        <Form editData={editData} handleModalClose={handleModalClose} />
      </Modal>
    </>
  )
}

const Form: React.FC<FormInterface> = ({ editData, handleModalClose }) => {
  const { data: categories } = useGetAllCategoryQuery("")
  const [createCategory, { isLoading: isCreateLoading }] = useCreateSubCategoryMutation()
  const [updateCategory, { isLoading: isUpdateLoading }] = useUpdateSubCategoryMutation()


  const form = useForm({
    initialValues: {
      title: "",
      category_id: "",
    },
    validate: {
      title: (value) => (value ? null : 'Type your sub category title'),
      category_id: (value) => (value ? null : 'Select a category '),
    },
  });

  useEffect(() => {
    if (editData) {
      form.setValues((prev) => ({ ...prev, ...editData, category_id : String(editData.category_id) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = (values: CreateSubCategoryInterface): void => {
    const customizeValue: CreateSubCategory = { ...values, category_id: parseInt(values.category_id) }
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
      <form onSubmit={form.onSubmit((values: CreateSubCategoryInterface): void => handleFormSubmit(values))} >

        <Select
          withAsterisk
          label="Select Category"
          placeholder="pick one category..."
          {...form.getInputProps('category_id')}
          // sx={{"::selection":{backgroundColor:'orange'}}}
          data={
            categories ? categories?.map(({ id, title }: { id: number, title: string }) => ({ value: String(id), label: title })) : []
          }
        />

        <TextInput
          withAsterisk
          label="Title"
          placeholder="type sub category title..."
          {...form.getInputProps('title')}
        />

        <FormSubmitButtonWrapper>
          Submit
        </FormSubmitButtonWrapper>
      </form>
    </Box>
  );
}

export default CreateOrUpdateSubCategory;