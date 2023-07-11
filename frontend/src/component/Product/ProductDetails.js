import React, { useEffect, useState } from 'react';
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { clearErrors, getProductDetails, newReviewDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import ReviewCard from "./ReviewCard.js";
import { useAlert } from 'react-alert';
import { useSelector, useDispatch } from 'react-redux';
import { addItemsToCart } from "../../actions/cartActions";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from '../../constants/productConstant';

const ProductDetails = () => {
    const { id } = useParams();
    const alert = useAlert();

    const dispatch = useDispatch();

    const {product, loading, error} = useSelector(
        (state) => state.productDetails
    );

    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
    )

    useEffect(() => {
        if(error){
            alert.error(error);
        }
        if(reviewError){
            alert.error(reviewError);
            dispatch(clearErrors());
        }
        if(success){
            alert.success("Review Submitted Successfully");
            dispatch({type: NEW_REVIEW_RESET});
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert, success, reviewError]);

    const options = {
        size: "large",
        value: product && product.ratings,
        readOnly: true,
        precision: 0.5
    }

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if(product.Stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    }

    const decreaseQuantity = () => {
        if(1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Items Added To Cart");
    };

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {

        const myForm = {
            "rating": rating,
            "comment": comment,
            "productId": id
        }

        dispatch(newReviewDetails(myForm));

        setOpen(false);
    }

    return (
        <>
            {
                product && product.ratings !== null ?
                <div className="Products">
                    <div className="ProductDetails">
                        <div>
                            <Carousel>
                                {product && product.image && product.image.map((item,i)=> (
                                    <img
                                        className='CarouselImage'
                                        key={item.public_url}
                                        src={item.public_url}
                                        alt={`${i} Slide`}
                                    />  
                                ))}
                            </Carousel>
                        </div>
                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product && product.name}</h2>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span>({product && product.noOfReviews} Reviews)</span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>${product && product.price}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly value={quantity} type='number'/>
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>{" "}
                                    <button disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler}>Add To Cart</button>
                                </div>
                                <p>
                                    Status:{" "}
                                    <b className={ product && product.Stock < 1 ? "redColor": "greenColor" }>
                                        { product && product.Stock < 1 ? "OutOfStock": "InStock" }
                                    </b>
                                </p>
                            </div>
                            <div className="detailsBlock-4">
                                Description: <p>{product && product.description}</p>
                            </div>
                            <div className='detailsBlock-4'>
                                <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>
                            </div>
                        </div>
                    </div>
                </div> : <Loader/>
            }
            <h3 className='reviewsHeading'>Reviews</h3>

            <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}>
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submitDialog">
                <Rating
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                    size="large" />
                <textarea
                    className="submitDialogTextArea"
                    cols="30"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}></textarea>
                </DialogContent>
                <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">
                    Cancel
                </Button>
                <Button onClick={reviewSubmitHandler} color="primary">
                    Submit
                </Button>
                </DialogActions>
            </Dialog>

            {
                product && product.reviews && product.reviews[0] ? 
                <>
                    <div className='reviews'>
                        {product.reviews && product.reviews.map((review) => <ReviewCard review={review}/>)}
                    </div>
                </> : <div className='noReviews'>No Reviews Yet!!!</div>
            }
        </>
    );
}

export default ProductDetails;
