import * as Yup from 'yup';

export const addProductValidationSchema = Yup.object({
    name: Yup.string()
        .required('Product name is required')
        .min(5, 'Name must of at least 5 characters'),
    description: Yup.string()
        .required('Description is required')
        .min(10, 'Description should at least 10 characters'),
    price: Yup.number()
        .required('Price is required'),
    category: Yup.string()
        .required('Category is required'),
    image: Yup.mixed()
        .required('Product image is required')
        .test('fileSize', 'File size is too large', (value) => {
            return value && value.size <= 2 * 1024 * 1024; // 2MB limit
        })
        .test('fileType', 'Unsupported file format', (value) => {
            return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
        }),
})