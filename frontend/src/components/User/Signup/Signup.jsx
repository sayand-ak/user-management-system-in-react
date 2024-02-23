import { useNavigate } from "react-router-dom";
import { signupUserAsync } from "../../../slices/userAuthAction";
import "./Signup.css";
import { useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { handleInputChange, confirmPasswordHandler } from "../../../utilities/validationUtils";
import { isEmailValid, nameValidate, isPasswordValid, isPhoneValid, isConfirmPasswordValid } from "../../../utilities/validationUtils";
import showToast from '../../Toast/Toast';
import { ToastContainer } from "react-toastify";
import { setCredentials } from '../../../slices/authSlice';


const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [ fname, setFname ] = useState('');
    const [ lname, setLname ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const fnameError = useRef();
    const lnameError = useRef();
    const emailError = useRef();
    const phoneError = useRef();
    const passwordError = useRef();
    const confirmPasswordError = useRef();
        


    const handleProceed = async() => {
        if(
            nameValidate(fname, setFname, fnameError) && 
            nameValidate(lname, setLname, lnameError) &&
            isEmailValid(email, setEmail, emailError) && 
            isPhoneValid(phone, phoneError) && 
            isPasswordValid(password, setPassword, passwordError) &&
            isConfirmPasswordValid(password, confirmPassword, confirmPasswordError)
        ){
            const response = await dispatch(signupUserAsync({ fname, lname, email, phone, password }));
            if(response.payload){
                dispatch(setCredentials(response.payload));
                navigate('/user/setProfile');
            }else if(response.error.message == 'User already exist!'){
                showToast('error', 'User already exists. Please use a different email or login.');
            }else {
                showToast('error', 'An error occurred. Please try again later.');
                }
        }
    }

    return(
        <div className="signup">
            <div className="signup-container">
                <div className="signup-image flex flex-col items-center">
                    <h1 className="text-4xl">Sign up today! </h1>
                    <span>Join us on the Journey </span>
                    
                </div>
                <div className="signup-form flex justify-center items-center">
                    <ul className="flex flex-col gap-3.5 w-3/4">
                        <li>
                            <h1 className="text-3xl font-semibold">Start Your Journey</h1>
                        </li>
                        <li>
                            <div className="flex justify-between flex-wrap gap-2">
                                <div className="flex flex-col flex-1">
                                    <label htmlFor="fname">Firstname</label>
                                    <input 
                                        type="text"
                                        value={fname}
                                        onChange={(e) => {handleInputChange(e, "First name", setFname, fnameError)}}
                                    />
                                    <span 
                                        className='text-red-700 pt-2 text-sm hidden' 
                                        ref={fnameError}
                                    ></span>
                                </div>
                                <div className="flex flex-col flex-1">
                                    <label htmlFor="lname">Lastname</label>
                                    <input 
                                        type="text" 
                                        value={lname}
                                        onChange={(e) => {handleInputChange(e, "Last name", setLname, lnameError)}}
                                    />
                                    <span 
                                        className='text-red-700 pt-2 text-sm hidden' 
                                        ref={lnameError}
                                    ></span>
                                </div>
                                
                            </div>
                        </li>
                        <li>
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => {handleInputChange(e, "Email", setEmail, emailError)}}
                            />
                            <span 
                                className='text-red-700 pt-2 text-sm hidden' 
                                ref={emailError}
                            ></span>
                        </li>
                        <li>
                            <label htmlFor="phone">Phone No.</label>
                            <input 
                                type="text" 
                                value={phone}
                                onChange={(e) => {handleInputChange(e, "Phone number", setPhone, phoneError)}}
                            />
                            <span 
                                className='text-red-700 pt-2 text-sm hidden' 
                                ref={phoneError}
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
                            <label htmlFor="password">Confirm Password</label>
                            <input 
                                type="password" 
                                value={confirmPassword}
                                onChange={(e) => {confirmPasswordHandler(e, password, setConfirmPassword, confirmPasswordError)}}
                            />
                            <span 
                                className='text-red-700 pt-2 text-sm hidden' 
                                ref={confirmPasswordError}
                            ></span>
                        </li>
                        <li className="mt-3">
                            <button onClick={handleProceed}>PROCEED</button>
                            <ToastContainer/>
                        </li>
                        <li className="items-center pt-2">
                            <span className="text-sm">
                                Already have an Account? 
                                <a href="" className="text-sky-600 underline">&nbsp;Sign In</a>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Signup;