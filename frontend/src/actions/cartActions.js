import { ADD_TO_CART, REMOVE_CART_ITEMS, SAVE_SHIPPING_INFO } from "../constants/cartConstant";
import fetch from "../lib/fetch";

const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const response = new Promise((resolve, reject) => {
        fetch(
            `${process.env.REACT_APP_BACKEND_URL}product/${id}`,
            "GET",
        ).then(
            (res) => {
                res.json().then((resp) => {
                    if(resp && resp.success === true)
                    {
                        resolve(resp);
                    }else{
                        reject();
                    }
                });
            },
            (error) => {
                error.json().then((errors) => {
                    reject(errors);
                });
            }
        );
    });

    response.then(data => {
       dispatch({
            type: ADD_TO_CART,
            payload: {
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.image[0].public_url,
                Stock: data.product.Stock,
                quantity,
            },
        });
        const updatedCartItems = getState().cart.cartItems;
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    });
}

const removeItemsFromCart = (id) => async(dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEMS,
        payload: id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });
    localStorage.setItem("shippingInfo", JSON.stringify(data));
}

export { addItemsToCart, removeItemsFromCart }