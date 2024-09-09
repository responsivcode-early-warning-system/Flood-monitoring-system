import React, { useRef, useState, useEffect } from 'react';
import useAuth from "../../hooks/useAuth"; // Adjust path as needed
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../api/axios';
import { useNavigate, useLocation } from 'react-router-dom';

const LOGIN_URL = '/auth';

function Login() {
    const { setAuth,setPersist } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [rememberMe, setRememberMe] = useState(false); 
    const from = location.state?.from?.pathname || "/home"; // Default redirect to "/home"

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [firstTimeLogin, setFirstTimeLogin] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await axios.post(
                LOGIN_URL,
                { email, password },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            const { accessToken, roles, firstTimeLogin } = response?.data;

            console.log('Login successful!');
            console.log('AccessToken:', accessToken);
            console.log('Roles:', roles);
            console.log('First Time Login?:', firstTimeLogin);

            setAuth({ user: email, roles: roles, accessToken });


            setFirstTimeLogin(firstTimeLogin);
            setEmail('');
            setPassword('');

            if (firstTimeLogin) {
                console.log('Redirecting to /reset');
                navigate('/reset', { state: {email}, replace: true });
            } else {
                console.log('Redirecting to:', from);
                navigate(from, { replace: true });
            }
            setPersist(rememberMe); 

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
                console.log('No server response.');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
                console.log('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Invalid email or password');
                console.log('Invalid email or password');
            } else {
                setErrMsg('Login Failed');
                console.log('Login failed with status:', err.response?.status);
            }
            errRef.current.focus();
        }
    };
 

    return (
        <section className="login-container">
            <div className="login-form">
                <p
                    ref={errRef}
                    className={errMsg ? 'alert alert-danger' : 'd-none'}
                    aria-live="assertive"
                >
                    {errMsg}
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            ref={userRef}
                            placeholder="Enter Email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </div>
                    <div>
                        <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(prev => !prev)} />
                        <label>Remember Me</label>
                        <button className="btn btn-success w-100">Login</button>        
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Login;
