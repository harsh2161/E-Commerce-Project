import React, { useState, useEffect } from 'react';
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updatePassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant';
import MetaData from '../layout/MetaData';

const UpdatePassword = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = () => {
        const myForm = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        }
        dispatch(updatePassword(myForm));
    }

    useEffect(() => {
        if(error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(isUpdated)
        {
            alert.success("Password Changed Successfully");
            navigate("/account");
            dispatch({
                type:UPDATE_PASSWORD_RESET
            })
        }
    }, [dispatch, error, alert, isUpdated]);

    return (
        <div>
            { loading ? <Loader />:
                <div>
                    <MetaData title="Change Password"/>
                    <div className='updatePasswordContainer'>
                        <div className='updatePasswordBox'>    
                            <h2 className='updatePasswordHeading'>Update Password</h2>
                            <form className="updatePasswordForm">
                                <div className="signUpPassword">
                                    <VpnKeyIcon />
                                    <input
                                        type="password"
                                        placeholder="Old Password"
                                        required
                                        name="password"
                                        value={oldPassword}
                                        onChange={ (e) => setOldPassword(e.target.value) }
                                    />
                                </div>
                                <div className="signUpPassword">
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        name="password"
                                        value={newPassword}
                                        onChange={ (e) => setNewPassword(e.target.value) }
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
                                    value="Change" 
                                    className="updatePasswordBtn"
                                    onClick={ updatePasswordSubmit }
                                />
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default UpdatePassword;
