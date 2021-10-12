import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const AdminSpinner = () => {
  return (
    <div
      style={
        {
          'position': 'absolute',
          'top': '50%',
          'left': '50%',
          'padding': '20px',
          'background': 'gray',
          'borderRadius': '30%',
        }
      }
    >
      <Spinner
        animation="border"
      />
    </div>
  );
};

export default AdminSpinner;
