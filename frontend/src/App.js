import './App.css';
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { Route, BrowserRouter as Router, Routes, Switch } from 'react-router-dom';
import WebFont from "webfontloader";
import React, { useState } from "react";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Product.js";
import Search from "./component/Product/Search.js";
import LoginSignup from "./component/User/LoginSignUp.js";
import store from "./store";
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import ProtectedRoute from './component/Route/ProtectedRoute';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from "./component/User/ResetPassword.js";
import About from "./component/layout/About/About.js";
import Contact from "./component/layout/Contact/Contact.js";
import Cart from "./component/Cart/Cart";
import axios from 'axios';

function App() {

  const { isAuthenticated, user} = useSelector(state=> state.user);

  const [stripeApiKey, setStripeApiKey] = React.useState("");

  async function getStripeApiKey(){
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
      WebFont.load({
        google:{
          families:["Roboto","Droid Sans", "Chilanka"]
        }
      });
      store.dispatch(loadUser());
      getStripeApiKey();
  }, []);
  
  return (
    <>
      <Router>
        <Header/>
        { isAuthenticated && <UserOptions user={user}/> }
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/product/:id" element={<ProductDetails/>}/>
          <Route exact path="/products" element={<Products/>}/>
          <Route exact path="/contact" element={<Contact/>} />
          <Route exact path="/about" element={<About/>} />
          <Route path="/products/:keyword" element={<Products/>}/>
          <Route exact path="/search" element={<Search/>} />
          <Route exact path="/login" element={<LoginSignup/>}/>
          <Route exact path="/account" element={<ProtectedRoute fileName="Profile"/>}/>
          <Route exact path="/me/update" element={<ProtectedRoute fileName="UpdateProfile"/>}/>
          <Route exact path="/password/update" element={<ProtectedRoute fileName="UpdatePassword"/>}/>
          <Route exact path="/password/forgot" element={<ForgotPassword/>}/>
          <Route exact path="/password/reset/:token" element={<ResetPassword/>}/>
          <Route exact path="/cart" element={<Cart/>}/>
          <Route exact path="/shipping" element={<ProtectedRoute fileName="Shipping"/>}/>
          <Route exact path="/process/payment" element={<ProtectedRoute fileName="ProcessPayment" stripeApiKey={stripeApiKey}/>}/>
          <Route exact path="/success" element={<ProtectedRoute fileName="OrderSuccess"/>}/>
          <Route exact path="/orders" element={<ProtectedRoute fileName="MyOrders"/>}/>
          <Route exact path="/order/confirm" element={<ProtectedRoute fileName="OrderConfirm"/>}/>
          <Route exact path="/order/:id" element={<ProtectedRoute fileName="OrderDetails"/>}/>
          <Route exact path="/admin/dashboard" element={<ProtectedRoute fileName="AdminDashboard" isAdmin={"admin"}/>}/>
          <Route exact path="/admin/products" element={<ProtectedRoute fileName="AdminProducts" isAdmin={"admin"}/>}/>
          <Route exact path="/admin/product/:id" element={<ProtectedRoute fileName="EditProducts" isAdmin={"admin"}/>}/>
          <Route exact path="/admin/productcreate/" element={<ProtectedRoute fileName="CreateProducts" isAdmin={"admin"}/>}/>
          <Route exact path="/admin/orders" element={<ProtectedRoute fileName="OrdersList" isAdmin={"admin"}/>}/>
          <Route exact path="/admin/order/:id" element={<ProtectedRoute fileName="ProcessOrder" isAdmin={"admin"}/>}/>
          <Route exact path="/admin/users" element={<ProtectedRoute fileName="UsersList" isAdmin={"admin"}/>}/>
          <Route exact path="/admin/user/:id" element={<ProtectedRoute fileName="UpdateUser" isAdmin={"admin"}/>}/>
          <Route exact path="/admin/reviews" element={<ProtectedRoute fileName="ProductReviews" isAdmin={"admin"}/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}


export default App;
