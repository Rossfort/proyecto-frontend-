import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import {useParams} from 'react-router-dom';
import useCategories from '../hooks/useCategories';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link, useLocation} from 'react-router-dom';
import Pagination from '../components/Pagination';
import Select from 'react-select';

const CategoriesShow = () => {
  const [products, setProducts] = React.useState([]);
  const [propertyTypes, setPropertyTypes] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const {name} = useParams();
  const {search} = useLocation();
  const {normalCategoriesShow, getPropertyTypes} = useCategories();

  React.useEffect(() => {
    normalCategoriesShow(name, search)
        .then((res) => {
          setProducts(res.data.products);
          setTotalPages(res.data.total_count);
        });
  }, [name, search]);

  React.useEffect(() => {
    getPropertyTypes(name)
        .then((res) => {
          setPropertyTypes(res.data.properties);
        });
  }, [name]);

  const renderProperties = propertyTypes.map((item) =>
    <Select
      key={item.id}
      options={item.property_values}
      placeholder={item.property_name}
      isMulti={true}
    />,
  );

  if (products.length === 0) {
    return (
      <Spinner
        style={{position: 'absolute', top: '50%', left: '50%'}}
        className="loading-spinner"
        animation="border"
        variant="primary"
      />
    );
  }
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

  return (
    <Row className="mt-5">
      <Col
        sm={4}
        className='border d-none d-sm-block d-flex flex-column'
      >
        {renderProperties}
      </Col>
      <Col className='d-flex flex-wrap justify-content-between'>
        {renderArr}
      </Col>
      <div className="d-flex justify-content-center">
        <Pagination
          limit={12}
          url={`/categories/${name}?`}
          pages={totalPages}
        />
      </div>
    </Row>
  );
};

export default CategoriesShow;
