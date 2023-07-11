import React, { useState, useEffect } from 'react';
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant';
import MetaData from '../layout/MetaData';

const UpdateProfile = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const alert = useAlert();

    const { user } = useSelector((state) => state.user);
    const { error, loading, isUpdated } = useSelector((state) => state.profile);

    const [name, setName] = useState((user && user.name) || "");
    const [email, setEmail] = useState((user && user.email) || "");

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState((user && user.avatar && user.avatar.url) || "/Profile.png");

    const updateProfileSubmit = () => {
        const myForm = {
            name: name,
            email: email,
            avatar: avatar
        }
        dispatch(updateProfile(myForm));
    }

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2)
            {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    useEffect(() => {
        if(user)
        {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if(error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(isUpdated)
        {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());
            navigate("/account");
            dispatch({
                type:UPDATE_PROFILE_RESET
            })
        }
    }, [dispatch, error, alert, user, isUpdated]);

    return (
        <div>
            { loading ? <Loader />:
                <div>
                    <MetaData title="Update Profile"/>
                    <div className='updateProfileContainer'>
                        <div className='updateProfileBox'>    
                            <h2 className='updateProfileHeading'>Update Profile</h2>
                            <form className="updateProfileForm" encType="multipart/form-data">
                                <div className='updateProfileName'>
                                    <FaceIcon />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={ (e)=>setName(e.target.value) }
                                    />
                                </div>
                                <div className="updateProfileEmail">
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
                                <div id="updateProfileImage">
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={ updateProfileDataChange }
                                    />
                                </div>
                                <input 
                                    type="button" 
                                    value="Update" 
                                    className="updateProfileBtn"
                                    onClick={ updateProfileSubmit }
                                />
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default UpdateProfile;
