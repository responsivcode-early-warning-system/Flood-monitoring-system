import { Link } from "react-router-dom"
import React from 'react';
import Users from "./Users"

const User = () => {
    return (
        <section>
            <h1>User Page</h1>
            <br />
            <p>You must have been assigned a User role.</p>
            <div className="flexGrow">
                <Link to="/Home">Home</Link>
            </div>
        </section>
    )
}

export default User;