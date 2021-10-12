import React from 'react';
import {useSelector} from 'react-redux';
import {
  Redirect,
  Route,
} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const PrivateRoute = ({children, ...rest}) => {
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  if (auth.user === undefined) {
    return <Spinner
      style={{position: 'absolute', top: '50%', left: '50%'}}
      className="loading-spinner"
      animation="border"
      variant="primary"
    />;
  }

  return (
    <Route
      {...rest}
      render={({location}) =>
      auth.user ? (
      children
      ) : (
      <Redirect to={
        {pathname: '/admin/login',
          state: {from: location},
        }}
      />)}
    />
  );
};

export default PrivateRoute;
