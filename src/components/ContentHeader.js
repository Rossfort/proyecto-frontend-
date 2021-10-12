import React from 'react';
import {Link} from 'react-router-dom';

const ContentHeader = ({title, btn, btnVal}) => {
  return (
    <div className="main-header d-flex justify-content-between">
      <h1>{title}</h1>
      {btn && <Link className="btn btn-primary" to={btn}>{btnVal}</Link> }
    </div>
  );
};

export default ContentHeader;
