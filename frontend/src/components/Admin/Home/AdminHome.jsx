import UserTable from "./UserTable";
import { FaSearch } from "react-icons/fa";
import CustomModal from "../Modal/Modal";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { addUser } from "../../../slices/adminAuthAction";
import { useDispatch } from "react-redux";
import showToast from '../../Toast/Toast';
import { ToastContainer } from 'react-toastify';
import { nameValidate, validatePhoneNumber, isPasswordValid, isEmailValid, isPhoneValid } from "../../../utilities/validationUtils";


import "./Home.css";
import { useRef, useState } from "react";

const Home = () => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState(null);
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [img, setImg] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isprofileOpen,  setIsProfileOpen] = useState(false);

    const fileInpDivRef = useRef();
    const [fnameError, lnameError, dobError, phoneError, passwordError, emailError ] = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

    const adminInfo = useSelector(state => state.admin.adminInfo.adminData);

    const dispatch = useDispatch();



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

    const toggleProfile = () => {
        setIsProfileOpen(!isprofileOpen);
    };

    const handleAddUser = async() => {
        if(
            nameValidate(fname, setFname, fnameError) && 
            nameValidate(lname, setLname, lnameError) &&
            isEmailValid(email, setEmail, emailError) && 
            isPhoneValid(phone, phoneError) && 
            isPasswordValid(password, setPassword, passwordError) 
        ){
            const formData = new FormData();
            formData.append('fname', fname);
            formData.append('lname', lname);
            formData.append('email', email);
            formData.append('dob', dob);
            formData.append('phone', phone);
            formData.append('password', password);
            formData.append('profileImage', img);
            
            const response = await dispatch(addUser(formData));
            console.log(response);
            if(response.payload){
                showToast("success", "User added successfully..",() => { 
                    window.location.reload()
                 });
            }else{
                showToast("error", "server Error Try again later!");
            }
        }else{
            showToast("error", "Invalid entries")
        }
    }

    return(
    <>
        <div className="admin-home">
            <nav>
                <h1 className="text-xl font-semibold">Home</h1>
                <div className="flex w-96 justify-around items-center">
                    <div className="search-continer flex rounded-lg overflow-hidden">

                        <input 
                            type="text" 
                            className="h-10 pl-5 bg-gray-200 outline-none" 
                            placeholder="Search by name" 
                        />

                        <button className="px-5 bg-gray-200">
                            <FaSearch className="text-black " />
                        </button>
                    </div>

                    <div className="admin-profile cursor-pointer" onClick={toggleProfile}>
                        <div className={`absolute top-20 ${isprofileOpen ? 'open' : 'closed'}`}>
                            <ul className="flex flex-col gap-4">
                                <li className="flex gap-2 items-center">
                                    <FaRegUser />
                                    {adminInfo.username}
                                </li>
                                <li className="flex gap-2 items-center text-red-700">
                                    <MdLogout />
                                    logout
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <button 
                className="add-user-btn" 
                onClick={() => {setIsModalOpen(true)}}
            >
                + Add new user
            </button>

            <section className="flex justify-center pt-28">
                <UserTable />
            </section>
        </div>
        
        <CustomModal 
            isOpen={isModalOpen} 
            onRequestClose={() => { setIsModalOpen(false); } }
        >
            <IoCloseCircleOutline 
                className="modal-close" 
                onClick={() => { setIsModalOpen(false); } } 
            />

            <h1 className="text-4xl text-center font-semibold mt-10">ADD NEW USER</h1>

            <div className="admin-add-user flex justify-center items-center">

                <div className="change-img flex-1 flex flex-col items-center">
                    <div 
                        className="flex relative h-80 w-80 rounded-full bg-cover" 
                        style={{backgroundImage:"url(/src/assets/profile_10302971.png)"}}
                        ref={fileInpDivRef}
                    >
                        
                        <input 
                            type="file" 
                            className="rounded-full opacity-0" 
                            onChange={(e) => {changeProfile(e)}}
                        />

                        <div className="absolute h-16 w-16 bg-orange-600 rounded-full bottom-1 right-10 flex justify-center items-center">
                            <MdEdit className="text-2xl"/>
                        </div>
                    </div>
                </div>


                <div className="change-data flex-1 mt-32">
                    <form action="#">
                        <ul className="flex flex-col gap-6">

                            <li className="flex gap-4 w-3/4">
                                <div>
                                    <label htmlFor="fname">Firstname
                                        <span className="text-red-600 text-sm">*</span>
                                    </label>
                                    <input 
                                        type="text"
                                        value={fname}
                                        onChange={(e) => {nameValidate(e.target.value, setFname, fnameError)}}
                                    />

                                    <span 
                                        className="text-sm text-red-500 hidden"
                                        ref={fnameError}
                                    >error</span>
                                </div>

                                <div>
                                    <label htmlFor="lname">Lastname
                                        <span className="text-red-600 text-sm">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        value={lname}
                                        onChange={(e) => {nameValidate(e.target.value, setLname, lnameError)}}
                                    />
                                    <span 
                                        className="text-sm text-red-500 hidden"
                                        ref={lnameError}
                                    >error</span>
                                </div>
                            </li>
                            <li className="flex flex-col w-3/4">
                                <label htmlFor="fname">Email
                                    <span className="text-red-600 text-sm">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    value={email}
                                    onChange={(e) => {isEmailValid(e.target.value, setEmail, emailError)}}
                                />
                                <span 
                                    className="text-sm text-red-500 hidden"
                                    ref={emailError}
                                >error</span>
                            </li>
                            <li className="flex flex-col w-3/4">
                                <label htmlFor="fname">Date of Birth</label>
                                <input 
                                    type="date" 
                                    value={dob}
                                    onChange={(e) => {setDob(e.target.value)}}
                                />
                                <span 
                                    className="text-sm text-red-500 hidden"
                                    ref={dobError}
                                >error</span>
                            </li>
                            <li className="flex flex-col w-3/4">
                                <label htmlFor="phone">Phone Number
                                    <span className="text-red-600 text-sm">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    value={phone}
                                    onChange={(e) =>{validatePhoneNumber(e.target.value, setPhone, phoneError)}}
                                />
                                <span 
                                    className="text-sm text-red-500 hidden"
                                    ref={phoneError}
                                >error</span>
                            </li>
                            <li className="flex flex-col w-3/4">
                                <label htmlFor="password">Password
                                    <span className="text-red-600 text-sm">*</span>
                                </label>
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) =>{isPasswordValid(e.target.value, setPassword, passwordError)}}
                                />
                                <span 
                                    className="text-sm text-red-500 hidden"
                                    ref={passwordError}
                                >error</span>
                            </li>
                            <li>
                                <button
                                    onClick={handleAddUser}
                                >ADD</button>
                                <ToastContainer/>
                            </li>

                        </ul>
                    </form>
                </div>

            </div>
            
        </CustomModal>
    </>
    )
}
export default Home;