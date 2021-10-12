import React from 'react';
import Paginate from 'react-bootstrap/Pagination';
import {Link} from 'react-router-dom';
import useQuery from '../hooks/useQuery';

const Pagination = ({pages = 1, url, limit = 8}) => {
  const offset = useQuery().get('offset');
  const items = [];
  for (let i = 1; i<=pages; i++) {
    items.push(
        <li
          className={`page-item ${(i - 1) * limit === +offset ? 'active': ''}`}
          key={i}
        >
          <Link
            to={`${url}offset=${limit * (i - 1)}`}
            className="page-link">
            {i}
          </Link>
        </li>,
    );
  }
  return (
    <Paginate>
      <li
        className={`page-item ${+offset === 0 ? 'disabled' : ''}`}
      >
        <Link
          to={`${url}offset=${+offset - limit}`}
          className="page-link"
        >
          &lt;
        </Link></li>
      {items}
      <li
        className={
          `page-item ${+offset === (pages - 1) * limit ? 'disabled' : ''}`}
      >
        <Link
          to={`${url}offset=${+offset + limit}`}
          className="page-link"
        >
          {'>'}
        </Link></li>
    </Paginate>
  );
};

export default Pagination;
