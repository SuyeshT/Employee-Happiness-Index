import React, { useState, useEffect } from 'react';
import { useDataProvider, Loading, Error } from 'react-admin';
var EMPID=localStorage.getItem('emp_id');
const Empinfo = ({ userId }) => {
    const dataProvider = useDataProvider();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        dataProvider.getOne('users', { id: EMPID })
            .then(({ data }) => {
                setUser(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, []);
    
    if (loading) return <Loading />;
    if (error) return <Error />;
    if (!user) return null;
    function datesFunction(d){
      var date = new Date(d)
      var dd = date.getDate(); 
      var mm = date.getMonth()+1;
      var yyyy = date.getFullYear(); 
      if(dd<10){dd='0'+dd};
      if(mm<10){mm='0'+mm};
      return d = dd+'/'+mm+'/'+yyyy
  }
   
    return (
        <div id="Profile_container">
        <ul id="Profile_container2">
            <li className="Profile_detail">Fullname: {user.fullName}</li>
            <li className="Profile_detail">UserName: {user.username}</li>
            <li className="Profile_detail">Email: {user.email}</li>
            <li className="Profile_detail">Designation: {user.empdesignation.designation}</li>
            <li className="Profile_detail">DateOfBirth: {datesFunction(user.dateOfBirth)}</li>
            <li className="Profile_detail">JoiningDate:{datesFunction(user.joiningDate)}</li>
            {/* <li className="Profile_detail">profilepic:{user.profilepic}</li> */}
        </ul>
        </div>
    )
};
export default Empinfo;
