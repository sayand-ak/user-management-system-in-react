import { useState } from "react";
import "./Home.css";
import Options from "./Options";

const UserTable = () => {
    const [ selectAllChecked, setSelectAllChecked ] = useState(false);
    const data = [
        { name: 'Sayand', startDate: '10/12/2003', endDate: '11/12/2003' },
        { name: 'John', startDate: '05/21/2002', endDate: '06/21/2002' },
        { name: 'Alice', startDate: '08/15/1995', endDate: '09/15/1995' },
        { name: 'Bob', startDate: '03/08/2008', endDate: '04/08/2008' },
        { name: 'Eva', startDate: '12/01/2014', endDate: '01/01/2015' },
      ];

      const changeAllCheckbox = () => {
        setSelectAllChecked(!selectAllChecked);
      }


    return(
        <table className="w-3/4">
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
                {data.map((item, index) => (
                    <tr key={index}>
                        <td className="text-center px-3">
                            <input 
                                type="checkbox" 
                                checked={selectAllChecked}
                            />
                            
                        </td>
                        <td className="w-80 flex gap-4 items-center py-4">
                            <div className="h-14 w-14 rounded-full bg-amber-500">

                            </div>
                            <span>
                                <h1 className="font-semibold">{item.name}</h1>
                                <h1>(abc@gmail.com)</h1>
                            </span>
                        </td>
                        <td>{item.startDate}</td>
                        <td>{item.endDate}</td>
                        <td className="relative">
                            <Options/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        )
}

export default UserTable;