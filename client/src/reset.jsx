import React, { useContext, useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AuthContext from './context/AuthProvider'; // Adjust path as needed
import axios from './api/axios';

const PWD_RESET = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const Reset_URL = '/reset';

function Reset() {
    const location = useLocation();
    const { auth } = useContext(AuthContext);
    const emailFromState = location.state?.email || auth.email; // Use email from state or context
    const userRef = useRef(null);
    const errRef = useRef(null);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setValidPwd(PWD_RESET.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const isValidPwd = PWD_RESET.test(pwd);
        if (!isValidPwd) {
            setErrMsg("Invalid Entry");
            return;
        }
    
        console.log('Sending request with:', { email: emailFromState });  // Debugging line
    
        try {
            const response = await axios.post(
                Reset_URL,
                { email: emailFromState, password: pwd },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            console.log('Password reset response:', JSON.stringify(response?.data));
            setSuccess(true);
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            console.error('Reset error:', err);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Invalid Request');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else if (err.response?.status === 404) {
                setErrMsg('User Not Found');
            } else {
                setErrMsg('Password Reset Failed');
            }
            if (errRef.current) {
                errRef.current.focus();
            }
        }
    };
    
    return (
        <>
            {success ? (
                <section>
                    <h1>Password Reset Successfully!</h1>
                    <p>
                        <a href="/Home">Home</a>
                    </p>
                </section>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter New Password"
                            className="form-control"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            ref={userRef}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            className="form-control"
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            Must match the first password input field.
                        </p>
                    </div>
                    <div>
                        <button type="submit" disabled={!validPwd || !validMatch} className="btn btn-success w-100">
                            Reset Password
                        </button>
                    </div>
                </form>
            )}
        </>
    );
}

export default Reset;
