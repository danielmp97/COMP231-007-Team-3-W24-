import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavigationBar.css";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

function NavigationBar() {
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
  // useEffect(() => {
  //   const cookies = new Cookies(null, { path: "/" });
  //   const token = cookies.get("token");
  //   const decoded = jwtDecode(token);

  //   if (decoded.role === "IT staff") {
  //     setIsStaff(true);
  //   }

  // }, []);

  return (
    <nav>
    {
      renderApp&&(
        <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/my-appointments">My Appointments</Link>
        </li>
        <li>
          <Link to="/create-appointment">New Appointment</Link>
        </li>
        <li>
          <Link to="/my-profile">My Profile</Link>
        </li>
        {isStaff && (
         <>
          <li>
            <Link to="viewUsers">Users</Link>
          </li>
          <li>
          <Link to="/createUser">Create user</Link>
        </li>
         </>
        )}
        

        <li>
          <button onClick={handleSignOut} className="signout-button">
            Sign Out
          </button>
        </li>
      </ul>
      )
    }
    </nav>
  );
}

function handleSignOut() {
  // Logic to handle sign out
}

export default NavigationBar;
