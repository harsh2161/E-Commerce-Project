import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Profile from '../User/Profile';
import UpdateProfile from '../User/UpdateProfile.js';
import UpdatePassword from '../User/UpdatePassword.js';
import Shipping from "../Cart/Shipping.js";
import ConfirmOrder from "../Cart/ConfirmOrder.js";
import ProcessPayment from "../Cart/Payment.js";
import OrderSuccess from "../Cart/OrderSuccess.js";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import MyOrders from "../Order/MyOrders.js";
import OrderDetails from "../Order/OrderDetails.js";
import Dashboard from '../admin/Dashboard.js';
import ProductList from '../admin/ProductList.js';
import NewProduct from '../admin/NewProduct';
import UpdateProduct from "../admin/UpdateProduct.js";
import OrdersList from "../admin/OrdersList.js";
import ProcessOrder from "../admin/PocessOrder.js";
import UsersList from "../admin/UsersList.js";
import UpdateUser from "../admin/UpdateUser.js";
import ProductReviews from "../admin/ProductReviews.js";

const ProtectedRoute = ({fileName: fileName, ...rest}) => {
    const navigate = useNavigate();

    const {loading, isAuthenticated, user} = useSelector((state) => state.user);

    return (
        <>
            {!loading && <>{
                (isAuthenticated === false) ? navigate("/login"):
                <>
                {fileName === "Profile" && <Profile />}
                {fileName === "UpdateProfile" && <UpdateProfile />}
                {fileName === "UpdatePassword" && <UpdatePassword />}
                {fileName === "Shipping" && <Shipping />}
                {fileName === "OrderConfirm" && <ConfirmOrder/>}
                {fileName === "ProcessPayment" && rest.stripeApiKey && ( <Elements stripe={loadStripe(rest.stripeApiKey)}> <ProcessPayment/> </Elements>)}
                {fileName === "OrderSuccess" && <OrderSuccess/>}
                {fileName === "MyOrders" && <MyOrders/>}
                {fileName === "OrderDetails" && <OrderDetails/>}
                {fileName === "AdminDashboard" && (rest.isAdmin === user.role ? <Dashboard/> : <Profile />)}
                {fileName === "AdminProducts" && (rest.isAdmin === user.role ? <ProductList/> : <Profile />)}
                {fileName === "CreateProducts" && (rest.isAdmin === user.role ? <NewProduct/> : <Profile />)}
                {fileName === "EditProducts" && (rest.isAdmin === user.role ? <UpdateProduct/> : <Profile />)}
                {fileName === "OrdersList" && (rest.isAdmin === user.role ? <OrdersList/> : <Profile />)}
                {fileName === "ProcessOrder" && (rest.isAdmin === user.role ? <ProcessOrder/> : <Profile />)}
                {fileName === "UsersList" && (rest.isAdmin === user.role ? <UsersList/> : <Profile />)}
                {fileName === "UpdateUser" && (rest.isAdmin === user.role ? <UpdateUser/> : <Profile />)}
                {fileName === "ProductReviews" && (rest.isAdmin === user.role ? <ProductReviews/> : <Profile />)}
                </>
            }
            </>}
        </>
    );
}


export default ProtectedRoute;
