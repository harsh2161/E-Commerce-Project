import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS,
} from "../constants/orderConstant";

import fetch from "../lib/fetch";

export const createOrder = (order) => async (dispatch) => {
    try{
        dispatch({ type: CREATE_ORDER_REQUEST });

        const response = new Promise((resolve, reject) => {
            fetch(
                `${process.env.REACT_APP_BACKEND_URL}order/new`,
                "POST",
                order
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
                type: CREATE_ORDER_SUCCESS,
                payload: data,
            });
        }).catch(error => {
            dispatch({ type: CREATE_ORDER_FAIL, payload: error.message});
        });
    }catch(error){
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const myOrders = () => async (dispatch) => {
    try{
        dispatch({ type: MY_ORDERS_REQUEST });

        const response = new Promise((resolve, reject) => {
            fetch(
                `${process.env.REACT_APP_BACKEND_URL}orders/me`,
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
                type: MY_ORDERS_SUCCESS,
                payload: data.orders,
            });
        }).catch(error => {
            dispatch({ type: MY_ORDERS_FAIL, payload: error.message});
        });
    }catch(error){
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const getAllOrders = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_ORDERS_REQUEST });

      const response = new Promise((resolve, reject) => {
        fetch(
            `${process.env.REACT_APP_BACKEND_URL}admin/orders`,
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
            type: ALL_ORDERS_SUCCESS,
            payload: data.orders,
        });
    }).catch(error => {
        dispatch({ type: ALL_ORDERS_FAIL, payload: error.message});
    });

    } catch (error) {
      dispatch({
        type: ALL_ORDERS_FAIL,
        payload: error.response.data.message,
      });
    }
};

export const updateOrder = (id, order) => async (dispatch) => {
    try{
        dispatch({ type: UPDATE_ORDER_REQUEST });

        const response = new Promise((resolve, reject) => {
            fetch(
                `${process.env.REACT_APP_BACKEND_URL}admin/order/${id}`,
                "PUT",
                order
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
                type: UPDATE_ORDER_SUCCESS,
                payload: data.success,
            });
        }).catch(error => {
            dispatch({ type: UPDATE_ORDER_FAIL, payload: error.message});
        });
    }catch(error){
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const deleteOrder = (id) => async (dispatch) => {
    try{
        dispatch({ type: DELETE_ORDER_REQUEST });

        const response = new Promise((resolve, reject) => {
            fetch(
                `${process.env.REACT_APP_BACKEND_URL}admin/order/${id}`,
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
                type: DELETE_ORDER_SUCCESS,
                payload: data.success,
            });
        }).catch(error => {
            dispatch({ type: DELETE_ORDER_FAIL, payload: error.message});
        });
    }catch(error){
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const getOrderDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });

      const response = new Promise((resolve, reject) => {
        fetch(
            `${process.env.REACT_APP_BACKEND_URL}order/${id}`,
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
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
    }).catch(error => {
        dispatch({ type: ORDER_DETAILS_FAIL, payload: error.response.data.message});
    });

    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};