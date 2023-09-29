import axios from "axios";
import fetch from "../lib/fetch";

import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS,
  } from "../constants/productConstant";
import { RESET_PASSWORD_FAIL, RESET_PASSWORD_SUCCESS } from "../constants/userConstant";

/*export const getProduct = (keyword='', currentPage=1, price=[0, 25000]) => async (dispatch) => {
    try
    {
        dispatch({ type: ALL_PRODUCT_REQUEST });
        const keyAdded = keyword !== '' ? `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}` : `/api/v1/products`;
        const { data } = await axios.get(keyAdded);
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        });
    }catch(error){
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
}*/

export const getProduct =(keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) => async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
};

export const getAdminProduct = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCT_REQUEST });
  
        const response = new Promise((resolve, reject) => {
            fetch(
                `${process.env.REACT_APP_BACKEND_URL}admin/products`,
                "GET"
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
                type: ADMIN_PRODUCT_SUCCESS,
                payload: data.products,
            });
        }).catch(error => {
            dispatch({ type: ADMIN_PRODUCT_FAIL, payload: error.message});
        });
  
    } catch (error) {
        dispatch({ type: ADMIN_PRODUCT_FAIL, payload: error.message});
    }
};

const createProduct = (productData) => async(dispatch) => {
    try
    {
        dispatch({ type: NEW_PRODUCT_REQUEST });
        const response = new Promise((resolve, reject) => {
            fetch(
                `${process.env.REACT_APP_BACKEND_URL}/admin/products/new`,
                "POST",
                productData
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
                type: NEW_PRODUCT_SUCCESS,
                payload: data,
            });
        }).catch(error => {
            dispatch({ type: NEW_PRODUCT_FAIL, payload: error.response.data.message});
        });
    }catch(error)
    {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
}

const updateProduct = (id, productData) => async(dispatch) => {
    try
    {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });
        const response = new Promise((resolve, reject) => {
            fetch(
                `${process.env.REACT_APP_BACKEND_URL}admin/product/${id}`,
                "PUT",
                productData
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
                type: UPDATE_PRODUCT_SUCCESS,
                payload: data.success,
            });
        }).catch(error => {
            dispatch({ type: UPDATE_PRODUCT_FAIL, payload: error.message});
        });
    }catch(error)
    {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });

        const response = new Promise((resolve, reject) => {
            fetch(
                `${process.env.REACT_APP_BACKEND_URL}admin/product/${id}`,
                "DELETE",
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
                type: DELETE_PRODUCT_SUCCESS,
                payload: data.success,
            });
        }).catch(error => {
            dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.message});
        });
    
        
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

const getProductDetails = (id) => async(dispatch) => {
    try
    {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const response = new Promise((resolve, reject) => {
            fetch(
                `${process.env.REACT_APP_BACKEND_URL}product/${id}`,
                "GET"
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
                type: PRODUCT_DETAILS_SUCCESS,
                payload: data,
            });
        }).catch(error => {
            dispatch({ type: RESET_PASSWORD_FAIL, payload: error.message});
        });
    }catch(error)
    {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
}

const newReviewDetails = (reviewData) => async(dispatch) => {
    try
    {
        dispatch({ type: NEW_REVIEW_REQUEST });
        const response = new Promise((resolve, reject) => {
            fetch(
                `${process.env.REACT_APP_BACKEND_URL}review`,
                "PUT",
                reviewData
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
                type: NEW_REVIEW_SUCCESS,
                payload: data.success,
            });
        }).catch(error => {
            dispatch({ type: NEW_REVIEW_FAIL, payload: error.message});
        });
    }catch(error)
    {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
}

const getAllReviews = (id) => async(dispatch) => {
    try
    {
        dispatch({ type: ALL_REVIEW_REQUEST });
        const response = new Promise((resolve, reject) => {
            fetch(
                `${process.env.REACT_APP_BACKEND_URL}reviews?id=${id}`,
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
                type: ALL_REVIEW_SUCCESS,
                payload: data.reviews,
            });
        }).catch(error => {
            dispatch({ type: ALL_REVIEW_FAIL, payload: error.message});
        });
    }catch(error)
    {
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
}

const deleteReviews = (reviewId, productId) => async(dispatch) => {
    try
    {
        dispatch({ type: DELETE_REVIEW_REQUEST });
        const response = new Promise((resolve, reject) => {
            fetch(
                `${process.env.REACT_APP_BACKEND_URL}reviews?id=${reviewId}&productId=${productId}`,
                "DELETE",
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
                type: DELETE_REVIEW_SUCCESS,
                payload: data.success,
            });
        }).catch(error => {
            dispatch({ type: ALL_REVIEW_FAIL, payload: error.message});
        });
    }catch(error)
    {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

export { deleteReviews, getAllReviews, getProductDetails, newReviewDetails, createProduct, updateProduct };