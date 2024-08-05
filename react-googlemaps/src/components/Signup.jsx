import React, { useState } from 'react';

function SignupForm() {
    const [formData, setFormData] = useState({
        firstName: '', middleName: '', lastName: '', contact: '', email: '', password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>First Name: <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} /></label><br />
            <label>Middle Name: <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} /></label><br />
            <label>Last Name: <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} /></label><br />
            <label>Contact: <input type="tel" name="contact" value={formData.contact} onChange={handleChange} /></label><br />
            <label>Email: <input type="email" name="email" value={formData.email} onChange={handleChange} /></label><br />
            <label>Password: <input type="password" name="password" value={formData.password} onChange={handleChange} /></label><br />
            <button type="submit">Submit</button>
        </form>
    );
}

export default SignupForm;