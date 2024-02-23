import { useRef, useState } from "react";
import "./Login.css";
import { validateName, isPasswordValid } from "../../../utilities/validationUtils";
import { useNavigate } from 'react-router-dom';
import showToast from '../../Toast/Toast';
import { ToastContainer } from "react-toastify";
import { loginAdminAsync } from "../../../slices/adminAuthAction";
import { setAdminCredentials } from "../../../slices/authSlice";
import { useDispatch } from 'react-redux';

const Login = () => {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const usernameError = useRef();
    const passwordError = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const checkPassword = (e) => {
        isPasswordValid(e.target.value, passwordError)
        setPassword(e.target.value);
    }

    const submitAdminLogin = async() => {
        if(isPasswordValid(password, passwordError) && validateName(username, setUsername, usernameError)){
            const response = await dispatch(loginAdminAsync({username, password}));
            await dispatch(setAdminCredentials(response.payload));
            if(response.payload){
                showToast("success", "Login Successful",()=>{
                    navigate('/admin/home');
                })
            }
        }else{
            showToast("error", "Invalid entries");
        }
    }

    return(
        <div className="login">
        <div className="login-container w-full flex-col mx-4 sm:w-5/6 sm:flex-row xl:w-3/4">
            <div className="login-banner sm:w-1/2">
                
            </div>
            <div className="form-container p-5">
                <form action="#">
                    <ul className="flex flex-col gap-3 w-96">
                        <li>
                            <h1 className="text-3xl font-semibold pb-5">Welcome Back!</h1>
                            
                        </li>
                        <li className="flex flex-col gap-3">
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text" 
                                value={username}
                                onChange={(e) => {validateName(e.target.value, setUsername, usernameError)}}
                            />
                            <span 
                                ref={usernameError}
                                className="text-red-400 text-sm"
                            ></span>
                        </li>
                        <li className="flex flex-col gap-3">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => {checkPassword(e)}}
                            />
                            <span 
                                ref={passwordError}
                                className="text-red-400 text-sm"
                            ></span>
                        </li>
                        <li className="flex justify-start pt-4">
                            <button 
                                onClick={submitAdminLogin}
                            >LOGIN</button>
                            <ToastContainer/>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
        </div>
    )
}

export default Login;