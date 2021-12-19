import React from 'react';
import {
  Link,
  useLocation,
  useHistory,
} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AdminHeader from './AdminHeader';
import Spinner from 'react-bootstrap/Spinner';
import useCategories from '../hooks/useCategories';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from 'axios';

const Header = () => {
  const [categories, setCategories] = React.useState([]);
  const {normalIndex} = useCategories(); 
  const pathname = useLocation().pathname;
  const location = useLocation();
  const [searchText, setSearchText] = React.useState('');


  React.useEffect(() => {
    normalIndex()
        .then((res) => {
          setCategories(res.data.categories);
        });
  }, []);

  const history = useHistory();

  const doSearch = (e) => {
    e.preventDefault();
    history.push(`/products?search=${searchText}`);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      doSearch(e);
    }
  };

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
      <header className='p-3 bg-dark text-white'>
        <div className="container">
          <Navbar bg="dark" variant="dark">
            <Nav>
              <Nav.Item>
                <Link
                  className={`nav-link  ${ pathname === "/" ? 'active' :'' }`} to="/"
                  to="/"
                >
              Inicio
                </Link>
              </Nav.Item>
              <NavDropdown title='Products'>
                {menuItems()}
              </NavDropdown>
              <Nav.Item>
                <Link
                  className={`nav-link  ${ pathname.includes("/contact") ? 'active' :'' }`} to="/contact"
                  to="/contact"
                >
              Contactar
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className={`nav-link  ${ pathname.includes("/cart") ? 'active' :'' }`} to="/cart"
                >
              Carrito
                </Link>
              </Nav.Item>
            </Nav>
            <Nav.Item style={{marginLeft: 'auto'}}>
              <input
                type="text"
                id='search'
                value={searchText}
                onChange={handleSearch}
                onKeyUp={handleEnter}
              />
              <button onClick={doSearch}>
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </Nav.Item>
          </Navbar>
        </div>
      </header>
    );
  }
};

export default Header;
