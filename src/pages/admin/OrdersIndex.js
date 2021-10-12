import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import Spinner from 'react-bootstrap/Spinner';
import {Link, useLocation, useHistory} from 'react-router-dom';
import useParams from '../../hooks/useParams';
import useQuery from '../../hooks/useQuery';
import Pagination from '../../components/Pagination';
import axios from 'axios';

const OrdersIndex = () => {
  const [orders, setOrders] = React.useState([]);
  const [id, setId] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [statuses, setStatuses] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [totalPages, setTotalPages] = React.useState(1);
  const [offset] = React.useState(useQuery().get('offset') || 0);
  const {url, urlNoOffset} = useParams(
      {
        'order_id': id,
        'status': status,
        'email': email,
        'offset': offset,
      },
  );

  const queryString = useLocation().search;
  const history = useHistory();

  React.useEffect(() => {
    setLoading(true);
    axios.get(
        process.env.REACT_APP_BASE_API_URL +
      `/api/admin/orders${queryString ? queryString : ''}`,
        {withCredentials: true},
    )
        .then((res) => {
          setOrders(res.data.orders);
          setLoading(false);
          setStatuses(res.data.statuses);
          setTotalPages(res.data.total_pages);
        });
  }, [queryString]);

  const handleId = (e) => {
    setId(e.target.value);
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleQuery = (e) => {
    e.preventDefault();
    history.push(`/admin/orders?${url}`);
  };

  const renderOrders = orders.map((item) =>
    <tr key={item.id}>
      <td>{item.created_at}</td>
      <td><Link to={`/admin/orders/${item.id}`}>{item.id}</Link></td>
      <td>{item.status}</td>
      <td>{item.email}</td>
      <td>{item.amount}</td>
    </tr>,
  );

  return (
    <>
      <ContentHeader title="Ordenes"/>
      <div className="admin-content-wrapper">
        <fieldset>
          <legend aling="center">
            Buscar
          </legend>
          <form onSubmit={handleQuery}>
            <label
              className="form-label"
              htmlFor="id"
            >
            Id de la orden
            </label>
            <input
              type="text"
              id="id"
              className="form-control"
              onChange={handleId}
              value={id}
            />
            <label
              className="form-label"
              htmlFor="email"
            >
            Email
            </label>
            <input
              type="text"
              id="email"
              className="form-control"
              onChange={handleEmail}
              value={email}
            />
            <label
              className="form-label"
              htmlFor="statuses"
            >
              Estado
            </label>
            <select
              onChange={handleStatus}
              defaultValue={status}
              className="form-select"
              id="statuses"
              name="status"
            >
              <option value="">todos</option>
              {statuses.map((item) =>
                <option key={item} value={item}>{item}</option>,
              )}
            </select>
            <input
              type="submit"
              className="btn btn-primary mt-2"
            />
          </form>
        </fieldset>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>ID</th>
                <th>Estado</th>
                <th>Mail</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {loading ?
                  <tr>
                    <td>
                      <Spinner animation="border" />
                    </td>
                  </tr> :
              renderOrders}
            </tbody>
          </table>
        </div>
        <Pagination
          pages={totalPages}
          url={
            (`/admin/orders${urlNoOffset ? '?' + urlNoOffset + '&' : ''}`)
          }
          limit={10}
        />
      </div>
    </>
  );
};

export default OrdersIndex;
