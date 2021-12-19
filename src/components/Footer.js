import React from 'react';
import {useLocation} from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  if (location.pathname.includes('/admin')) {
    return (<></>);
  }
  return (
    <footer className="py-5 border-top mt-auto">
      <div className="row mx-4">
        <div className="col-5">
          <h4>Quienes somos</h4>
            Consectetur totam minima incidunt laboriosam commodi delectus. Totam accusantium sunt minus et nemo maxime Deserunt rem eum laboriosam quasi quae Incidunt in iusto fuga accusamus ducimus dolores aliquid Quasi alias.
        </div>
        <div className="col-2">
          <h4>Nuestras redes</h4>
          <p>Face</p>
          <p>Instagram</p>
        </div>
        <div className="col-4 offset-1">
          <h4>
              Contactanos
          </h4>
          <ul className='nav flex-column'>
            <li>Direccion: xxxxxxxxx</li>
            <li>Telefono: xxxxxxxxxx</li>
            <li>Email: xxxxxxxxxx</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
