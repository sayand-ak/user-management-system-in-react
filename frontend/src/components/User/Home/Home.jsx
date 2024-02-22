import "./Home.css";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';


const Home = () => {
    const userData = useSelector(state => state.auth.userInfo.userData);
    const navigate = useNavigate();

    return (
        <div className="home">
            <nav>
                <h1>HOME</h1>
                <div 
                    className="nav-view-user-profile cursor-pointer" 
                    style={{ backgroundImage: userData?.profile_image ? `url(http://localhost:2000/uploads/${userData.profile_image})` : '/src/assets/profile_10302971.png' }}
                    onClick={() => {navigate("/user/profile")}}
                    data-tooltip-id="my-tooltip" 
                    data-tooltip-content="profile"
                >
                </div>
                <Tooltip id="my-tooltip" />
            </nav>
            <div className="home-banner">
                <div className="home-banner-description">
                    <h1 className="welcome">
                        Hello, <span className="text-4xl font-semibold">{userData.fname+" "+userData.lname}</span>
                    </h1>
                    <p className="px-20">
                        Understanding your users is the key to success. Empathy and responsiveness build a bridge between their needs and your solutions.                    
                    </p>
                    <h1 className="text-right px-32">-Steve Jobs</h1>
                </div>

                <div className="home-banner-image">
                    
                </div>
            </div>
        </div>
    )
}

export default Home;