import React, { useState,useEffect } from "react";
import "./CreateUsers.css";
import axios from "axios";
import {  useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2'




function Users() {
  const [userType, setUserType] = useState("patient");
  const [formData, setFormData] = useState();
  const [doctorData, setDoctorData] = useState();
  const redirect = useNavigate()

  const gender = [
    'male',"female"
  ]

  const roles = ["IT staff", "front desk"];

  const [staffData, setStaffData] = useState();
  const handleChangePatient = (e) => {
    const { name, value } = e.target;

    console.log({ name, value });

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangeStaff = (e) => {
    const { name, value } = e.target;

    console.log({ name, value });

    setStaffData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangeDoctor = (e) => {
    const { name, value } = e.target;

    console.log({ name, value });

    setDoctorData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault()
  


    e.preventDefault();
    try {
      console.log(formData)
      const response = await axios.post(
        "http://localhost:8000/patients",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        
        setFormData()
        
        Swal.fire({
          title: "Success",
          text:"User added successfully",
          icon:"success",
          confirmButtonText: "Okay",
         
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            redirect('/view-users')
          }
        });
      }
    } catch (err) {
     
      Swal.fire({
        title: 'Error!',
        text: 'Internal server error',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      console.log(err);
    }
  };

  const handleSubmitStaff = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/staff",
        staffData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        Swal.fire({
          title: "Success",
          text:"User added successfully",
          icon:"success",
          confirmButtonText: "Okay",
         
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            redirect('/view-users')
          }
        });

      }
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: 'Internal server error',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      console.log(err);
    }
  };

  const handleSubmitDoctor = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/doctors",
        doctorData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        Swal.fire({
          title: "Success",
          text:"User added successfully",
          icon:"success",
          confirmButtonText: "Okay",
         
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            redirect('/view-users')
          }
        });

      }
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: 'Internal server error',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      console.log(err);
    }
  };

  const location = useLocation();
  const [isStaff, setIsStaff] = useState(false);
  const [renderApp,setRenderApp]=useState(false)

 
  useEffect(() => {
    const cookies = new Cookies(null, { path: "/" });
    const token = cookies.get("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.role === "IT staff" || decoded.role === "front desk") {
        setIsStaff(true);
      }
    }
    setRenderApp(true)
    
  }, [location.pathname]);

  return (
   <>
  {isStaff ? (
     <div className="">
     <h2 className="header">Create Users</h2>

     <div className="tabContainer">
       <button
         className={userType === "patient" ? "tabButton active" : "tabButton"}
         onClick={(e) => setUserType("patient")}
       >
         Patient
       </button>
       <button
         className={userType === "doctor" ? "tabButton active" : "tabButton"}
         onClick={(e) => setUserType("doctor")}
       >
         Doctor
       </button>
       <button
         className={userType === "staff" ? "tabButton active" : "tabButton"}
         onClick={(e) => setUserType("staff")}
       >
         Staff
       </button>
     </div>

     <div className="create-user-container">
      
       {userType === "patient" && (
         <form onSubmit={handleSubmitUser}>
           <div className="form-group">
             <label className="form-label">Name:</label>

             <input
               type="text"
               name="name"
               placeholder="eg:- John"
               onChange={handleChangePatient}
               value={formData?.name}
             />
           </div>

           <div className="form-group">
             <label className="form-label">Email:</label>

             <input
               type="text"
               name="email"
               placeholder="eg:- example@gmail.com"
               onChange={handleChangePatient}
             />
           </div>

           <div className="form-group">
             <label className="form-label">Password:</label>

             <input
               type="password"
               name="password"
               onChange={handleChangePatient}
             />
           </div>

           <div className="form-group">
             <label className="form-label">Phone:</label>

             <input
               type="text"
               name="phone"
               placeholder="eg:- +1 333333333"
               onChange={handleChangePatient}
             />
           </div>

           <div className="form-group">
             <label className="form-label">Select Gender:</label>
             <select
               className="full-width"
               name="gender"
               onChange={handleChangePatient}
              
             >
               <option value="">Select gender</option>
               {gender.map((role, index) => (
                 <option key={index} value={role}>
                   {role}
                 </option>
               ))}
             </select>
           </div>

           <div className="form-group">
             <label className="form-label">Age:</label>

             <input
               type="number"
               name="age"
               placeholder="eg:- 44"
               onChange={handleChangePatient}
             />
           </div>

           <div className="form-group">
             <label className="form-label">Notes:</label>

             <textarea
               name="notes"
               placeholder="eg:- Hello there"
               onChange={handleChangePatient}
             />
           </div>

           <button type="submit" className="create-user-button">Create User</button>
         </form>
       )}

       {userType === "doctor" && (
         <form onSubmit={handleSubmitDoctor}>
           <div className="form-group">
             <label className="form-label">Name:</label>

             <input
               type="text"
               name="name"
               placeholder="eg:- John"
               onChange={handleChangeDoctor}
             />
           </div>

           <div className="form-group">
             <label className="form-label">Email:</label>

             <input
               type="text"
               name="email"
               placeholder="eg:- example@gmail.com"
               onChange={handleChangeDoctor}
             />
           </div>

           <div className="form-group">
             <label className="form-label">Password:</label>

             <input
               type="password"
               name="password"
               onChange={handleChangeDoctor}
             />
           </div>

           <div className="form-group">
             <label className="form-label">Phone:</label>

             <input
               type="text"
               name="phone"
               placeholder="eg:- +1 333333333"
               onChange={handleChangeDoctor}
             />
           </div>

           <div className="form-group">
             <label className="form-label">Speciality:</label>

             <input
               type="text"
               name="specialty"
               placeholder="eg:- Head"
               onChange={handleChangeDoctor}
             />
           </div>

           <button type="submit" className="create-user-button">Create User</button>
         </form>
       )}

       {userType === "staff" && (
         <form onSubmit={handleSubmitStaff}>
           <div className="form-group">
             <label className="form-label">Name:</label>

             <input
               type="text"
               name="name"
               placeholder="eg:- John Doe"
               onChange={handleChangeStaff}
             />
           </div>

           <div className="form-group">
             <label className="form-label">Email:</label>

             <input
               type="text"
               name="email"
               placeholder="eg:- example@gmail.com"
               onChange={handleChangeStaff}
             />
           </div>

           <div className="form-group">
             <label className="form-label">Password:</label>

             <input
               type="password"
               name="password"
               onChange={handleChangeStaff}
             />
           </div>

           <div className="form-group">
             <label className="form-label">Select Role:</label>
             <select
               className="full-width"
               name="role"
               onChange={handleChangeStaff}
              
             >
               <option value="">Select Role</option>
               {roles.map((role, index) => (
                 <option key={index} value={role}>
                   {role}
                 </option>
               ))}
             </select>
           </div>

           <button type="submit" className="create-user-button">Create User</button>
         </form>
       )}
     </div>

     {/* <form onSubmit={handleSubmit}>
       <div className="form-group">
         <label className="form-label">Name:</label>

         <input
           type="text"
           name="firstName"
           placeholder="eg:- John"
           onChange={handleChange}
         />
       </div>

       <div className="form-group">
         <label className="form-label">Last name:</label>

         <input
           type="text"
           name="lastName"
           placeholder="eg:- Doe"
           onChange={handleChange}
         />
       </div>

       <div className="form-group">
         <label className="form-label">Email:</label>

         <input
           type="email"
           name="email"
           placeholder="eg:- example@gmail.com"
           onChange={handleChange}
         />
       </div>

       <div className="form-group">
         <label className="form-label">Password:</label>

         <input
           type="password"
           name="password"

           onChange={handleChange}
         />
       </div>

       <div className="form-group">
         <label className="form-label">Address:</label>

         <input
           type="text"
           name="address"
           placeholder="eg:- Toronto"
           onChange={handleChange}
         />
       </div>
 
       <button type="submit">Create User</button>
     </form> */}
   </div>
  ):(
    <div className="container heading">Permission Not granted</div>

  )} 
   </>
  );
}

export default Users;