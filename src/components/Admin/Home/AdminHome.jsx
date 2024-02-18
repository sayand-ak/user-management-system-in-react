import UserTable from "./UserTable";
import { FaSearch } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import CustomModal from "../Modal/Modal";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";




import "./Home.css";
import { useState } from "react";

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return(
    <>
        <div className="admin-home">
            <nav>
                <h1 className="text-xl font-semibold">Home</h1>
                <div className="flex w-96 justify-around items-center">
                    <div className="search-continer flex rounded-lg overflow-hidden">
                        <input type="text" className="h-10 pl-5 bg-gray-200" placeholder="Search here" />
                        <button className="px-5 bg-gray-200">
                            <FaSearch className="text-black " />
                        </button>
                    </div>
                    <button className="text-2xl">
                        <MdLogout />
                    </button>
                </div>
            </nav>

            <button className="add-user-btn" onClick={() => {setIsModalOpen(true)}}>+ Add new user</button>

            <section className="flex justify-center pt-28">
                <UserTable />
            </section>
        </div>
        <CustomModal isOpen={isModalOpen} onRequestClose={() => { setIsModalOpen(false); } }>
            <IoCloseCircleOutline className="modal-close" onClick={() => { setIsModalOpen(false); } } />

            <h1 className="text-4xl text-center font-semibold mt-10">ADD NEW USER</h1>

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
                                <button>ADD</button>
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