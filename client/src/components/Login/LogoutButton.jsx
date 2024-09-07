import React from 'react';
import { useNavigate } from 'react-router-dom';
import useLogout from '../../hooks/useLogout'; // Adjust the import path

const LogoutButton = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const handleLogout = async () => {
        await logout(); // Execute the logout logic
        navigate('/login', { replace: true }); // Redirect to login page after logout
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
