import * as Yup from 'yup';

export const registrationValidationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(5, 'Name must of at least 5 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  address: Yup.string()
    .required('Address is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  profileImage: Yup.mixed()
    .required('Profile image is required')
    .test('fileSize', 'File size is too large', (value) => {
      return value && value.size <= 2 * 1024 * 1024; // 2MB limit
    })
    .test('fileType', 'Unsupported file format', (value) => {
      return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
    }),
  is_seller: Yup.string()
    .required('This field is required')
    .oneOf(['1', '0'], 'Please select Yes or No'),
});
