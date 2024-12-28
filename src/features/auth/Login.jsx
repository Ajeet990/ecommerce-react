import React, {useContext} from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { loginValidationSchema } from '../../utils/validation/login';
import { useLoginMutation } from './apiSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const [makeLogin] = useLoginMutation();
  const navigate = useNavigate()

  const {login, setToken} = useContext(AuthContext)
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      // console.log('Form Submitted', values);
      try {

        const response = await makeLogin(values).unwrap();
        console.log("login resp full:", response)
        // console.log("login resp:", response.data)
        if (response.success) {
          login(response.data.user)
          setToken(response.data.token)
          toast.success(response.message)
          navigate('/')
        } else {
          toast.error(response.message)
        }
      } catch (error) {
        console.log("error", error)
        const serverMessage = error?.data?.message || "An unexpected error occurred.";
    
        // Show the server message using a toast
        toast.error(serverMessage);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`mt-1 p-1 block w-full rounded-md border ${
                formik.touched.email && formik.errors.email
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
              className={`mt-1 p-1 block w-full rounded-md border ${
                formik.touched.password && formik.errors.password
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
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
