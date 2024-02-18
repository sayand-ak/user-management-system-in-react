import { IoLogOutOutline } from "react-icons/io5";
import "./Home.css";
import { useRef, useState } from "react";

const Home = () => {
    const [isEditMode, setIsEditMode] = useState(false);

    const fileInpDivRef = useRef();

    const enableEdit = () => {
        setIsEditMode(true);
    };

    const editSubmit = () => {
        setIsEditMode(false);
    };

    const changeProfile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                fileInpDivRef.current.style.backgroundImage = `url('${reader.result}')`;
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="home-container">
            <nav>
                <h1 className="text-xl font-semibold">Home</h1>
                <button>
                    <IoLogOutOutline className="text-2xl font-semibold" />
                </button>
            </nav>

            <section className="flex justify-center">
                <div className="main py-10 flex flex-col gap-5 items-center relative">
                    <button
                        className="editBtn absolute top-10 right-10"
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
                    >
                        <input 
                            type="file" 
                            className="opacity-0 rounded-full" 
                            disabled={!isEditMode} 
                            onChange={(e) => { changeProfile(e) }} 
                        />
                    </div>

                    <div className="username text-center flex flex-col">
                        <input
                            type="text"
                            placeholder={"USERNAME"}
                            disabled={!isEditMode}
                            className={`text-center font-semibold text-2xl py-1 placeholder:text-black ${isEditMode ? 'bg-white' : 'bg-transparent'}`}
                        />
                        <span className="text-lg">( abc@gmail.com )</span>
                    </div>

                    <div className="user-datas text-lg font-medium flex flex-col gap-4 pl-10">
                        <span className="flex justify-between gap-7">
                            <span>Registered at</span>
                            <input
                                type="text"
                                placeholder={"19/12/2023"}
                                disabled
                            />
                        </span>
                        <span className="flex justify-between gap-5">
                            <span>Date of Birth</span>
                            <input
                                type="text"
                                placeholder={"10/02/2003"}
                                disabled={!isEditMode}
                                className={` ${isEditMode ? 'bg-white' : 'bg-transparent'}`}
                            />
                        </span>
                        <span className="flex justify-between gap-5">
                            <span>Phone Number</span>
                            <input
                                type="text"
                                placeholder={"9078564589"}
                                disabled={!isEditMode}
                                className={` ${isEditMode ? 'bg-white' : 'bg-transparent'}`}
                            />
                        </span>
                    </div>
                    <button className="submit-btn" onClick={editSubmit} style={{ display: isEditMode ? 'block' : 'none' }}>
                        SUBMIT
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Home;
