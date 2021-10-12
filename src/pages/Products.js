import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import {Link, useLocation} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from '../components/Pagination';
import AsyncSelect from 'react-select/async';

const Product = () => {
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(false);
  const [totalPages, setTotalPages] = React.useState(1);

  const queryString = useLocation().search;

  const loadOptions = async () => {
    const a = await axios.get(
        process.env.REACT_APP_BASE_API_URL + `/api/categories`,
    );
    return a.data.categories;
  };

  const getProducts = () => {
    setIsloading(true);
    axios.get(
        process.env.REACT_APP_BASE_API_URL + `/api/products${
          queryString ? queryString : '' }`, {withCredentials: true})
        .then((res) => {
          setProducts(res.data.products);
          setTotalPages(res.data.total_count);
        },
        )
        .then(() => setIsloading(false));
  };

  React.useEffect(() => {
    getProducts();
  }, [queryString]);

  const renderArr = products.map((item) => (
    <Col key={item.id} xs={8} md={6} lg={3} className='m-auto'>
      <Link to={`/products/${item.id}`}>
        <div className="product-card d-flex flex-column m-1">
          <img
            className="img-fluid"
            src={item.master_image}
            alt=""
          />
          <p className='text-truncate'>{item.title}</p>
          <p>{item.price}</p>
        </div>
      </Link>
    </Col>
  ));

  if (isLoading) {
    return <Spinner
      style={{position: 'absolute', top: '50%', left: '50%'}}
      className="loading-spinner"
      animation="border"
      variant="primary"
    />;
  }

  return (
    <Row className="mt-5">
      <Col
        sm={4}
        className='border d-none d-sm-block d-flex flex-column'
      >
        <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          defaultOptions
        />
      </Col>
      <Col className='d-flex flex-wrap justify-content-between'>
        {renderArr}
      </Col>
      <div className="d-flex justify-content-center">
        <Pagination
          limit={12}
          url={'/products?'}
          pages={totalPages}
        />
      </div>
    </Row>
  );
};

export default Product;
