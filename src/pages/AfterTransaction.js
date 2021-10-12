import React from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import {useParams} from 'react-router-dom';

const AfterTransaction = () => {
  const [order, setOrder] = React.useState({});
  const {id} = useParams();

  React.useEffect(() => {
    axios.get(
        process.env.REACT_APP_BASE_API_URL + `/api/payments/${id}`)
        .then((res) => setOrder(res));
  }, [status]);

  console.log(order);


  if (order) {
    return (
      <h1>Transaccion exitosa</h1>
    );
  }

  return (
    <Spinner animation='border' />
  );
};

export default AfterTransaction;
