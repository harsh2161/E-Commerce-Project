import React, { useEffect } from 'react';
import "./Home.css";
import Product from "./ProductCard.js";
import MetaData from '../layout/MetaData.js';
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from '../layout/Loader/Loader';
import {useAlert} from "react-alert";

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading, error, products} = useSelector(
        (state) => state.products
    );
    useEffect(()=> {
        if(error)
        {
            return alert.error(error);
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]); 
    return (
        <>
            {loading ? <Loader/>: <>
            <MetaData title= "E-Commerce"/>
            <div className="banner">
                <p>Welcome To Ecommerce</p>
                <h1>Find Amazing Product Below</h1>
                <a href="#container">
                    <button>
                        Scroll
                    </button>
                </a>
            </div>
            <h2 className='homeHeading'>Featured Products</h2>
            <div className="container" id="container">
                {products && products.map((product) => <Product key={product._id} product={product}/>)}
            </div>
        </>}
        </>
    );
}

export default Home;
