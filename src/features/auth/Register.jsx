import React from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { registrationValidationSchema } from '../../utils/validation/register';
import { useRegisterMutation } from './apiSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [makeRegister] = useRegisterMutation();
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      phone: '',
      is_seller: '',
      profileImage: null,
    },
    validationSchema: registrationValidationSchema,
    onSubmit: async (values) => {
      // console.log('Registration Form Submitted', values);
      // Create FormData and append all fields
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('address', values.address);
      formData.append('phone', values.phone);
      formData.append('is_seller', values.is_seller);
      if (values.profileImage) {
        formData.append('profileImage', values.profileImage); // Append file
      }
      // console.log('formData', formData)
      const response = await makeRegister(formData).unwrap();
      // console.log(response)
      if (response.success) {
        toast.success(response.message)
        navigate('/login')
      } else {
        const errors = response.errors;
        const firstError = Object.values(errors)[0][0];
        toast.error(firstError)
      }
    },
  });

  const handleFileChange = (event) => {
    // console.log("Image:",event)
    formik.setFieldValue('profileImage', event.target.files[0]);
    // formik.setFieldValue('profileImage', event.currentTarget.files[0]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`mt-1 p-1 block w-full rounded-md border ${formik.touched.name && formik.errors.name
                  ? 'border-red-500'
                  : 'border-gray-300'
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`mt-1 p-1 block w-full rounded-md border ${formik.touched.email && formik.errors.email
                  ? 'border-red-500'
                  : 'border-gray-300'
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`mt-1 p-1 block w-full rounded-md border ${formik.touched.password && formik.errors.password
                  ? 'border-red-500'
                  : 'border-gray-300'
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`mt-1 p-1 block w-full rounded-md border ${formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? 'border-red-500'
                  : 'border-gray-300'
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.confirmPassword}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              className={`mt-1 p-1 block w-full rounded-md border ${formik.touched.address && formik.errors.address
                  ? 'border-red-500'
                  : 'border-gray-300'
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address && formik.errors.address && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.address}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className={`mt-1 p-1 block w-full rounded-md border ${formik.touched.phone && formik.errors.phone
                  ? 'border-red-500'
                  : 'border-gray-300'
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.phone}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="is_seller" className="block text-sm font-medium text-gray-700">
              Become Seller
            </label>
            <select
              id="is_seller"
              name="is_seller"
              className={`mt-1 p-1 block w-full rounded-md border ${formik.touched.is_seller && formik.errors.is_seller
                  ? 'border-red-500'
                  : 'border-gray-300'
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
              value={formik.values.is_seller}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select an option</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
            {formik.touched.is_seller && formik.errors.is_seller && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.is_seller}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              className={`mt-1 p-1 block w-full rounded-md border ${formik.touched.profileImage && formik.errors.profileImage
                  ? 'border-red-500'
                  : 'border-gray-300'
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
              onChange={handleFileChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.profileImage && formik.errors.profileImage && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.profileImage}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
