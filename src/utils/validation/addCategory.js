import * as Yup from 'yup';

export const addCategoryValidationSchema = Yup.object({
    name : Yup.string()
        .required('Category name is required')
        .min(5, 'Name must of at least 5 characters'),
})