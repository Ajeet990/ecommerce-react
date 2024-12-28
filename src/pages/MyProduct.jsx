import React, { useState, useEffect, useContext, useRef } from 'react';
import $ from 'jquery';
import 'select2/dist/css/select2.min.css';
import 'select2/dist/js/select2.min.js';
import select2 from 'select2';
import debounce from 'lodash/debounce';
select2($);
import { useGetCategoriesQuery, useAddProductMutation, useGetProductsQuery } from '../features/otherApis/otherApisSlice';
import { useFormik } from 'formik';
import { addProductValidationSchema } from '../utils/validation/addProduct';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthContext';

// Custom Select2 Component
const Select2 = ({ value, onChange, options, placeholder }) => {
  const selectRef = useRef();

  useEffect(() => {
    const $select = $(selectRef.current);
    $select.select2({
      placeholder: placeholder,
      allowClear: true
    });

    $select.on('select2:select select2:unselect', (e) => {
      onChange({
        target: {
          name: 'category',
          value: e.target.value
        }
      });
    });

    $select.val(value).trigger('change');

    return () => {
      $select.off('select2:select select2:unselect');
      $select.select2('destroy');
    };
  }, [value, onChange]);
  

  return (
    <select ref={selectRef} value={value} onChange={() => { }}>
      <option value="">Select category</option>
      {options?.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

const MyProduct = () => {
  const { user, token } = useContext(AuthContext)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addProduct] = useAddProductMutation();
  const [filters, setFilters] = useState({ name: '', category: '' });
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  // Create debounced filters update
  const debouncedSetFilters = useRef(
    debounce((newFilters) => {
      setDebouncedFilters(newFilters);
    }, 500)
  ).current;

  // Update debounced filters when filters change
  useEffect(() => {
    debouncedSetFilters(filters);
    return () => {
      debouncedSetFilters.cancel();
    };
  }, [filters]);

  const { data: categories, isLoading: loadingCategory, error: errorCategory } = useGetCategoriesQuery();
  const { data: products, isLoading: loadingProducts, error: errorProducts } = useGetProductsQuery({
    token,
    filters: debouncedFilters
  }, {
    refetchOnMountOrArgChange: true
  });

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
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('price', values.price);
        formData.append('category', values.category);
        if (values.image) {
          formData.append('image', values.image);
        }
        const response = await addProduct({ formdata: formData, token }).unwrap();
        if (response.success) {
          toast.success(response.message)
          resetForm()
          closeModal()
        } else {
          toast.error(response.message)
        }
      } catch (error) {
        console.log('something went wrong', error)
      }
    }
  })

  const handleFileChange = (event) => {
    formik.setFieldValue('image', event.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
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
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          name="name"
          placeholder="Search item"
          className="border border-gray-300 rounded px-4 py-2 h-10 focus:ring focus:ring-green-200"
          value={filters.name}
          onChange={handleInputChange}
        />
        <Select2
          value={filters.category}
          onChange={handleInputChange}
          options={categories?.data}
          placeholder="Select a category"
        />
        {loadingProducts && <span>Loading...</span>}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-1/3"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Add Product</h3>
            {/* Modal Content */}
            <form onSubmit={formik.handleSubmit}>
              {/* ... rest of the form code remains the same ... */}
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
                  Product Category
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
                    categories?.data && categories?.data.map((item) =>
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

      {/* Listing all products grouped by category */}
      <div>
        {products?.data && Object.entries(products.data).length > 0 ? (
          Object.entries(products.data).map(([category, items], categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              {/* Category Name */}
              <h2 className="text-xl font-bold text-gray-800 mb-4">{category}</h2>

              {/* Products under this category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <div key={index} className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="rounded-t-lg w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                        <p className="text-lg text-green-500 font-bold mt-4">${item.price}</p>
                        <button className="w-full mt-4 px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-600">No products found in this category.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No products found.</p>
        )}
      </div>

    </div>
  );
};

export default MyProduct;