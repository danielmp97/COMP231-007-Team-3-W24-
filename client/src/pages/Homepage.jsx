import React, { useEffect } from 'react';
import { login } from '../api'; // Import the login function from your API module

function Homepage() {
    useEffect(() => {
        // Call the login function with default username and password
        login('juanito', '123')
            .then(response => {
                // Handle successful login
                console.log('Logged in successfully:', response);
            })
            .catch(error => {
                // Handle login error
                console.error('Error logging in with default user:', error);
            });
    }, []); // Empty dependency array ensures useEffect runs only once on component mount

    return (
        <div>
            {/* Your homepage content goes here */}
        </div>
    );
}

export default Homepage;
