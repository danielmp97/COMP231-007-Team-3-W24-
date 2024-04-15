import React, { useState, useEffect } from "react";
import "./Users.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

function ViewUser() {
  const [users, SetUsers] = useState([]);
  const [renderApp, setRenderApp] = useState(false);
  const [staff, setStaff] = useState();
  const [patient, setPatient] = useState();
  const [doctor, setdoctor] = useState();
  const [userType, setUserType] = useState("Patient");
  const [isStaff,setIsStaff]=useState(false);
  const [role,setRole]=useState();
  const URL = "http://localhost:8000/";

  useEffect(() => {
    const cookies = new Cookies(null, { path: "/" });
    const token = cookies.get("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.role === "IT staff" || decoded.role === "front desk") {
        setIsStaff(true);
        setRole(decoded.role);
      }
    }

    getAllUserData();


  }, []);

  const getAllUserData = async () => {
    try {
      const data = await Promise.all([
        axios.get("http://localhost:8000/doctors"),
        axios.get("http://localhost:8000/patients"),
        axios.get("http://localhost:8000/staff"),
      ]);

      const doctorData = await data[0].data;
      const patientData = await data[1].data;
      const staffData = await data[2].data;

      setStaff(staffData);
      setdoctor(doctorData);
      setPatient(patientData);
      setRenderApp(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const redirectToPatientInfo = (userId) => {
    const url = `/view-patient-info?userId=${userId}`;
    window.location.href = url;
  };

  const redirectToDoctorInfo = (userId) => {
    const url = `/view-doctor?userId=${userId}`;
    window.location.href = url;
  }; 

  const redirectToStaffInfo = (userId) => {
    if(role==="IT staff"){
      const url = `/view-staff?userId=${userId}`;
      window.location.href = url;  
    } 
    else if(role==="front desk"){
      Swal.fire({
        icon: "error",
        title: "Permission Denied",
        text: "You don't have permission to view staff details",
      });
    };
  };

  return (
    <>
      {renderApp && (
        <div>
          {
            isStaff ?(
              <div className="table-container">
            <div className="tabContainer">
              <button
                className={
                  userType === "Patient" ? "tabButton active" : "tabButton"
                }
                onClick={(e) => setUserType("Patient")}
              >
                Patient
              </button>
              <button
                className={
                  userType === "Doctor" ? "tabButton active" : "tabButton"
                }
                onClick={(e) => setUserType("Doctor")}
              >
                Doctor
              </button>
              <button
                className={
                  userType === "Staff" ? "tabButton active" : "tabButton"
                }
                onClick={(e) => setUserType("Staff")}
              >
                Staff
              </button>
            </div>
            <h1 className="user-type-count">
              {userType} (
              {userType === "Doctor"
                ? doctor.length
                : userType === "Patient"
                ? patient.length
                : staff.length}
              )
            </h1>
            <table>
              <thead>
                {userType === "Patient" && (
                  <tr>
                    <th>Name</th>

                    <th>Email</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Notes</th>
                    <th>Actions</th>
                  </tr>
                )}

                {userType === "Doctor" && (
                  <tr>
                    <th>Name</th>

                    <th>Email</th>
                    <th>Phone</th>

                    <th>Speciality</th>
                    <th>Actions</th>
                  </tr>
                )}

                {userType === "Staff" && (
                  <tr>
                    <th>Name</th>

                    <th>Email</th>
                    

                    <th>Role</th>

                    <th>Actions</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {userType === "Patient" &&
                  patient.map((data, index) => (
                    <tr key={index}>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.phone}</td>
                      <td>{data.gender}</td>
                      <td>{data.age}</td>
                      <td>{data.notes}</td>
                      <td>
                        <button onClick={() => redirectToPatientInfo(data._id)} className="view-details-button">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}

                {userType === "Doctor" &&
                  doctor.map((data, index) => (
                    <tr key={index}>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.phone}</td>
                      <td>{data.specialty}</td>
                      <td>
                        <button className="view-details-button" onClick={() => redirectToDoctorInfo(data._id)}>
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                }

                {userType === "Staff" &&
                  staff.map((data, index) => (
                    <tr key={index}>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.role}</td>
                      <td>
                        <button className="view-details-button" onClick={() => redirectToStaffInfo(data._id)}>
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                }


              </tbody>
            </table>
          </div>
            ):(
              <div className="container heading">Permission Not granted</div>
            )
          }
        </div>
      )}
    </>
  );
}

export default ViewUser;