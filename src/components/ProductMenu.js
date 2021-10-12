import React from 'react';
import {Link} from 'react-router-dom';

const ProductMenu = ({productId, product, variant, stock}) => {
  return (
    <>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            className={`nav-link ${product ? 'active' : ''} `}
            to={`/admin/products/${productId}/edit`}>Ver producto</Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${variant ? 'active' : ''}`}
            to={`/admin/products/${productId}/variants`}>Variantes</Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${stock ? 'active' : ''}`}
            to={`/admin/products/${productId}/variants/stock`}>Stock</Link>
        </li>
      </ul>
    </>
  );
};

export default ProductMenu;
