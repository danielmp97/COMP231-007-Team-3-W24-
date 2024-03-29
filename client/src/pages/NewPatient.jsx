import React, { useState } from 'react';
import './NewPatient.css';

function NewPatient() {
    const URL = 'http://localhost:8000/'; // Update this URL before deploying

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        age: '',
        gender: ''
    });

    const [passwordsMatch, setPasswordsMatch] = useState(true); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'repeatPassword') {
            setPasswordsMatch(prevState => passwordMatch(formData.password, value));
        }
    };

    const passwordMatch = (password, repeatPassword) => {
        return password === repeatPassword;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!passwordsMatch) {
            alert('Passwords do not match');
        } else {

            const sendData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                gender: formData.gender,
                password: formData.password,
                age: formData.age,
                role: 'patient'
            };

            fetch(URL + 'patients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sendData)
            })
            .then(response => {
                if (response.ok) {
                    alert('Account created successfully');
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        password: '',
                        repeatPassword: '',
                        age: '',
                        gender: ''
                    });
                } else {
                    alert('Failed to create account'); 
                }
            })
            .catch(error => {
                console.error('Error creating account:', error);
                alert('An error occurred while creating the account'); 
            });
        }
    };
    
    return (
        <div className="new-patient-container">
            <h1>Create an Account</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className='name-box'/>
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className='form-group'>
                    <label>Phone:</label>
                    <input type='tel' name='phone' value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Repeat Password:</label>
                    <input type="password" name="repeatPassword" value={formData.repeatPassword} onChange={handleChange} required />
                    {!passwordsMatch && <small>Passwords must match</small>}
                </div>
                <div className="form-group">
                    <label>Age:</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} required  min='0'/>
                </div>
                <div className="form-group">
                    <label>Gender:</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
}

export default NewPatient;
