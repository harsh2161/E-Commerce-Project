import React from 'react';
import "./Cart.css"
import CardItemCard from "./CartItemCard.js";
import { useSelector, useDispatch } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartActions';
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cartItems} = useSelector((state) => state.cart);

    const increaseQuantity = (event, id, quantity, Stock) => {
        event.preventDefault();
        const newQty = quantity + 1;
        if(Stock <= quantity)
        {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    }

    const decreaseQuantity = (event, id, quantity) => {
        event.preventDefault();
        const newQty = quantity - 1;
        if(1 >= quantity)
        {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    }    

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    }

    const checkoutHandler = () => {
        navigate("/login?redirect=shipping");
    }

    return (
        <>
            {
                cartItems.length === 0 ? 
                <div className='emptyCart'>
                    <RemoveShoppingCartIcon />
                    <Typography>{"No Items In Cart :("}</Typography>
                    <Link to="/products">View Product</Link>
                </div>
                :
                <div className="cartPage">
                    <div className="cartHeader">
                        <p>Product</p>
                        <p>Quantity</p>
                        <p>Subtotal</p>
                    </div>
                    {
                        cartItems && cartItems.map((item, index) => (
                            <div className='cartContainer' key={item.product}>
                                <CardItemCard item={item} deleteCartItems={deleteCartItems} />
                                <div key={index} className="cartInput">
                                    <button onClick={(event) => decreaseQuantity(event, item.product, item.quantity)}>-</button>
                                    <input type="number" value={item.quantity} readOnly/>
                                    <button onClick={(event) => increaseQuantity(event, item.product, item.quantity, item.Stock)}>+</button>
                                </div>
                                <p className="cartSubtotal">{`$${item.price*item.quantity}`}</p>
                            </div>
                        ))
                    }
                    <div className='cartGrossProfit'>
                        <div></div>
                        <div className="cartGrossProfitBox">
                            <p>Gross Total</p>
                            <p>${cartItems.reduce(
                                (acc, item) => acc + item.quantity * item.price, 0
                            )}</p>
                        </div>
                        <div></div>
                        <div className="checkOutBtn">
                            <button onClick={checkoutHandler}>Check Out</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Cart;
