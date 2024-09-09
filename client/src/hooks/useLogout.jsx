import axios from '../api/axios'; // Assuming axios is configured
import useAuth from './useAuth';

const useLogout = () => {
    const { setAuth, setPersist } = useAuth(); // Access auth context

    const logout = async () => {
        try {
            // Send request to the backend logout endpoint
            await axios('/logout', {
                method: 'POST',
                withCredentials: true, // To send the cookie with the request
            });

            // Clear auth state on the client
            setAuth({});
            setPersist(false); // Disable persist login

            // Optionally clear any stored tokens or data in localStorage
            localStorage.removeItem("persist");
        } catch (err) {
            console.error('Error during logout:', err);
        }
    };

    return logout;
};

export default useLogout;
