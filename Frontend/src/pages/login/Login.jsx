// Make a login page
// Make a path in App.js
// make a frontend with email& Password
// make use State
// validation // make a error state
//Make a function to handle the form submission


import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Login = () => {

    //make a useState f0r each input
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // make a error state
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    // Email/password Validation
    const validation = () => {
        let isValid = true;
        if (email.trim() === "" || !email.includes('@')) {
            setEmailError("Email is empty or invalid!")
            isValid = false;
        }

        if (password.trim() === "") {
            setPasswordError("Password is empty!")
            isValid = false;
        }

        return isValid;

    }




    //Make a function to handle the form submission
    const handleLogin = (e) => {
        e.preventDefault()

        // Validation from email/password
        if (!validation()) {
            return
        }

        toast.success('Login button is clicked!')
    }


    return (
        <div className="container">
            <h1>Login to your  Account!       </h1>
            <form className='w-50'>
                <label>Email Address: {email} </label>
                <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="Enter your email" />

                {
                    emailError && <p className='text-danger'>{emailError}</p>
                }

                <label>Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter your password"></input>

                {
                    passwordError && <p className='text-danger'>{passwordError}</p>
                }

                <button onClick={handleLogin} className='btn btn-danger w-100 mt-3'> Login</button> // button is onClick here in login


            </form>



        </div>
    )
}

export default Login;

