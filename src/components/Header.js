import React from 'react';
import {
  Link,
  useLocation,
} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AdminHeader from './AdminHeader';
import Spinner from 'react-bootstrap/Spinner';
import useCategories from '../hooks/useCategories';

const Header = () => {
  const [categories, setCategories] = React.useState([]);
  const {normalIndex} = useCategories();
  const pathname = useLocation().pathname;
  const location = useLocation();

  React.useEffect(() => {
    normalIndex()
        .then((res) => {
          setCategories(res.data.categories);
        });
  }, []);

  const menuItems = () => {
    if (Object.keys(categories).length) {
      const renderCategories = categories.map((item) =>
        <NavDropdown.Item as='div'key={item.id}>
          <Link
            className={`nav-link ${pathname.includes(`/categories/${item.value}`) ? 'active' : '' }`}
            to={`/categories/${item.value}`}
            style={{color: 'black'}}
          >
            {item.label}
          </Link>
        </NavDropdown.Item>,
      );
      return renderCategories;
    }

    return (
      <Spinner
        animation="border"
        variant="primary"
      />
    );
  };

 
  if (location.pathname.includes('/admin')) {
    return (
      <AdminHeader />
    );
  } else {
    return (
      <Navbar bg="dark" variant="dark">
        <Nav>
          <Nav.Item>
            <Link
              className={`nav-link  ${ pathname === "/" ? 'active' :'' }`} to="/"
            >
              Inicio
            </Link>
          </Nav.Item>
          <NavDropdown title='Products'>
            {menuItems()}
          </NavDropdown>
          <Nav.Item>
            <Link
              className={`nav-link  ${ pathname.includes("/about") ? 'active' :'' }`} to="/about"
            >
              About
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className={`nav-link  ${ pathname.includes("/cart") ? 'active' :'' }`} to="/cart"
            >
              Carrito
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    );
  }
};

export default Header;
