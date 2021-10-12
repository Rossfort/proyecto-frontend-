import axios from 'axios';

const useOrders = () => {
  const index = () => {
    return axios.get(process.env.REACT_APP_BASE_API_URL +
      '/api/admin/orders',
    {withCredentials: true},
    );
  };
  const show = (id) => {
    return axios.get(process.env.REACT_APP_BASE_API_URL +
      `/api/admin/orders/${id}`,
    {withCredentials: true},
    );
  };

  const patch = (id, params) => {
    return axios.patch(process.env.REACT_APP_BASE_API_URL +
      `/api/admin/orders/${id}`,
    params,
    {withCredentials: true},
    );
  };

  return {index, show, patch};
};

export default useOrders;
