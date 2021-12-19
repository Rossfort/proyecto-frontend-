import React from 'react';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from 'react-responsive-carousel';
import {Link} from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    axios.get(
        process.env.REACT_APP_BASE_API_URL +
      `/api/products?last=true`,
    )
        .then((res) => setProducts(res.data.products));
  }, []);

  console.log(products)
  const renderProducts = products.map((item) => (
    <div key={item.id} className='m-auto col-8 col-md-6 col-lg-3'>
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
    </div>),
  );

  return (
    <div className="container">
      <div className="row">
        <Carousel showThumbs={false} className='mt-5 mb-5'>
          <img src="https://www.cclonline.com/content/blog/2021/1898/Yaiba-Kusanagi-Aurora-by-Italian-Extreme-Modders.jpg?width=1250" alt="" height='600' />
          <img src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/hc_1440x810/public/media/image/2021/08/setup-gaming-2444707.jpg?itok=4ryxE15h" alt="" height='600'/>
          <img src="https://www.cclonline.com/content/blog/2021/1898/MECHA-5000X-AK-Mod-TW.jpg?width=1250" alt="" height='600'/>
        </Carousel>
      </div>
      <div className="row">
        <h1 className='text-center'>Nuevos productos</h1>
        <div className='col d-flex flex-wrap justify-content-between'>
          {renderProducts}
        </div>
      </div>
    </div>
  );
};

export default Home;
