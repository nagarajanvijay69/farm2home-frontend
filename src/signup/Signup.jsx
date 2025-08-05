import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Setotp, setLogin, setUser } from '../redux-store/Slice'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Signup = () => {

    const [step, setStep] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const port = 'https://farm2home-backend-8013.onrender.com';
    const navigate = useNavigate();
    const dispatch = useDispatch();
    var otp = useSelector((state) => state.data.otp);
    const [userPass, setUserPass] = useState('');


    const otpVerify = async () => {
        const res = await axios.post(`${port}/mail`, { email });
        // console.log(res.data)
        const otp = Number(res.data.otp);
        dispatch(Setotp(otp));
    }


    const submit = async () => {

        if(!email) return toast.error("Enter Email id")
        if(!username) return toast.error("Enter username")
        if(!password) return toast.error("Enter password")
        const res = await axios.post(`${port}/check-email`, { email });
        if (res.data.success === true) {
            toast.warn("Email already exists");
            navigate('/login');
        } else {
            await otpVerify();
            setStep(true);
        }
    }

    // console.log("OTP", Number(otp), "User", userPass)

    const verify = async (e) => {
        e.preventDefault();
        if (otp == Number(userPass)) {
            try {
                const res = await axios.post(`${port}/signup`, {
                    username,
                    email,
                    password
                },{
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (res.data.success === false) {
                    navigate('/login');
                    return toast.warn(res.data.message);
                }

                // console.log(res.data.user);
                if (res.data.success === true) {
                    dispatch(setLogin());
                    dispatch(setUser(res.data.user))
                    navigate('/');
                }
            } catch (error) {
                toast.error(error.message)
            }


        } else {
            toast.error("Wrong OTP")
        }

    }

    return <div className='w-[100dvw] my-28 flex flex-col gap-2 justify-center items-center'>
        {
            !step ?
                <div className="bg-white border-gray-300 text-gray-500 max-w-[340px] border-2 w-full mx-4 md:p-6 p-4 py-8 
        text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10">
                    <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">Sign Up</h2>
                    <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
                        <input className="w-full outline-none bg-transparent py-2.5 px-1" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}
                            value={username} required />
                    </div>
                    <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
                        <input className="w-full outline-none bg-transparent py-2.5 px-1" type="email" placeholder="Email" required
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex items-center mt-2 mb-8 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
                        <input className="w-full outline-none bg-transparent py-2.5 px-1" type="password" placeholder="Password" required
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="button" onClick={submit} className="w-full mb-3 bg-green-500 hover:bg-green-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">Sign up</button>
                    <p className="text-center mt-4">Already have an account? <Link to='/login' className="text-green-500 underline">Log In</Link></p>
                </div>
                : null
        }
        {
            step ?
                <div className="bg-white border-gray-300 text-gray-500 max-w-96 border-2 mx-4 md:py-10 md:px-6 
            px-4 py-8 text-left text-sm rounded-lg transition-all shadow-[0px_0px_10px_0px] shadow-black/10" >
                    <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Verify</h2>
                    <p>Please enter the OTP</p>
                    <p className="text-gray-500/60 mb-4">The authentication code has been sent to your email </p>
                    <div className="flex items-center justify-between mb-6">
                        <input value={userPass} id="password" className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded py-2.5 px-4"
                            type="password" placeholder="Enter your OTP" required maxLength='4' onChange={(e) => setUserPass(e.target.value)} />
                    </div>
                    <button type="button" onClick={verify} className="w-full my-1 bg-green-500 py-2.5 rounded text-white active:scale-95 transition">Verify</button>
                </div>
                : null
        }
        <ToastContainer />
    </div>
}

export default Signup