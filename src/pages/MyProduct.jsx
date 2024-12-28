import React, { useState, useEffect, useContext } from 'react';
import $ from 'jquery';
import 'select2/dist/css/select2.min.css';
import 'select2/dist/js/select2.min.js';
import select2 from 'select2';
select2($);
import { useGetCategoriesQuery, useAddProductMutation } from '../features/otherApis/otherApisSlice';
import { useFormik } from 'formik';
// import { addCategoryValidationSchema } from '../utils/validation/addCategory';
import { addProductValidationSchema } from '../utils/validation/addProduct';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthContext';


// Assign jQuery to the global scope
// window.$ = window.jQuery = $;

const MyProduct = () => {
  const { user, token } = useContext(AuthContext)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addProduct] = useAddProductMutation()

  useEffect(() => {
    if ($.fn.select2) {
      $('#selectCategory').select2({
        placeholder: 'Select a category',
        allowClear: true,
      });
    } else {
      console.error('Select2 is not loaded.');
    }
  }, []);
  // console.log('userDetails', user, token)
  const { data: categories, isLoading: loadingCategory, error: errorCategory } = useGetCategoriesQuery();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      category: '',
      image: null
    },
    validationSchema: addProductValidationSchema,
    onSubmit: async (values, {resetForm}) => {
      try {
        console.log("submitting values", values, token)
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('price', values.price);
        formData.append('category', values.category);
        // formData.append('token', token);
        if (values.image) {
          formData.append('image', values.image);
        }
        const response = await addProduct({ formdata: formData, token }).unwrap();
        console.log("Hi",response)
        if (response.success) {
          toast.success(response.message)
          resetForm()
          closeModal()
        } else {
          toast.error(response.message)
        }
      } catch (error) {
        console.log('someting went wrong', error)
      }
    }
  })
  const handleFileChange = (event) => {
    // console.log("Image:",event)
    formik.setFieldValue('image', event.target.files[0]);
    // formik.setFieldValue('profileImage', event.currentTarget.files[0]);
  };

  return (
    <div className="p-8 space-y-3">
      {/* Heading Section */}
      <div className="flex justify-center">
        <h2 className="text-2xl font-bold">My Products</h2>
      </div>

      {/* Add Product Button */}
      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
          onClick={openModal}
        >
          Add Product
        </button>
      </div>

      {/* Filter Section */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search item"
          className="border border-gray-300 rounded px-4 py-2 h-10 focus:ring focus:ring-green-200"
        />
        <select
          name="selectCategory"
          id="selectCategory"
          className="border border-gray-300 rounded h-10 px-4"
        >
          <option value="">Select category</option>
          {
            categories?.data && categories?.data.map((item, index) =>
              <option key={item.id} value={item.id}>{item.name}</option>
            )
          }
        </select>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeModal} // Close modal when clicking outside
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-1/3"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
          >
            <h3 className="text-xl font-bold mb-4">Add Product</h3>
            {/* Modal Content */}
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label htmlFor="productName" className="block text-gray-700 font-medium">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name='name'
                  placeholder="Enter product name"
                  className={`border border-gray-300 rounded w-full px-4 py-2 mt-1 focus:ring focus:ring-green-200 ${formik.touched.name && formik.errors.name
                    ? 'border-red-500'
                    : 'border-gray-300'
                    }`}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-medium">
                  Product Description
                </label>
                <input
                  type="text"
                  id="description"
                  name='description'
                  placeholder="Enter product description"
                  className={`border border-gray-300 rounded w-full px-4 py-2 mt-1 focus:ring focus:ring-green-200 ${formik.touched.description && formik.errors.description
                    ? 'border-red-500'
                    : 'border-gray-300'
                    }`}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700 font-medium">
                  Product price
                </label>
                <input
                  type="text"
                  id="price"
                  name='price'
                  placeholder="Enter product price"
                  className={`border border-gray-300 rounded w-full px-4 py-2 mt-1 focus:ring focus:ring-green-200 ${formik.touched.price && formik.errors.price
                    ? 'border-red-500'
                    : 'border-gray-300'
                    }`}
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.price && formik.errors.price && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.price}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700 font-medium">
                  Product price
                </label>
                <select
                  id="category"
                  name="category"
                  className={`border rounded w-full px-4 py-2 mt-1 focus:ring focus:ring-green-200 ${formik.touched.category && formik.errors.category
                    ? 'border-red-500'
                    : 'border-gray-300'
                    }`}
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" label="Select category">Select category</option>
                  {
                    categories?.data && categories?.data.map((item, index) =>
                      <option key={item.id} value={item.id}>{item.name}</option>
                    )
                  }
                </select>
                {formik.touched.category && formik.errors.category && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.category}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className={`mt-1 p-1 block w-full rounded-md border ${formik.touched.image && formik.errors.image
                    ? 'border-red-500'
                    : 'border-gray-300'
                    } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.image && formik.errors.image && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.image}</p>
                )}
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProduct;