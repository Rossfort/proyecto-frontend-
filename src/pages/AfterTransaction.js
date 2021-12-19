import React from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import {useParams} from 'react-router-dom';

const AfterTransaction = () => {
  const [transaction, setTransaction] = React.useState({});
  const {id} = useParams();

  React.useEffect(() => {
    axios.get(
        process.env.REACT_APP_BASE_API_URL + `/api/payments/${id}`)
        .then((res) => setTransaction(res.data));
  }, [status]);


  if (Object.keys(transaction).length) {
    const renderLineItems = transaction.order.items.map((item) =>
      <div key={item.id} className="row">
        <div className="col-3">
          <img src={item.image} alt="" width='200' className='rounded' />
        </div>
        <div className="col-6 d-flex align-items-center">
          <div>
            {item.title}
          </div>
        </div>
        <div className="col-1 d-flex align-items-center">
          <div>
            {item.quantity}
          </div>
        </div>
        <div className="col-2 d-flex align-items-center  flex-row-reverse">
          <div className='d-flex'>
            {item.price}
          </div>
        </div>
      </div>,
    );
    return (
      
      <div className='container border-start border-end px-5'>
        <div className="row mb-4 border-bottom">
          <h1 className='text-center'>Transaccion exitosa</h1>
        </div>
        <div className="row border-bottom">
          <div className="row">
            <div className="col">
              <div className="row fw-bold">Fecha transaccion</div>
              <div className="row">{transaction.order.created_at}</div>
            </div>
            <div className="col text-center">
              <div className="row fw-bold">Transaccion ID</div>
              <div className="row">{transaction.order.uuid}</div>
            </div>
            <div className="col text-center">
              <div className="row fw-bold">Direccion</div>
              <div className="row">
                {transaction.order.comuna + transaction.order.address}
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4 border-bottom pb-4">
          <div className="row">
            <div className="col-3">
            </div>
            <div className="col-6">Nombre</div>
            <div className="col-1">Cantidad</div>
            <div className="col-2 ">
              <div className='float-end'>
                Precio
              </div>
            </div>
          </div>
          {renderLineItems}
        </div>
        <div className="row">
          <div className="col-2">
          </div>
          <div className="col">
            <div className='float-start fw-bold'>
              Total
            </div>
          </div>
          <div className="col">
            <div className="float-end">
              {transaction.order.amount}
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    );
  }

  return (
    <Spinner animation='border' />
  );
};

export default AfterTransaction;
