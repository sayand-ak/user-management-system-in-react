import { MdEdit } from "react-icons/md";
import "./Signup.css";
import { useRef } from "react";

const SetProfile = () => {
    const [editImgIcon, profileImageRef] = [useRef(), useRef()];

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
    };
      

    return(
        <div className="signup">
            <div className="signup-container">
                <div className="setProfile-image flex-1 flex justify-center pt-20">
                    <h1>Tell us more about you!</h1>
                </div>

                <div className="setProfile-form flex-1">
                    <div className="flex flex-col pl-10 pt-16 gap-14 items-center relative">

                        <a className=" back-link">{'<<< '}back</a>
                        <a className=" skip-link">skip {'>>>'}</a>

                        <div className="profile-image-div relative flex p-0" ref={profileImageRef}>
                            <input type="file" className="opacity-0 rounded-full" onChange={(e)=>{changeImage(e)}}/>
                            <div className="edit-img" ref={editImgIcon}>
                                <MdEdit />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 w-1/2">
                            <label htmlFor="dob" className="font-semibold">Date of Birth</label>
                            <input type="date" name="" id="" className="dob h-14"/>
                        </div>
                        
                        <button>SUBMIT</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SetProfile;