// path and function
// This line imports the userModel module from the userModel.js file, 
// which  contains the logic for interacting with the user data in the database.
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const sendOtp = require('../service/sendOtp');

// ####################################################################

// USER REGISTRATION

// ####################################################################

// This defines the createUser function, which is an asynchronous function 
// that takes req (request) and res (response) as parameters. 
// This function handles the logic for creating a new user.
const createUser = async (req, res) => {
    // res.send("Create user API is Working!")

    // -------------FLOW CHART of REGISTER algorithm--------------

    //1. Check incoming data
    //2. Destructure  the incoming data
    //3. Validate the data (check email and password is received/)
    //4. ERROR Handling ( TRY,CATCH)
    //5. Check if the user is already registered
    //---//5.1. if user found:Send response
    //---//---//5.1.1. Stop the process
    //--- //5.2. if user is new:
    //---//---//5.2.1. Hash the password
    //---//---//5.2.2. Save to the database
    //---//---//5.2.3. Swnd successful response
    //-------------------------------------------------------------

    // 1. and 2.  extract the relevant data (first name, last name, email, password) from the request body. 
    // It assumes that the request body contains JSON data with these fields.
    //1. Check incoming data
    console.log(req.body); // json is wrriten in raw of body of postman 

    //2. Destructure  the incoming data
    const { firstName, lastName, email, password, phone } = req.body; // data is requested from body

    //3. Validate the data (check email and password is received/)
    // if empty, stop the process and send res(response)
    // This checks if any of the required fields (first name, last name, email, password) are missing from the request body. 
    // If any field is missing, it sends a JSON response indicating failure and a corresponding error message.
    if (!firstName || !lastName || !email || !password || !phone) {
        // res.send("Please enter all fields!")
        // res.status(400).json() //dont use it as it is for proffesional use and can cause lots of errors
        res.json({
            "success": false,
            "message": "Please enter all fields!" // custom error handling
        })

    }

    //4. ERROR Handling ( TRY,CATCH)
    try {
        //5. Check if the user is already registered. This structure is a try-catch block. 
        // The code inside the try block is the code that may throw an error. 
        // If an error occurs, it is caught by the catch block, where you can handle the error. 
        // In this case, if an error occurs during user creation, it sends a JSON response indicating an internal server error.
        const existingUser = await userModel.findOne({ email: email })
        // first email is from database and second email is from destructuring

        //---//5.1. if user found:Send response
        if (existingUser) {
            return res.json({
                "success": false,
                "message": "User Already Exists!"
            })
        }
        //---//---//5.1.1. Stop the process

        // Hashing/Encryption of the password
        const randomSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, randomSalt)

        //--- //5.2. if user is new:
        const newUser = new userModel({
            // Database Fields : Client's value
            firstName: firstName, // first from database, second is from destructuring from user input
            lastName: lastName,
            email: email,
            // password: password
            password: hashedPassword,
            // npm install bcrypt for installing package for password hashing
            phone: phone
        })

        // save to the database
        await newUser.save()
        // send the response
        res.json({
            "success": true,
            "message": "User created Successfully!"
        })




        //---//---//5.2.1. Hash the password
        //---//---//5.2.2. Save to the database
        //---//---//5.2.3. Swnd successful response


    } catch (error) {
        console.log(error)
        return res.json({
            "success": false,
            "message": "Internal Server Error!"
        })

    }




}

// // ####################################################################

// // USER LOGIN

// // ####################################################################


// // Function to handle user login
// const loginUser = async (req, res) => {

//     // Destructure email and password from request body
//     const { email, password } = req.body;

//     // Check if email and password are provided
//     if (!email || !password) {
//         return res.json({
//             success: false,
//             message: "Please provide both email and password."
//         });
//     }
//     try {
//         // Find user by email in the database
//         const existingUser = await userModel.findOne({ email: email });

//         // If user not found, return error
//         if (!existingUser) {
//             return res.status.json({
//                 success: false,
//                 message: "User is not registeres!"
//             });
//         }

//         // Check if password matches
//         const isPasswordValid = await user.isValidPassword(password);

//         // If password is invalid, return error
//         if (!isPasswordValid) {
//             return res.status.json({
//                 success: false,
//                 message: "Invalid password!"
//             });
//         }

//         // If email and password are valid, return success response
//         res.status.json({
//             success: true,
//             message: "Login successful.",
//             user: {
//                 id: user._id,
//                 email: user.email,
//                 firstName: user.firstName,
//                 lastName: user.lastName
//             }
//         });
//     } catch (error) {
//         // If any error occurs, return internal server error
//         console.error(error);
//         res.status.json({
//             success: false,
//             message: "Internal server error."
//         });
//     }
// };

// // Exporting the login function
// module.exports = {
//     loginUser
// };



//change password




