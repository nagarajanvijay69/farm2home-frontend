import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Setotp, setLogin, setUser } from '../redux-store/Slice'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Password = () => {

     const [Step, setStep] = useState(0);
     const port = import.meta.env.VITE_PORT
     const [email, setEmail] = useState('');
     const dispatch = useDispatch();
     var otp = useSelector((state) => state.data.otp);
     const [userPass, setUserPass] = useState('');
     const [Pass1, setPass1] = useState('')
     const [Pass2, setPass2] = useState('')
     const navigate = useNavigate();


     const sendOtp = async () => {
          if(!email) {
               return toast.warn("Please enter your email");
          }

          try{
               const user = await axios.post(`${port}/check-email`, {
                    email
               })
               if (user.data.success === false) {
                    return toast.warn("User not found, please signup");
               }
          } catch (error) {
               // console.log(error.message);
               return toast.error("Error in sending OTP, please try again later");
          }

          setStep(1);
          const res = await axios.post(`${port}/mail`, {
               email
          })
          if (res.data.success === false) {
               return toast.error(res.data.message);
          }
          // console.log(res.data.otp);
          dispatch(Setotp(res.data.otp));

     }

     const verify = async () => {
          if (otp === Number(userPass)) {
               setStep(2);
          } else {
               toast.error("wrong OTP");
          }
     }

     const changePass = async (e) => {
          e.preventDefault();
          if (Pass1 === Pass2) {
               try {
                    const user = await axios.patch(`${port}/reset`, {
                         email,
                         password: Pass1
                    },{
                         withCredentials: true,
                         headers: {
                              'Content-Type': 'application/json'
                         }
                    })

                    if (user.data.success === false) {
                         return toast.error(user.data.message);
                    }
                    if (user.data.success === true) {
                         dispatch(setLogin());
                         dispatch(setUser(user.data.user));
                         toast.success("Password Changed Successfully");
                         navigate('/');
                    }
               } catch (error) {
                    // console.log(error);
               }
          }
     }

     return (
          <>


               <div className="w-[100dvw] my-28 flex flex-col gap-2 justify-center items-center">
                    {
                         Step === 0
                              ?
                              <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 border-2 text-left text-sm rounded border-gray-300 shadow-[0px_0px_10px_0px] shadow-black/10">
                                   <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Forget Password?</h2>
                                   <label htmlFor="email">Email</label>
                                   <input id="email" className="w-full border mt-1 border-gray-500/30 focus:outline-none outline-none rounded py-2.5 px-4"
                                        type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                   <button type="button" className="w-full my-3 bg-green-500 active:scale-95 transition py-2.5 rounded text-white"
                                        onClick={sendOtp} >Send OTP</button>
                                   <p className="text-center mt-4">Don’t have an account? <Link className="text-green-500 underline" to='/signup'>Signup Now</Link></p>
                              </div>
                              : null
                    }
                    {
                         Step === 1
                              ?
                              <form className="bg-white border-gray-300 text-gray-500 max-w-96 border-2 mx-4 md:py-10 md:px-6 px-4 py-8 text-left text-sm rounded-lg transition-all shadow-[0px_0px_10px_0px] shadow-black/10">
                                   <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Reset Password</h2>
                                   <p>Please enter the OTP</p>
                                   <p className="text-gray-500/60 mb-4">The authentication code has been sent to your email </p>
                                   <div className="flex items-center justify-between mb-6">
                                        <input id="password" className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none
                                         rounded py-2.5 px-4" type="password" placeholder="Enter your OTP" required maxLength='4'
                                             onChange={(e) => setUserPass(e.target.value)} value={userPass} />

                                   </div>
                                   <button type="button" className="w-full my-1 bg-green-500 py-2.5 rounded text-white active:scale-95 transition"
                                        onClick={verify} >Verify</button>
                              </form>
                              : null
                    }
                    {
                         Step === 2
                              ?
                              <form className="bg-white border-gray-300 text-gray-500 max-w-96 border-2 mx-4 md:py-10 md:px-6 px-4 py-8 text-left text-sm rounded-lg transition-all shadow-[0px_0px_10px_0px] shadow-black/10">
                                   <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">New Password</h2>
                                   <p>Enter new Password</p>
                                   <div className="flex items-between justify-center mb-6 flex-col">
                                        <input id="password"
                                             className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded py-2.5 px-4"
                                             type="password" placeholder="Enter new Password" required
                                             value={Pass1} onChange={(e) => setPass1(e.target.value)} />
                                        <p className="my-1">Re Enter your new password <span className='opacity-0'>..................................</span> </p>
                                        <input id="password"
                                             className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded py-2.5 px-4"
                                             type="password" placeholder="Enter new Password" required
                                             value={Pass2} onChange={(e) => setPass2(e.target.value)} />

                                   </div>
                                   <button type="buttom" className="w-full my-1 bg-green-500 py-2.5 rounded text-white active:scale-95 transition"
                                        onClick={changePass} >Save</button>
                              </form>
                              :
                              null
                    }
               </div>
               <ToastContainer />
          </>
     )
}

export default Password