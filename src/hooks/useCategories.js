import axios from 'axios';

const useCategories = () => {
  const normalIndex = () => {
    return axios.get(
        process.env.REACT_APP_BASE_API_URL +
      '/api/categories',
    );
  };

  const normalCategoriesShow = (category, queryParams) => {
    return axios.get(
        process.env.REACT_APP_BASE_API_URL +
        `/api/categories/${category}${queryParams}`,
    );
  };

  const index = () => {
    return axios.get(
        process.env.REACT_APP_BASE_API_URL +
      `/api/admin/categories`,
        {withCredentials: true},
    );
  };
  const adminEdit = (id) => {
    return axios.get(
        process.env.REACT_APP_BASE_API_URL +
      `/api/admin/categories/${id}/edit`,
        {withCredentials: true},
    );
  };

  const getPropertyTypes = (name) => {
    return axios.get(
        process.env.REACT_APP_BASE_API_URL +
      `/api/categories/${name}/category_properties`,
    );
  };

  const createCategory = (params) => {
    return axios.post(
        process.env.REACT_APP_BASE_API_URL +
      `/api/admin/categories`,
        params,
        {withCredentials: true},
    );
  };

  const updateCategory = (id, params) => {
    return axios.patch(
        process.env.REACT_APP_BASE_API_URL +
      `/api/admin/categories/${id}`,
        params,
        {withCredentials: true},
    );
  };

  const getCategoryProperties = (id) => {
    return axios.get(
        process.env.REACT_APP_BASE_API_URL +
      `/api/categories/${id}/category_properties`,
        params,
        {withCredentials: true},
    );
  };

  return {
    index,
    normalIndex,
    normalCategoriesShow,
    getPropertyTypes,
    createCategory,
    adminEdit,
    updateCategory,
    getPropertyTypes,
  };
};

export default useCategories;
