import React from 'react';
import {Link} from 'react-router-dom';

const OrderNewBreadscrumb = ({breadcrumb, step}) => {
  console.log(step);
  const renderItems = Object.entries(breadcrumb).map(
      ([url, [show, available]],
      ) =>
        <li
          key={url}
          className={`breadcrumb-item ${step === url ? 'active' : ''}`}
        >
          {available ?
          step === url ?
          show :
          <Link to={`/order/new?step=${url}`}>{show}</Link> :
          show}
        </li>);


  return (
    <nav>
      <ol className="breadcrumb">
        {renderItems}
      </ol>
    </nav>
  );
};

export default OrderNewBreadscrumb;
