import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import CustomModal from "../Modal/Modal";
import { SlOptionsVertical } from "react-icons/sl";
import { IoCloseCircleOutline } from "react-icons/io5";
import "./Home.css";
import { useRef, useState } from "react";

const Options = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ show, setShow ] = useState(false);
    const optionsRef = useRef();


    const showOptions = () => {
        if(show == false){
            optionsRef.current.style.display = "block";
            setShow(true);
        }else{
            optionsRef.current.style.display = "none";
            setShow(false);
        }
    }
    return(
        <>
            <button onMouseOver={showOptions} className="option-btn">
                <SlOptionsVertical />
            </button>
            <div className="options" ref={optionsRef} onMouseLeave={showOptions}>
                <ul>
                    <li className="flex items-center gap-2 pb-3 px-3 py-2">
                        <MdEdit />
                        <a onClick={() => {setIsModalOpen(true)}}>Edit</a>
                    </li>
                    <li className="flex items-center gap-3 pb-3 px-3">
                        <MdDelete />
                        <a>Delete</a>
                    </li>
                </ul>
            </div>
            <CustomModal isOpen={isModalOpen} onRequestClose={() => {setIsModalOpen(false)}}>
                <IoCloseCircleOutline className="modal-close" onClick={() => {setIsModalOpen(false)}}/>

                <h1 className="text-4xl text-center font-semibold mt-10">EDIT USER</h1>

                <div className="admin-add-user flex justify-center items-center">

                    <div className="change-img flex-1 flex justify-center">
                        <div className="flex relative h-80 w-80 bg-blue-700 rounded-full">
                            <input type="file" className="rounded-full opacity-0" />
                            <div className="absolute h-16 w-16 bg-orange-600 rounded-full bottom-1 right-10 flex justify-center items-center">
                                <MdEdit className="text-2xl"/>
                            </div>
                        </div>
                    </div>


                    <div className="change-data flex-1">
                        <form action="#">
                            <ul className="flex flex-col gap-5">

                                <li className="flex flex-col w-3/4">
                                    <label htmlFor="fname">Firstname</label>
                                    <input type="text" />
                                </li>
                                <li className="flex flex-col w-3/4">
                                    <label htmlFor="lname">Lastname</label>
                                    <input type="text" />
                                </li>
                                <li className="flex flex-col w-3/4">
                                    <label htmlFor="fname">Date of Birth</label>
                                    <input type="date" />
                                </li>
                                <li className="flex flex-col w-3/4">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input type="text" />
                                </li>
                                <li>
                                    <button>EDIT</button>
                                </li>

                            </ul>
                        </form>
                    </div>

                </div>
            </CustomModal>
        </>

    )
}
export default Options;