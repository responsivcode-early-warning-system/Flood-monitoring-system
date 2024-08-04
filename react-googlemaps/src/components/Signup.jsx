import React, {useState} from 'react ';


function SignupComponent(props) {

    const [username, setusername] = useStat('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault(); 

        console.log('Username: ' , username);   
        console.log('Email: ' , email);
        console.log('Password: ' , password);   


    };

    return (

        <form onSubmit= {handleSubmit}>
            <label >
                Username:
                <input type="text" value= {username} onChange= {(event)=> setUsername(event.target.value)} />
                
            </label>
            <label htmlFor="
            ">
                Email:
                <input type="email" value= {email} onChange= {(event) => setEmail(event.target.value)} />                   
            </label>
            <label>
                Pasword:
                <input type="text" value ={email} onChange={(event)=> setPasword(event.target.value)} />
            </label>
        </form>
    )
}
 

export default Signup;


