import React, { useEffect } from 'react';
import "./Home.css";
import Product from "./Product.js";
import MetaData from '../layout/MetaData.js';
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";

const product = {
    name: "Blue T-Shirt",
    images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
    price: "3000",
    _id: "asjxue82soi172xbsb-sacbhbxe711-scnasdbajhba",
}

const Home = () => {
    const dispatch = useDispatch();
    const {loading, error, products, productCount} = useSelector(
        (state) => state.products
    );
    useEffect(()=> {
        dispatch(getProduct());
    }, [dispatch]); 
  return (
    <>
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
            {products && products.map((product) => <Product product={product}/>)};
        </div>
    </>
  );
}

export default Home;
