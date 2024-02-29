import { IoLogOutOutline } from "react-icons/io5";
import "./Profile.css";
import { useEffect, useRef, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { format } from 'date-fns';
import { logoutAsync } from "../../../slices/userAuthAction";
import { useNavigate } from "react-router-dom";
import { setCredentials, logout } from "../../../slices/authSlice";
import { updateUerProfileAsync } from "../../../slices/userAuthAction";
import { validateName, validateDOB, validatePhoneNumber } from "../../../utilities/validationUtils";
import showToast from '../../Toast/Toast';
import { ToastContainer } from "react-toastify";
import { Tooltip } from 'react-tooltip'


const Profile = () => {
    const [isEditMode, setIsEditMode] = useState(false);

    const userInfo = useSelector(state => state.auth.userInfo.userData);

    const [name, setName] = useState(
        userInfo ? `${userInfo.fname?.toUpperCase()} ${userInfo.lname?.toUpperCase()}` : ""
    );
      
    const [dob, setDob] = useState(
        userInfo?.dob ? format(userInfo.dob, 'dd-MM-yyyy') : "nill"
    );
    
    const [phone, setPhone] = useState(userInfo?.phone || "");

    const [img, setImg] = useState(null);
      

    const fileInpDivRef = useRef();
    const fileRef = useRef();
    const nameError = useRef();
    const dobError = useRef();
    const phoneError = useRef();
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setName(userInfo ? `${userInfo.fname?.toUpperCase()} ${userInfo.lname?.toUpperCase()}` : 'nill');
        setDob(userInfo?.dob ? format(userInfo.dob, 'dd-MM-yyyy') : 'nill');
        setPhone(userInfo?.phone || '');
        console.log(userInfo);
    }, [userInfo]);

    const enableEdit = () => {
        setIsEditMode(true);
    };

    const editSubmit = async() => {
        setIsEditMode(false);
        if(validateName(name, setName, nameError) && validateDOB(dob, setDob, dobError) && validatePhoneNumber(phone, setPhone, phoneError)){
            const formData = new FormData();
            formData.append("userId", userInfo._id);
            formData.append("name", name);
            formData.append("dob", dob);
            formData.append("phone", phone);
            formData.append("profileImage", img);
            const response = await dispatch(updateUerProfileAsync(formData));
            if(response.payload){
                dispatch(setCredentials(response.payload));
                showToast("success", "Profile updated successfully..")
            }else{
                showToast("error", "Something went wrong!")
            }
        }else{
            setIsEditMode(true);
            showToast("error", "Invalid entry! please check you entries..");
        }
    };

    const changeProfile = (e) => {
        const file = e.target.files[0];
        setImg(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                fileInpDivRef.current.style.backgroundImage = `url('${reader.result}')`;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogout = async() => {
        const response = await dispatch(logoutAsync());
        if(response){
            dispatch(logout())
            navigate("/user/login");
        }
    }
    
    
    return (
        <div className="profile-container">
            <nav>
                <h1 className="text-xl font-semibold">PROFILE</h1>
                <button >
                    <IoLogOutOutline 
                        className="text-2xl font-semibold" 
                        onClick={handleLogout} 
                        data-tooltip-id="my-tooltip" 
                        data-tooltip-content="logout"
                    />
                </button>
                <Tooltip id="my-tooltip" />
            </nav>

            <section className="flex justify-center">
                <div className="main py-10 flex flex-col gap-5 items-center relative">
                    <button
                        className="top-3 right-3 editBtn absolute xl:top-10 xl:right-10"
                        onClick={enableEdit}
                        style={{ display: !isEditMode ? 'flex' : 'none' }}
                    >
                        <svg height="1em" viewBox="0 0 512 512">
                            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                        </svg>
                    </button>

                    <div 
                        className="image-div relative flex " 
                        ref={fileInpDivRef}
                        style={{ backgroundImage: userInfo?.profile_image ? `url(http://localhost:2000/uploads/${userInfo.profile_image})` : 'none' }}
                    >
                        <input 
                            type="file" 
                            className="opacity-0 rounded-full" 
                            disabled={!isEditMode} 
                            onChange={(e) => { changeProfile(e) }} 
                            ref={fileRef}
                        />
                        <div className="bg-violet-600 absolute p-5 rounded-full bottom-3 right-3" style={{ display: isEditMode ? 'block' : 'none' }} onClick={()=>{fileRef.current.click()}}>
                            <svg height="1em" viewBox="0 0 512 512">
                                <path fill="white" d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                            </svg>
                        </div>
                    </div>

                    <div className="username text-center flex flex-col">
                        <input
                            type="text"
                            value={name.toUpperCase()}
                            disabled={!isEditMode}
                            className={`text-center font-semibold text-2xl py-1 text-black ${isEditMode ? 'bg-white' : 'bg-transparent'}`}
                            onChange={(e)=>{validateName(e.target.value, setName, nameError)}}
                        />
                        <span className="text-lg">( {userInfo?.email} )</span>
                        <span className="text-red-600 text-sm hidden" ref={nameError}></span>
                    </div>

                    <div className="user-datas text-lg font-medium flex flex-col gap-4 pl-10">
                        <span className="flex justify-between gap-7">
                            <span>Registered at</span>
                            <input
                                type="text"
                                placeholder={userInfo?.createdAt? format(userInfo?.createdAt, 'dd-MM-yyyy'):"nill"}
                                disabled
                            />
                        </span>
                        <div>
                            <span className="flex justify-between gap-5">
                                <span>Date of Birth</span>
                                <input
                                    type="text"
                                    value={dob}
                                    disabled={!isEditMode}
                                    className={` ${isEditMode ? 'bg-white' : 'bg-transparent'}`}
                                    onChange={(e) => {validateDOB(e.target.value, setDob, dobError)}}
                                />
                            </span>
                            <span className="text-red-600 text-xs hidden" ref={dobError}></span>
                        </div>
                        <div>
                            <span className="flex justify-between gap-5">
                                <span>Phone Number</span>
                                <input
                                    type="text"
                                    value={phone}
                                    disabled={!isEditMode}
                                    className={` ${isEditMode ? 'bg-white' : 'bg-transparent'}`}
                                    onChange={(e) => {validatePhoneNumber(e.target.value, setPhone, phoneError)}}
                                    />
                            </span>
                            <span className="text-red-600 text-xs hidden" ref={phoneError}></span>
                        </div>
                    </div>
                    <button className="submit-btn" onClick={editSubmit} style={{ display: isEditMode ? 'block' : 'none' }}>
                        SUBMIT
                    </button>
                    <ToastContainer/>
                </div>
            </section>
        </div>
    );
};

export default Profile;
