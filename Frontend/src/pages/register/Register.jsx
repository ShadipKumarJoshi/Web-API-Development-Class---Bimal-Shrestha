// rafce shortcut key 
import React, { useState } from 'react'
import { registerUserApi } from '../../apis/api'
import { toast } from 'react-toastify'

const Register = () => {

    // Step 2: Input(Type) - Make a state
    // logic section of step 2 is before return

    //Make a useState for 5 Fields
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    //UseState for Error Message
    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    // Make a each function for changing the value
    // onchange on each input
    const handleFirstname = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastname = (e) => {
        setLastName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    // Validation
    // var is used as it returns value,, const doesnt return
    var validate = () => {
        var isValid = true;

        // Validate the firstname
        if(firstName.trim() === '') { //trim removes spaces at first and end of string
            setFirstNameError("First name is required!")
            isValid = false
        }

        if(lastName.trim() === '') { //trim removes spaces at first and end of string
            setLastNameError("Last name is required!")
            isValid = false
        }

        if(email.trim() === '') { //trim removes spaces at first and end of string
            setEmailError("Email is required!")
            isValid = false
        }

        if(password.trim() === '') { //trim removes spaces at first and end of string
            setPasswordError("Password is required!")
            isValid = false
        }

        if(confirmPassword.trim() === '') { //trim removes spaces at first and end of string
            setConfirmPasswordError("Confirm Password is required!")
            isValid = false
        }

        if(confirmPassword.trim() !== password.trim()) { //trim removes spaces at first and end of string
            setConfirmPasswordError("Password and Confirm Password doesn't match!")
            isValid = false
        }

        return isValid; // isValid true/false is returned by this function

    }


    // Submit button Function
    const handleSubmit = (e) => {
        e.preventDefault() // prevents from returning to blank 

        // Validate
        var isValidated = validate(); // received true or false from above func
        if(!isValidated) {
            return // return to existing page

        }


        // console.log(firstName, lastName, email, password, confirmPassword)
        
        // Sending request to the api
        
        // making json object for the data of name, email and other datas
        const data = {
            "firstName" : firstName,     //first firstName is destructured data in backend userController.js 
            "lastName" : lastName,
            "email" : email,
            "password" : password
        }



        // import register api        
        registerUserApi(data).then((res) => {
            // console.log(res.data) // data json made above

            //Received data: success, message 
            if(res.data.success === false){
                toast.error(res.data.message)
            } else{
                toast.success(res.data.message)
            }

        })   

    }

    // Step 1: Make a complete UI of Register Page( Fields, Button, etc)
    return (
        <>

            <div className='container mt-2'>
                <h1>Create an Account!       </h1>

                <form className='w-50'>
                    <label>First Name : {firstName}</label>
                    <input onChange={handleFirstname} type='text' className='form-control' placeholder='Enter your First name' />
                    {
                        firstNameError && <p className='text-danger'>{firstNameError}</p>
                    }



                    {/* <label className='mt-2'>Last name</label>
                    <input type='text' className='form-control' placeholder='Enter your Last name' /> */}

                    <label className='mt-2'>Last Name: {lastName}</label>
                    <input onChange={handleLastname} type='text' className='form-control' placeholder='Enter your Last name' />

                    {
                        lastNameError && <p className='text-danger'>{lastNameError}</p>
                    }


                    <label className='mt-2'>Email: {email}</label>
                    <input onChange={handleEmail} type='text' className='form-control' placeholder='Enter your Email' />

                    {
                        emailError && <p className='text-danger'>{emailError}</p>
                    }


                    <label className='mt-2'>Password: {password}</label>
                    <input onChange={handlePassword} type='text' className='form-control' placeholder='Enter your Password' />

                    {
                        passwordError && <p className='text-danger'>{passwordError}</p>
                    }


                    <label className='mt-2'>Confirm Password : {confirmPassword}</label>
                    <input onChange={handleConfirmPassword} type='text' className='form-control' placeholder='Confirm your Password' />

                    {
                        confirmPasswordError && <p className='text-danger'>{confirmPasswordError}</p>
                    }


                    <button onClick={handleSubmit} className='btn btn-dark mt-2 w-100'> Create an Account!</button>
                </form>

            </div>


        </>
    )
}

export default Register

// Step 1: Make a complete UI of Register Page( Fields, Button, etc)
// Step 2: Input(Type) - Make a state
// Step 3: Onchange - Set the value to the state

// https://codeshare.io/VNKEp8

// npm install axios  //for connecting frontend and backend