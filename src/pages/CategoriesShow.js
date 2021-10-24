import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import {useParams} from 'react-router-dom';
import useFilter from '../hooks/useParams';
import useCategories from '../hooks/useCategories';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link, useLocation, useHistory} from 'react-router-dom';
import Pagination from '../components/Pagination';
import Select from 'react-select';

const CategoriesShow = () => {
  const [products, setProducts] = React.useState([]);
  const [propertyTypes, setPropertyTypes] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const {name} = useParams();
  const {search} = useLocation();
  const {
    normalCategoriesShow,
    getPropertyTypes,
    search: ssearch,
  } = useCategories();
  const [ffilters, setFfilters] = React.useState({});
  const [filters, setFilters] = React.useState([]);
  const {url, urlNoOffset} = useFilter(ffilters, 'properties');
  const history = useHistory();
  const queryString = useLocation().search;

  React.useEffect(() => {
    normalCategoriesShow(name, url)
        .then((res) => {
          setProducts(res.data.products);
          setTotalPages(res.data.total_count);
        });
  }, [name, url]);

  React.useEffect(() => {
    getPropertyTypes(name)
        .then((res) => {
          setPropertyTypes(res.data.properties);
        });
  }, [name]);

  const fixFilters = (filters) => {
    const newFilters = {};
    filters.forEach((item) => {
      if (newFilters[item.property_id]) {
        newFilters[item.property_id].push(item.product_property_id);
      } else {
        newFilters[item.property_id] = [item.product_property_id];
      }
    });
    setFfilters(newFilters);
  };

  const onFilterSelect = (e, action) => {
    const arr = [...filters];
    if (action.action === 'remove-value') {
      const index = arr.findIndex((i) =>
        i.product_property_id === action.removedValue.product_property_id);
      arr.splice(index, 1);
    } else if (action.action === 'clear') {
      action.removedValues.forEach((item) => {
        const index = arr.findIndex((i) =>
          i.product_property_id === item.product_property_id);
        arr.splice(index, 1);
      });
    } else {
      arr.push({
        property_id: action.option.property_id,
        product_property_id: action.option.product_property_id,
      });
    }
    fixFilters(arr);
    setFilters(arr);
  };

  console.log(filters);

  const renderProperties = propertyTypes.map((item) =>
    <Select
      key={item.id}
      options={item.property_values}
      placeholder={item.property_name}
      isMulti={true}
      onChange={onFilterSelect}
    />,
  );

  let productHolder;

  if (products.length === 0) {
    if (Object.keys(filters).length > 0) {
      productHolder = <h1>No hay productos con esos filtros</h1>;
    } else {
      productHolder = <Spinner
        style={{position: 'absolute', top: '50%', left: '50%'}}
        className="loading-spinner"
        animation="border"
        variant="primary"
      />;
    }
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
        {productHolder ? undefined : renderArr}
      </Col>
      <div className="d-flex justify-content-center">
        {productHolder ? productHolder : <Pagination
          limit={12}
          url={`/categories/${name}?`}
          pages={totalPages}
        />}
      </div>
    </Row>
  );
};

export default CategoriesShow;