//  Login Function
const loginUser = async (req, res) => {
    // res.send("Login API is working!")

    // STEPS
    // Check incoming data - email , password

    // Validation
    // Try / catch


    // check incoming data -postman-body-raw- json 
    console.log(req.body)

    // Destructuring
    const { email, password } = req.body;

    //Validation
    if (!email || !password) {
        return res.json({
            "success": false,
            "message": " Please enter all fields!"
        })
    }

    // Try catch
    try {

        // Find user (email)
        // not found (error message)
        // user found - compare password (bcrypt)
        // password not valid (error)
        // token (Generate - with user Data + KEY)
        // response (token, user data) 


        // Find user (email)
        const user = await userModel.findOne({ email: email })
        // datas that can be found: firstname, lastname, email, password

        // email not found (error message)
        if (!user) {
            return res.json({
                "success": false,
                "message": " User doesn't exist!"
            })
        }

        // user found - compare password (bcrypt)
        const isValidPassword = await bcrypt.compare(password, user.password)


        // password not valid (error)
        if (!isValidPassword) {
            return res.json({
                "success": false,
                "message": " {Password is wrong}!"
            })
        }
        // token (Generate - with user Data + KEY)  install package: npm i jsonwebtoken
        const token = await jwt.sign(
            { id: user._id, isAdmin: user.isAdmin }, // token id, mongo db id
            process.env.JWT_SECRET
        )

        // response (token, user data) 
        res.json({
            "success": true,
            "message": "User Login Successful",
            "token": token,
            "userData": user
        })

    } catch (error) {
        console.log(error)
        return res.json({
            "success": false,
            "message": "Internal Server Error!"
        })
    }
}

// Forgot password by using phone number
// const forgotPassword = async (req, res) => {
//     // phone number from body
//     // finding user if exists by phone number
//     // generate random 6 digit otp
//     // set expiry time
//     // save to database for verification
//     // send OTP to registered phone number


//     // phone number from body  
//     const { phone } = req.body;

//     if (!phone) {
//         return res.status(400).json({
//             'success': false,
//             'message': "Provide your phone number!"
//         })
//     } try {

//         // finding user if exists by phone number
//         const user = await userModel.findOne({ phone: phone })

//         if (!user) {
//             return res.status(400).json({
//                 'success': false,
//                 'message': "User Not Found!"
//             })
//         }

//         // generate random 6 digit otp
//         const otp = Math.floor(100000 + Math.random() * 900000)

//         // set expiry time
//         const expiryDate = Date.now() + 360000;

//         // save to database for verification
//         user.resetPasswordOTP = otp;
//         user.resetPasswordExpires = expiryDate;

//         //  save/ query to databse
//         await user.save();

//         // send OTP to registered phone number => first sendOTP.js then send OTP
//         const isSent = await sendOtp(phone, otp)
//         if (!isSent) {
//             return res.status(400).json({
//                 'success': false,
//                 'message': "Error Sending OTP Code!"
//             })
//         }

//         // if success
//         res.status(200).json({
//             'success': true,
//             'message': "OTP sent successfully!"
//         })

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             'success': false,
//             'message': "Server Error!"
//         })
//     }
// }

const forgotPassword = async (req, res) => {

    const { phone } = req.body;
    if (!phone) {
        return res.status(400).json({
            success: false,
            message: "Please Provide your Phone Number!"
        })
    }
    try {

        //finding user 
        const user = await userModel.findOne({ phone: phone })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Not Found!"
            })
        }

        //generating random 6 digit otp
        const otp = Math.floor(100000 + Math.random() * 900000);

        //generating expiry time for otp
        const expiryDate = Date.now() + 360000;

        //save to database for verification
        user.resetPasswordOTP = otp;
        user.resetPasswordExpires = expiryDate;
        await user.save();


        //send to registered phone number
        const isSent = await sendOtp(phone, otp);
        console.log(isSent)
        if (!isSent) {
            return res.status(400).json({
                success: false,
                message: "Error sending OTP code!"
            })
        }

        //if success
        res.status(200).json({
            success: true,
            message: "OTP sent successfully!"
        })



    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server Error!"
        })

    }
}

//Verify Otp and set new Password
const verifyOtpAndSetPassword = async (req, res) => {
    // phone number, otp, new password = get data
    // find user by phone number
    // check otp and expiry time
    // update password
    // save to database
    // send success response

    // get data
    const { phone, otp, newPassword } = req.body;
    if (!phone || !otp || !newPassword) {
        return res.status(400).json({
            success: false,
            message: "Please provide all fields!"
        })
    }
    try {
        const user = await userModel.findOne({ phone: phone })

        // Verify otp
        if (user.resetPasswordOTP != otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP!"
            })
        }
        if (user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP Expired!"
            })
        }

        // Update password // hash the new password
        const randomSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, randomSalt)

        // save to database
        user.password = hashedPassword;
        await user.save();

        // send success response
        res.status(200).json({
            success: true,
            message: "OTP Verified and Password updated successfully!"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server Error!"
        })
    }

}





// Exporting the function to another file. This exports the createUser function so that it can be imported and used in other files.
module.exports = {
    createUser,
    loginUser,
    forgotPassword,
    verifyOtpAndSetPassword
}