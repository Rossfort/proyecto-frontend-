import axios from 'axios';

const useVariants = () => {
  const edit = (id) => {
    return axios.get(process.env.REACT_APP_BASE_API_URL +
      `/api/admin/variants/${id}/edit`,
    {withCredentials: true},
    );
  };

  const editPatch = (id, params) => {
    return axios.patch(process.env.REACT_APP_BASE_API_URL +
      `/api/admin/variants/${id}`,
    params,
    {withCredentials: true},
    );
  };

  const index = (productId) => {
    return axios.get(process.env.REACT_APP_BASE_API_URL +
      `/api/admin/products/${productId}/variants`,
    {withCredentials: true},
    );
  };

  const remove = (id) => {
    console.log(id);
    return axios.delete(process.env.REACT_APP_BASE_API_URL +
      `/api/admin//variants/${id}`,
    {withCredentials: true},
    );
  };

  const restore = (id) => {
    return axios.get(process.env.REACT_APP_BASE_API_URL +
      `/api/admin/variants/${id}/restore`,
    {withCredentials: true},
    );
  };

  const create = (id, params) => {
    return axios.post(
        process.env.REACT_APP_BASE_API_URL +
      `/api/admin/products/${id}/variants`,
        params,
        {withCredentials: true},
    );
  };

  return {
    index,
    edit,
    editPatch,
    restore,
    remove,
    create,
  };
};

export default useVariants;
