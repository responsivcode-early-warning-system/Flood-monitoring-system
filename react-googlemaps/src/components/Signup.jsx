import React, {useState} from 'react';

function SignupForm(props) {

    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault(); 

        console.log('First Name: ' , firstName);   
        console.log('Email: ' , email);
        console.log('Password: ' , password);   
        console.log('Middle Name: ' , middleName);   
        console.log('Last Name: ' , lastName);   
    };

    return (
        <form onSubmit={handleSubmit}>
            <label >
                First Name:
                <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
            </label>
            <br/>
            <label>
                Middle Name:
                <input type="text" value={middleName} onChange={(event) => setMiddleName(event.target.value)} />
            </label>
            <br/>
            <label>
                Last Name:
                <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} />
            </label>
            <br/>
            <label>
                Email:
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
            <br/>
            <label>
                Password:
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
            <br/>
            <label>
                Contact 
                <input type="contact " value={contact } onChange={(event) => setContact(event.target.value)} />
            </label>
            <br/>
            <button type="submit">Submit</button>
        </form>
    );
}

export default SignupForm;