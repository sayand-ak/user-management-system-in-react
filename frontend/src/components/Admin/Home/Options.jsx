import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import CustomModal from "../Modal/Modal";
import { SlOptionsVertical } from "react-icons/sl";
import { IoCloseCircleOutline } from "react-icons/io5";
import "./Home.css";
import { useRef, useState } from "react";
import PropTypes from 'prop-types';
import { ToastContainer } from "react-toastify";
import showToast from "../../Toast/Toast";
import { deleteUser, updateUserData } from "../../../slices/adminAuthAction";
import { useDispatch } from "react-redux";
import { nameValidate, validatePhoneNumber, isEmailValid, isPhoneValid } from "../../../utilities/validationUtils";
import Swal from 'sweetalert2'


const Options = ({ userData }) => {
    const [fname, setFname] = useState(userData.fname);
    const [lname, setLname] = useState(userData.lname);
    const [email, setEmail] = useState(userData.email);
    const [dob, setDob] = useState(userData.dob);
    const [phone, setPhone] = useState(userData.phone);
    const [img, setImg] = useState(userData.profile_image);

    const [ buttonActive, setButtonActive ] = useState(true)


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ show, setShow ] = useState(false);
    const optionsRef = useRef();
    const fileInpDivRef = useRef();

    const [fnameError, lnameError, dobError, phoneError, emailError ] = [ useRef(), useRef(), useRef(), useRef(), useRef()];

    const dispatch = useDispatch();

    const showOptions = () => {
        if(show == false){
            optionsRef.current.style.display = "block";
            setShow(true);
        }else{
            optionsRef.current.style.display = "none";
            setShow(false);
        }
    }

    const changeProfile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                fileInpDivRef.current.style.backgroundImage = `url('${reader.result}')`;
            };
            reader.readAsDataURL(file);
        }
        setImg(file);
    };
    const handleEditUser = async() => {
        if(
            nameValidate(fname, setFname, fnameError) && 
            nameValidate(lname, setLname, lnameError) &&
            isEmailValid(email, setEmail, emailError) && 
            isPhoneValid(phone, phoneError)
        ){
            const formData = new FormData();
            formData.append("userId", userData._id);
            formData.append('fname', fname);
            formData.append('lname', lname);
            formData.append('email', email);
            formData.append('dob', dob);
            formData.append('phone', phone);
            formData.append('profileImage', img);

            const response = await dispatch(updateUserData(formData));
            console.log(response);
            if(response.payload){
                showToast("success", "User updated successfully..",() => { 
                    window.location.reload()
                 });
                 setButtonActive(true)
            }else{
                showToast("error", "server Error Try again later!");
            }
        }else{
            showToast("error", "Invalid entries")
        }
    }

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "User will be deleted permenently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await dispatch(deleteUser(userData._id))
                if(response.payload){
                    Swal.fire({
                        title: "Deleted!",
                        text: "User has been deleted.",
                        icon: "success"
                    });
                    window.location.reload();
                }else{
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong! Try again later..",
                      });
                }
            }
          });
    }


    return(
        <>
            <button 
                onMouseOver={showOptions} 
                className="option-btn"
            >
                <SlOptionsVertical />
            </button>

            <div 
                className="options" 
                ref={optionsRef} 
                onMouseLeave={showOptions}
            >
                <ul>
                    <li className="flex items-center gap-2 pb-3 px-3 py-2">
                        <MdEdit />
                        <a 
                            onClick={() => {setIsModalOpen(true)}}
                        >
                            Edit
                        </a>
                    </li>
                    <li className="flex items-center gap-3 pb-3 px-3">
                        <MdDelete />
                        <a onClick={handleDelete}>Delete</a>
                    </li>
                </ul>
            </div>
            <CustomModal 
                isOpen={isModalOpen} 
                onRequestClose={() => {setIsModalOpen(false)}}
            >
                <IoCloseCircleOutline 
                    className="modal-close" 
                    onClick={() => {setIsModalOpen(false)}}
                />

                <h1 className="text-4xl text-center font-semibold mt-10">EDIT USER</h1>

                <div className="admin-add-user flex justify-center items-center">

                    <div className="change-img flex-1 flex justify-center">
                        <div className="flex relative h-80 w-80 rounded-full bg-cover" 
                        style={{backgroundImage: userData.profile_image? `url(http://localhost:2000/uploads/${userData.profile_image})`:"url(/src/assets/profile_10302971.png)"}}
                            ref={fileInpDivRef}
                        >
                            <input 
                                type="file" 
                                className="rounded-full opacity-0" 
                                onChange={(e) => {
                                    setButtonActive(false)
                                    changeProfile(e)
                                }}
                            />
                            <div className="absolute h-16 w-16 bg-orange-600 rounded-full bottom-1 right-10 flex justify-center items-center">
                                <MdEdit className="text-2xl"/>
                            </div>
                        </div>
                    </div>


                    <div className="change-data flex-1">
                    <form action="#">
                        <ul className="flex flex-col gap-10 mt-28">

                            <li className="flex gap-2 w-3/4">
                                <div>
                                    <label htmlFor="fname">Firstname
                                        <span className="text-red-600 text-sm">*</span>
                                    </label>
                                    <input 
                                        type="text"
                                        value={fname}
                                        onChange={(e) => {
                                            setButtonActive(false)
                                            nameValidate(e.target.value, setFname, fnameError)
                                        }}
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
                                        onChange={(e) => {
                                            setButtonActive(false)
                                            nameValidate(e.target.value, setLname, lnameError)
                                        }}
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
                                    onChange={(e) => {
                                        setButtonActive(false)
                                        isEmailValid(e.target.value, setEmail, emailError)
                                    }}
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
                                    onChange={(e) => {
                                        setButtonActive(false)
                                        setDob(e.target.value)
                                    }}
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
                                    onChange={(e) =>{
                                        setButtonActive(false)
                                        validatePhoneNumber(e.target.value, setPhone, phoneError)
                                    }}
                                />
                                <span 
                                    className="text-sm text-red-500 hidden"
                                    ref={phoneError}
                                >error</span>
                            </li>
                            <li>
                                <button
                                    onClick={handleEditUser}
                                    disabled = {buttonActive}
                                >EDIT</button>
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

Options.propTypes = {
    userData: PropTypes.object.isRequired
}

export default Options;