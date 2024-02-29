import { MdEdit } from "react-icons/md";
import "./Signup.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import showToast from '../../Toast/Toast';
import { ToastContainer } from "react-toastify";
import { setProfileAsync } from "../../../slices/userAuthAction";
import { useDispatch} from "react-redux";
import { useSelector } from "react-redux";
import { setCredentials } from '../../../slices/authSlice';



const SetProfile = () => {
    const [ img, setImg ]  = useState(null);
    const [ dob, setDob ] = useState("");
    const [editImgIcon, profileImageRef, imgError, dobError] = [useRef(), useRef(), useRef(), useRef()];
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const user_id = useSelector(state => state.auth.userInfo.userData._id);

    const skipProfileSetup = () => {
        showToast("success", "signup successful..", ()=>{
            navigate("/user/login");
        })
    }

    const changeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                profileImageRef.current.style.backgroundImage = `url('${reader.result}')`;
            };
            reader.readAsDataURL(file);
        }
        editImgIcon.current.style.opacity = 1
        
        setImg(file);
    };

    const handleSubmit = async() => {
        if(img == null){
            imgError.current.innerText = "Please choose an image";
        }else if(dob == ""){
            dobError.current.innerText = "please choose a date";
        }else{
            const formData = new FormData();
            formData.append("profileImage", img);
            formData.append("dob", dob);
            formData.append("user_id", user_id);

            const response = await dispatch(setProfileAsync(formData));

            if(response.payload){
                await dispatch(setCredentials(response.payload))
                showToast("success", "Signup successfull! Welcome...",()=>{navigate("/user/home")})
            }
            
        }
        
        setTimeout(()=>{
            imgError.current.innerText = "";
            dobError.current.innerText = "";
        }, 5000);
    }
      

    return(
        <div className="signup">
            <div className="signup-container">
                <div className="setProfile-image flex-1 flex justify-center pt-20">
                    <h1>Tell us more about you!</h1>
                </div>

                <div className="setProfile-form flex-1">
                    <div className="flex flex-col flex-wrap pl-10 pt-16 gap-4 items-center relative">
                        
                        <a className=" skip-link" onClick={skipProfileSetup}>skip {'>>>'}</a>

                        <div 
                            className="profile-image-div relative flex p-0" 
                            ref={profileImageRef}
                        >
                            <input 
                                type="file" 
                                className="opacity-0 rounded-full" 
                                onChange={(e)=>{changeImage(e)}}
                            />
                            <div 
                                className="edit-img" 
                                ref={editImgIcon}
                            >
                                <MdEdit />
                                </div>
                        </div>
                        <span className="text-red-500 text-sm block" ref={imgError}></span>

                        <div className="flex flex-col gap-2 w-1/2">
                            <label htmlFor="dob" className="font-semibold">Date of Birth</label>
                            <input 
                                type="date" 
                                className="dob h-14"
                                value={dob}
                                onChange={(e) => {setDob(e.target.value)}}
                            />
                            <span className="text-red-500 text-sm block" ref={dobError}></span>
                        </div>
                        
                        <button className="mt-6" onClick={handleSubmit}>SUBMIT</button>
                        <ToastContainer/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SetProfile;