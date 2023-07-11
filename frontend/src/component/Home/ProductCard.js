import React from 'react';
import { Link } from "react-router-dom";
import "./Product.css";
import { Rating } from "@material-ui/lab";

const Product = ( { product } ) => {
  const imageUrl = product.image === undefined ? "" : product.image[0] === undefined ? "" : product.image[0].public_url;
  const options = {
    size: "large",
    value: product && product.ratings,
    readOnly: true,
    precision: 0.5
  }
  return (
    <Link className='productCard' to={`/product/${product._id}`}>
        <img src={imageUrl} alt={product.name}/>
        <p>{product.name}</p>
        <div>
          <Rating {...options} /><span> ({product.noOfReviews} Reviews) </span>
        </div>
        <span>${product.price}</span>
    </Link>
  );
}

export default Product;
