import { useEffect, useState } from "react";
import "./Home.css";
import Options from "./Options";
import { getUserData } from "../../../slices/adminAuthAction";
import { useDispatch } from "react-redux";
import { format } from 'date-fns';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';



const UserTable = ({ searchedData }) => {
    const [ selectAllChecked, setSelectAllChecked ] = useState(false);
    const [userData, setUserData] = useState([]);
    const dispatch = useDispatch();


      useEffect(()=>{
        const fetchUserData = async() => {
            const response = await dispatch(getUserData());
            const userDataWithId = response.payload.map(item => ({
                ...item,
                nano_id: nanoid()
              }));
              setUserData(userDataWithId);
        }
        fetchUserData()
    },[dispatch]);

      const changeAllCheckbox = () => {
        setSelectAllChecked(!selectAllChecked);
      }
      
      const dataToRender = searchedData.length > 0 ? searchedData : userData;

    return(
        <table className="w-3/4 mb-10">
            <thead>
                <tr className="h-14">
                    <td className="text-center">
                        <input 
                            type="checkbox" 
                            checked={selectAllChecked} 
                            onChange={changeAllCheckbox}
                        />

                    </td>
                    <td className="pl-5">Name</td>
                    <td>Date added</td>
                    <td>Date of birth</td>
                    <td>More</td>
                </tr>
            </thead>
            <tbody>
                {dataToRender.map((item) => (
                    <tr key={item.nano_id}>
                        <td className="text-center px-3">
                            <input 
                                type="checkbox" 
                                checked={selectAllChecked}
                            />
                            
                        </td>
                        <td className="w-80 flex gap-4 items-center py-4">
                            <div 
                                className="h-14 w-14 rounded-full bg-cover bg-center bg-no-repeat"
                                style={{backgroundImage: item.profile_image? `url(http://localhost:2000/uploads/${item.profile_image})` : "url(/src/assets/profile_10302971.png)"}}
                            >

                            </div>
                            <span>
                                <h1 className="font-semibold">{item.fname+" "+item.lname}</h1>
                                <h1>({item.email})</h1>
                            </span>
                        </td>
                        <td>{format(item?.createdAt, 'dd-MM-yyyy')}</td>
                        <td>{format(item.dob, 'dd-MM-yyyy')}</td>
                        <td className="relative">
                            <Options userData={item}/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        )
}

UserTable.propTypes = {
    searchedData: PropTypes.arrayOf(PropTypes.shape({
        nano_id: PropTypes.string.isRequired,
        profile_image: PropTypes.string,
        fname: PropTypes.string.isRequired,
        lname: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        dob: PropTypes.string.isRequired,
    })),
};

export default UserTable;