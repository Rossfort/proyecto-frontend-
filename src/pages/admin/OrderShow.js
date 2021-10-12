import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import {useParams} from 'react-router-dom';
import AdminSpinner from '../../components/AdminSpinner';
import useOrders from '../../hooks/useOrders';
import useForm from '../../hooks/useForm';
import {Link} from 'react-router-dom';

const OrderShow = () => {
  const [order, setOrder] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const {handleChange, values, setValues} = useForm({
    status: '',
  });
  const {id} = useParams();
  const {show, patch} = useOrders();

  React.useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = () => {
    setIsLoading(true);
    show(id)
        .then((res) => {
          setOrder(res.data);
          setIsLoading(false);
          setValues({...values, status: res.data.status});
        });
  };

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    setIsLoading(true);
    patch(id, {status: values.status})
        .then((res) => {
          console.log(res);
          fetchOrder();
          setIsLoading(false);
          setSuccess(true);
        });
  };

  console.log(order);

  console.log(values.status);

  if (isLoading) return <AdminSpinner />;

  return (
    <>
      {isLoading && <AdminSpinner />}
      <ContentHeader title={`Orden ${id}`} />
      <div className="admin-content-wrapper">
        {success &&
      <div
        className="alert alert-success"
      >
      Estado actualizado correctamente
      </div>}
        <h2>Datos de esta order.</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Email: {order.email}
          </li>
          <li className="list-group-item">
            Nombre: {order.name}
          </li>
          <li className="list-group-item">
            Apellido: {order.last_name}
          </li>
          <li className="list-group-item">
            Direccion: {order.address}
          </li>
          <li className="list-group-item">
            Ciudad: {order.city}
          </li>
          <li className="list-group-item">
            Comuna: {order.comuna}
          </li>
          <li className="list-group-item">
            Total: {order.amount}
          </li>
          <li className="list-group-item">
            Phone: {order.phone}
          </li>
          <li className="list-group-item">
            Metodo de envio: {order.shipping_method}
          </li>
          <li className="list-group-item">
            Metodo de pago: {order.pay_method}
          </li>
          <li className="list-group-item">
            Estado: {order.status}
          </li>
          <li className="list-group-item">
            Codigo de esta order: {order.uuid}
          </li>
        </ul>
        <h4>
          Actualizar estado de la orden.
        </h4>
        <form onSubmit={handleUpdateStatus}>
          <select
            onChange={handleChange}
            id="status"
            name="status"
            value={values.status}
            className="form-select"
          >
            {Object.keys(order.statuses).map((status) =>
              <option key={status} value={status}>{status}</option>,
            )}
          </select>
          <input type="submit" />
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Talla</th>
            </tr>
          </thead>
          <tbody>
            {order.line_items.map((variant) =>
              <tr key={variant.id}>
                <td>
                  <Link to={`/products/${variant.product_id}`}>
                    {variant.title}
                  </Link>
                </td>
                <td>{variant.quantity}</td>
                <td>{variant.size}</td>
              </tr>,
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderShow;
