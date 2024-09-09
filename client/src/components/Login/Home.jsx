import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import useLogout from "../../hooks/useLogout"; // Import the useLogout hook
import AuthContext from "../../context/AuthProvider";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = useLogout(); // Get the logout function from the custom hook

    const handleLogout = async () => {
        try {
            await logout(); // Call the logout function to clear backend state
            setAuth({}); // Clear the authentication state
            navigate('/linkpage'); // Redirect to the LinkPage after logout
        } catch (err) {
            console.error('Logout failed', err);
        }
    }

    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/user">Go to the Editor page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
         
            <div className="flexGrow">
                <button onClick={handleLogout}>Sign Out</button>
            </div>
        </section>
    );
}

export default Home;
