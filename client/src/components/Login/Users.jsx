import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]); // Initialize with empty array
    
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                setUsers(response.data); // No need to check `isMounted` since the abort controller handles the cancellation
            } catch (err) {
                if (err.name === 'CanceledError') {
                    
                } else {
                    console.error(err);
                    navigate('/login', { state: { from: location }, replace: true });
                }
            }
        };

        getUsers();

        return () => {
            controller.abort();
        };
    }, [axiosPrivate, navigate, location]); // Include dependencies

    return (
        <article>
            <h2>Users List</h2>
            {users.length > 0
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.username}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article>
    );
};

export default Users;
