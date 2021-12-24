import Product from "./Pages/Product";
import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Success from "./Pages/Success";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Orders from "./Pages/Orders";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/products/:category">
        <ProductList />
      </Route>
      <Route path="/product/:id">
        <Product />
      </Route>
      <Route path="/cart">
        <Cart />
      </Route>
      <Route path="/orders">
        <Orders />
      </Route>
      <Route path="/Success">
        <Success/>
      </Route>
      <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
      <Route path="/register">
        {user ? <Redirect to="/" /> : <Register />}
      </Route>
    </Router>
  )
};

export default App;
