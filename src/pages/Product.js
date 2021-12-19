import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import {useParams} from 'react-router-dom';
import {addItem} from '../features/cart/cartSlice';
import {fetchProduct, selectProduct} from '../features/products/productsSlice';
import {useDispatch, useSelector} from 'react-redux';
import '../styles/product.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronUp, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import SliderForProducts from '../components/SliderForProducts';
import axios from 'axios';

const Product = () => {
  const [quantity, setQuantity] = React.useState(1);
  const [images, setImages] = React.useState([]);
  const [selectedVariant, setSelectedVariant] = React.useState();
  const [nInArray, setNInArray] = React.useState(0);
  const [hasVariants, setHasVariants] = React.useState(false);
  const dispatch = useDispatch();
  const {id} = useParams();
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'CLP',
  });

  const product = useSelector((state) => selectProduct(state, +id));
  const productsStatus = useSelector((state) => state.product.status);
  React.useEffect(() => {
    if (!product) {
      dispatch(fetchProduct(id));
    }
  }, []);

  React.useEffect(() => {
    if (product) {
      setImages(product.images);
    }
    if (product && product.master_price) {
      setSelectedVariant(product.variants[0].id);
      if (product.variants.length > 1) {
        setHasVariants(true);
      }
    }
  }, [product]);

  React.useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_API_URL + `/api/products/${id}/visit`);
  }, []);


  const addToCart = () => {
    dispatch(addItem({productId: selectedVariant, quantity: +quantity}));
  };

  const handleSelected = (e) => {
    setSelectedVariant(product.variants[e.target.value].id);
    setNInArray(e.target.value);
  };

  const handleQuantity = (e) => {
    setQuantity(+e.target.value);
  };

  const handleIncreaseQuantity = () => {
    if (quantity >= product.variants[nInArray].stock) {
      setQuantity(quantity);
      return;
    }
    setQuantity(quantity + 1);
  };

  console.log(nInArray, 'asddsaasd');

  const handleDecreaseQuantity = () => {
    if (quantity === 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };


  let content;
  let renderProperties;
  if (product) {
    renderProperties = product.variants[0].properties.map((item) => {
      return (
        <>
          <dt>{item.name}</dt>
          <dd>{item.value}</dd>
        </>
      );
    },
    );
  }

  if (productsStatus === 'loading') {
    content = <Spinner
      style={{position: 'absolute', top: '50%', left: '50%'}}
      className="loading-spinner"
      animation="border"
      variant="primary"
    />;
  } else if (product && product.discarded_at) {
    content = <h1>Este producto no se encuentra disponible</h1>;
  } else if (product) {
    content =
    <Row className="mt-5">
      <Col md={6}>
        <Row>
          <SliderForProducts images={images} />
        </Row>
      </Col>
      <Col md={6}>
        <h1 className="text-center">{product.title}</h1>
        <h2 className="text-center">
          {formatter.format(product.master_price)}
        </h2>
        <dl>
          {renderProperties}
        </dl>
        {hasVariants ? <select
          className="form-select"
          onChange={handleSelected}>
          {product.variants.map((item, index) => (
            <option
              key={item.id}
              value={index}
            >{item.size}</option>
          ))}
        </select> : ''
        }
        <div className="d-flex flex-column mt-2">
          <div className="product number-input mx-auto my-2">
            <button
              onClick={handleDecreaseQuantity}
              className="minus"
              type="button"
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <input
              onChange={handleQuantity}
              className="quantity"
              type="number"
              name="quantity"
              min={1}
              value={quantity}
            />
            <button
              onClick={handleIncreaseQuantity}
              className="plus"
              type="button"
            >
              <FontAwesomeIcon icon={faChevronUp} />
            </button>
          </div>
          <Button
            className="p-3"
            onClick={addToCart}>Añadir al carrito</Button>
        </div>
      </Col>
    </Row>;
  }

  return (
    <>
      {content}
      <SliderForProducts />
    </>
  );
};

export default Product;
