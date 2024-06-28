import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { forgotPasswordApi, verifyOtpApi } from '../../apis/api'

// LOGIC FOR FORGOT PASSWORD
// 1. make a UI
// 2. make a state
// 3. send OTP (( make a api call to send OTP ))
// 3.1. if OTP success:
// 3.1.1. Disable Input, button
// 3.1.2. show the UI: (OTP input, set password input, confirm password input, submit button)
// 3.1.3. verify otp and set password
// 3.2. if not verified, don't change password



const ForgotPassword1 = () => {


  // 2. make a state
  const [phone, setPhone] = useState('')
  const [isSent, setIsSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')

  // Send OTP function
  const handleSendOtp = (e) => {
    e.preventDefault()
    // make a api call to send OTP
    forgotPasswordApi({ phone }).then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message)
        setIsSent(true)

      }
    }).catch((error) => {
      if (error.response.status === 400 || 500) {
        toast.error(error.response.data.message)
      }
    })
  }

  // Verify OTP and set password
  const handleVerifyOtp = (e) => {
    e.preventDefault()

    const data = {
      'phone': phone,
      'otp': otp,
      'newPassword': newPassword

    }

    // api call
    verifyOtpApi(data).then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message)
      }

    }).catch((error) => {
      if (error.response.status === 400 || 500) {
        toast.error(error.response.data.message)
      }

    })

  }

  return (
    <>
      <div className='container mt-3'>
        <h3> Forgot Password!</h3>
        <form className='w-25'>
          <span className='d-flex'
          >
            <h4> +977</h4>
            < input disabled={isSent} onChange={(e) => setPhone(e.target.value)} type='number' className='form-control' placeholder='Enter your Phone Number' />
          </span>

          <button disabled={isSent} onClick={handleSendOtp} className='btn btn-dark mt-2 w-100'>Send OTP</button>

          {
            isSent && <>
              <hr />
              {/* win + ;   for emoji */}
              <p> OTP has been sent to {phone}✅</p>
              <input onChange={(e) => setOtp(e.target.value)} type='number' className='form-control' placeholder='Enter your OTP' />
              {/* <input onChange={(e) =>setNewPassword(e.target.value)} type ='password' className='form-control mt-2' placeholder='Enter your new password'/> */}
              <input onChange={(e) => setNewPassword(e.target.value)} type='text' className='form-control mt-2' placeholder='Enter your new password' />
              <button onClick={handleVerifyOtp} className='btn btn-primary mt-2 w-100'>Verify OTP & Set Password</button>

            </>
          }

        </form>

      </div>
    </>
  )
}

export default ForgotPassword1



