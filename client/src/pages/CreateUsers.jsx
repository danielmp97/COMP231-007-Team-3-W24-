import React, { useState } from "react";
import "./Users.css";
import axios from "axios";

function Users() {
  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    address:'',
    password:""

  });

 
  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log({name,value})

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Logic to handle form submission, including patient data
    console.log(formData);
    

    try{
       const response = await axios.post('http://localhost:8000/createUser',formData,{
        headers:{
            "Content-Type":"application/json"
        }
       })

       if(response.status === 201){
         alert("Users Added successfully")

       }
    }
    catch(err){
        alert('Internal Server error')
        console.log(err)
    }
  };

  return (
    <div className="container">
      <h2 className="header">Create Users</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">First name:</label>

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
      </form>
    </div>
  );
}

export default Users;
