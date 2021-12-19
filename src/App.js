import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Product from './pages/Product';
import Login from './pages/admin/Login';
import Products from './pages/Products';
import ProductIndex from './pages/admin/ProductIndex';
import Home from './pages/Home';
import Cart from './pages/Cart';
import OrderNew from './pages/OrderNew';
import CategoriesShow from './pages/CategoriesShow';
import OrdersIndex from './pages/admin/OrdersIndex';
import OrderShow from './pages/admin/OrderShow';
import ProductsCreate from './pages/admin/ProductsCreate';
import ProductsEdit from './pages/admin/ProductsEdit';
import VariantsCreate from './pages/admin/VariantsCreate';
import CategoriesIndex from './pages/admin/CategoriesIndex';
import CategoriesEdit from './pages/admin/CategoriesEdit';
import CategoriesNew from './pages/admin/CategoriesNew';
import VariantsEdit from './pages/admin/VariantsEdit';
import VariantsIndex from './pages/admin/VariantsIndex';
import AfterTransaction from './pages/AfterTransaction';
import VariantsStock from './pages/admin/VariantsStock';
import Container from 'react-bootstrap/Container';
import {useDispatch} from 'react-redux';
import {loadCart} from './features/cart/cartSlice';
import {authAutoLogin} from './features/auth/authSlice';
import PrivateRoute from './components/PrivateRoute';
import Contact from './pages/Contact';
import './App.css';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadCart());
    dispatch(authAutoLogin());
  }, []);
  return (
    <Router>
      <Header />
      <Container className='d-flex flex-column min-vh-100'>
        <Switch>
          <Route path="/about">
          </Route>
          <Route path="/products/:id">
            <Product />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/order/new">
            <OrderNew />
          </Route>
          <Route exact path="/categories/:name">
            <CategoriesShow />
          </Route>
          <PrivateRoute exact path="/admin">
            <Redirect to="/admin/orders" />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/products">
            <ProductIndex />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/products/new">
            <ProductsCreate />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/categories">
            <CategoriesIndex />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/categories/new">
            <CategoriesNew />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/categories/:id/edit">
            <CategoriesEdit />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/products/:id/edit">
            <ProductsEdit />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/products/:id/variants/new">
            <VariantsCreate />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/products/:id/variants/stock">
            <VariantsStock />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/admin/products/:productId/variants/:id/edit"
          >
            <VariantsEdit />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/orders">
            <OrdersIndex />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/orders/:id">
            <OrderShow />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/products/:productId/variants">
            <VariantsIndex />
          </PrivateRoute>
          <Route exact path="/admin/login">
            <Login />
          </Route>
          <Route exact path="/transactions/:id">
            <AfterTransaction />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Container>
    </Router>
  );
}

export default App;
