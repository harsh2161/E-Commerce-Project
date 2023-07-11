import React, { useRef, useState, useEffect } from 'react';
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login, registerUser } from '../../actions/userAction';
import { useAlert } from 'react-alert';

const LoginSignup = () => {

    const location = useLocation()
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, loading, isAuthenticated } = useSelector((state) => state.user);

    const switcherTab = useRef(null);
    const [isLoginPage, setIsLoginPage] = useState(true);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({
       name:"",
       email:"",
       password:"",
    });
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const { name, email, password } = user;

    const loginSubmit = () => {
        dispatch(login(loginEmail, loginPassword));
    }

    const registerSubmit = () => {
        const myForm = {
            name: name,
            email: email,
            password: password,
            avatar: avatar
        }
        dispatch(registerUser(myForm));
    }

    const registerDataChange = (e) => {
        if(e.target.name === "avatar")
        {
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
        else
        {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    }

    const switchTabs = (e, tab) => {
        if(tab === "login")
        {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
            setIsLoginPage(true);
        }
        if(tab === "register")
        {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
            setIsLoginPage(false);
        }
    }

    const redirect = location && location.search ? location.search.split("=")[1] : "account";

    useEffect(() => {
        if(error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(isAuthenticated)
        {
            window.location = `${window.location.origin}/${redirect}`;
        }
    }, [dispatch, error, alert, navigate ,isAuthenticated, redirect]);

    return (
        <>
        {
            loading ? <Loader/>: 
            <div className='LoginSignUpContainer'>
            <div className='LoginSignUpBox'>
                <div>
                    <div className='login_signUp_toggle'>
                        <p onClick={ (e) => switchTabs(e, "login") }>LOGIN</p>
                        <p onClick={ (e) => switchTabs(e, "register")}>REGISTER</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>
                { isLoginPage && <form className="loginForm">
                    <div className="loginEmail">
                        <MailOutlineIcon />
                        <input
                            type="email"
                            placeholder='Email'
                            required
                            value={loginEmail}
                            onChange={ (e)=> setLoginEmail(e.target.value) }
                        />
                    </div>
                    <div className="loginPassword">
                        <LockOpenIcon />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={loginPassword}
                            onChange={ (e)=> setLoginPassword(e.target.value) }
                        />
                    </div>
                    <Link to="/password/forgot">Forget Password ?</Link>
                    <input type="button" value="Login" className="loginBtn" onClick={loginSubmit}/>
                </form>}
                { !isLoginPage && <form className="signUpForm" encType="multipart/form-data">
                    <div className='signUpName'>
                        <FaceIcon />
                        <input
                            type="text"
                            placeholder="Name"
                            required
                            name="name"
                            value={name}
                            onChange={ registerDataChange }
                        />
                    </div>
                    <div className="signUpEmail">
                        <MailOutlineIcon />
                        <input
                            type="email"
                            placeholder='Email'
                            required
                            name="email"
                            value={email}
                            onChange={ registerDataChange }
                        />
                    </div>
                    <div className="signUpPassword">
                        <LockOpenIcon />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            name="password"
                            value={password}
                            onChange={ registerDataChange }
                        />
                    </div>
                    <div id="registerImage">
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={ registerDataChange }
                        />
                    </div>
                    <input 
                        type="button" 
                        value="Register" 
                        className="signUpBtn"
                        onClick={ registerSubmit }
                    />
                </form>}
            </div>
        </div>
        }
        </>
    );
}

export default LoginSignup;
