import React from 'react';
import { Link } from "react-router-dom";
import "./Product.css";
import ReactStars from "react-rating-stars-component";

const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 2.5,
    isHalf: true,
};

const Product = ( { product } ) => {
  const imageUrl = product.image == undefined ? "" : product.image[0] == undefined ? "" : product.image[0].url;
  return (
    <Link className='productCard' to={product._id}>
        <img src={imageUrl} alt={product.name}/>
        <p>{product.name}</p>
        <div>
            <ReactStars {...options} /><span> (256 Reviews) </span>
        </div>
        <span>Price: {product.price}</span>
    </Link>
  );
}

export default Product;
