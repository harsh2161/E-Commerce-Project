import React, { useState, useEffect } from 'react';
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant';
import MetaData from '../layout/MetaData';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = () => {
        const myForm = {
            password: password,
            confirmPassword: confirmPassword
        }
        dispatch(resetPassword(token, myForm));
    }

    useEffect(() => {
        if(error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(success)
        {
            alert.success("Password Updated Successfully");
            navigate("/login");
            dispatch({
                type:UPDATE_PASSWORD_RESET
            })
        }
    }, [dispatch, error, alert, success]);

    return (
        <div>
            { loading ? <Loader />:
                <div>
                    <MetaData title="Change Password"/>
                    <div className='resetPasswordContainer'>
                        <div className='resetPasswordBox'>    
                            <h2 className='resetPasswordHeading'>Update Password</h2>
                            <form className="resetPasswordForm">
                                <div >
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        name="password"
                                        value={password}
                                        onChange={ (e) => setPassword(e.target.value) }
                                    />
                                </div>
                                <div className="signUpPassword">
                                    <LockIcon />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        name="password"
                                        value={confirmPassword}
                                        onChange={ (e) => setConfirmPassword(e.target.value) }
                                    />
                                </div>
                                <input 
                                    type="button" 
                                    value="Update" 
                                    className="resetPasswordBtn"
                                    onClick={ resetPasswordSubmit }
                                />
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ResetPassword;
