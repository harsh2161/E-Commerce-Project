import React, { useState, useEffect } from 'react';
import "./ForgotPassword.css";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant';
import MetaData from '../layout/MetaData';

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { user } = useSelector((state) => state.user);
    const { error, loading, message } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = () => {
        const myForm = {
            email: email,
        }
        dispatch(forgotPassword(myForm));
    }

    useEffect(() => {
        if(error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(message)
        {
            alert.success(message);
        }
    }, [dispatch, error, alert, message]);

    return (
        <>
            { loading ? <Loader />:
                <div>
                    <MetaData title="Forgot Password"/>
                    <div className='forgotPasswordContainer'>
                        <div className='forgotPasswordBox'>    
                            <h2 className='forgotPasswordHeading'>Forgot Password</h2>
                            <form className="forgotPasswordForm">
                                <div className="forgotPasswordEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder='Email'
                                        required
                                        name="email"
                                        value={email}
                                        onChange={ (e)=>setEmail(e.target.value) }
                                    />
                                </div>
                                <input 
                                    type="button" 
                                    value="Send" 
                                    className="forgotPasswordBtn"
                                    onClick={ forgotPasswordSubmit }
                                />
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default ForgotPassword;
