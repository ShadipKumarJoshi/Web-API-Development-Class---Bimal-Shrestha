// Make a login page
// Make a path in App.js
// make a frontend with email& Password
// make use State
// validation // make a error state
//Make a function to handle the form submission


import React, {useState} from 'react'
import Navbar from "../../components/Navbar";
import { toast } from 'react-toastify';

const Login = () => {

    //make a useState fir each input
    const [email,setEmail] = useState('')
    const [password,setPassword]= useState('')

    // make a error state
    const [emailError,setEmailError] = useState('')
    const [passwordError,setPasswordError]= useState('')
    
    //Make a function to handle the form submission
    const handleLogin = (e) => {
        e.preventDefault()
        toast.success('Login button is clicked!')
    }


    return (
        <div className="container">
            <h1>Login to your  Account!       </h1>
            <form className='w-50'> 
                <label>Email Address: {email} </label>
                <input  onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="Enter your email" />

                <label>Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter your password"></input>

                <button onClick={handleLogin} className='btn btn-danger w-100 mt-3'> Login</button> // button is onClick here in login


            </form>

           
           
        </div>
    )
}

export default Login; 

