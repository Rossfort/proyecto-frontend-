import React from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {authLogout} from './../features/auth/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import '../styles/adminHeader.css';
import ContentHeader from './ContentHeader';

const AdminHeader = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const pathname = useLocation().pathname;
  



  const handleDisconect = (e) => {
    dispatch(authLogout());
    history.push('/admin/login');
  };

  if (!auth.user) {
    return (
      <>
        <ContentHeader title={'Acceder'}/>
        <div className="admin-nav">
        </div>
      </>
    );
  }

  return (
    <div className="admin-nav">
      <header className="admin-nav-header">
        <h1>4Mods</h1>
      </header>
      <div className="admin-nav-body">
        <nav className="admin-nav-menu">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/admin/orders"
                className={`nav-link  ${ pathname.includes("/admin/orders") ? 'active' :'' }`}
              >
              Ordenes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/products" className={`nav-link  ${ pathname.includes("/admin/products") ? 'active' : '' }`}
              >
              Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/categories" className={`nav-link  ${ pathname.includes("/admin/categories") ? 'active' : '' }`}
              >
              Categorias
              </Link>
            </li>
            
          </ul>
        </nav>
      </div>
      <div className="admin-nav-footer">
        <ul className="nav flex-column">
          <li>
            <br></br>
            <button onClick={handleDisconect} >
                    Desconectar
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminHeader;
