
import { useNavigate  } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import './Login.css';
import { loginUserAsync } from '../../../slices/usersApiSlice';
import { setCredentials } from '../../../slices/authSlice';
import { isEmailValid, isPasswordValid } from '../../../utilities/validationUtils';
import { handleInputChange } from '../../../utilities/validationUtils';
import showToast from '../../Toast/Toast';
import { ToastContainer } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailError = useRef(null);
    const passwordError = useRef(null);

    const handleLogin = async () => {
        try {

            if(isEmailValid(email, emailError) && isPasswordValid(password, setPassword, passwordError)){
                const response = await dispatch(loginUserAsync({ email, password }));
        
                if (response.payload) {
                    dispatch(setCredentials(response.payload));
                    showToast("success", "Login Successful...", ()=>{
                        navigate("/user/home");
                    })
                } else {
                    showToast("error", "User does'nt exist!")
                }
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };
    
    
    return(
        <div className='login'>
            <div className="login-container w-full mx-4 sm:w-5/6 sm:flex-row xl:w-3/4">
                <div className="form-container sm:w-1/2">
                    <ul className='h-full flex flex-col w-3/4 justify-center gap-7 '>
                       <li>
                            <h1 className='text-3xl font-semibold'>Login for Exclusive Features</h1>
                       </li> 
                       <li>
                            <label htmlFor="email">Email</label>
                            <input 
                                type="text" 
                                id="email" 
                                value={email} 
                                onChange={(e) => {handleInputChange(e, "Email", setEmail, emailError)}}
                            />
                            <span 
                                className='text-red-700 pt-2 text-sm hidden' 
                                ref={emailError}
                            ></span>
                        </li>

                       <li>
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => {handleInputChange(e, "Password", setPassword, passwordError)}}
                            />
                            <span 
                                className='text-red-700 pt-2 text-sm hidden' 
                                ref={passwordError}
                            ></span>

                       </li>
                       <li>
                            <button onClick={handleLogin}>LOGIN</button>

                            <ToastContainer/>

                       </li>
                       <li className='items-center pt-10 pb-5'>
                        <span className='text-sm'>
                            Don&apos;t have an Account? 
                            <a 
                                href="/user/signup" 
                                className='p-2 text-blue-700 underline'
                            >Sign up</a> 
                        </span>
                       </li>
                    </ul>
                </div>
                <div className="login-banner sm:w-1/2">
                    <h1>Welcome back!</h1>
                    <span>Log in for a personalized experience.</span>
                </div>
            </div>
        </div>
    )
}

export default Login;