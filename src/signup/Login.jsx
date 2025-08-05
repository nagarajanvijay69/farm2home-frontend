import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { setLogin, setUser, initOrder, initCart } from '../redux-store/Slice'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const port = 'https://farm2home-backend-8013.onrender.com'
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const tempEmail = email;
    const tempPass = password;
    setEmail("");
    setPassword("");


    try {
      const res = await axios.post(`${port}/login`, {
        email: tempEmail,
        password: tempPass
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // console.log(res.data);
      if (res.data.success === false) {
        return toast.warn(res.data.message);
      }

      if (res.data.success === true) {
        dispatch(setLogin());
        dispatch(setUser(res.data.user))
        // const orders = await axios.post(`${port}/user-orders`, { userId: res.data.user._id });
        // console.log("1",orders.data)
        // dispatch(initOrder(orders.data.orders));
        dispatch(initCart(res.data.user.cart));
        navigate('/');
      }
    } catch (err) {
      // console.log("Error ", err)
    }
  }

  return <div className='w-[100dvw] my-28 flex justify-center items-center'>
    <div className="bg-white text-gray-500 max-w-[350px] mx-4 md:p-6 p-4 text-left 
  text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10 border-2 border-gray-300">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login</h2>
      <input id="email" className="w-full border bg-transparent my-3 border-gray-500/30 outline-none rounded py-2.5 px-4"
        type="email" placeholder="Enter your email" required onChange={(e) => setEmail(e.target.value)} value={email} />
      <input id="password" className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded py-2.5 px-4" value={password}
        type="password" placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)} />
      <div className="text-right py-4">
        <Link className="text-green-600 underline" to='/password'>Forgot Password</Link>
      </div>
      <button onClick={login} type="button" className="w-full mb-3 bg-green-500 hover:bg-green-600/90 active:scale-95 transition py-2.5 rounded text-white">Log in</button>
      <p className="text-center mt-4">Don’t have an account? <Link to='/signup' className="text-green-500 underline">Signup Now</Link></p>
    </div>
    <ToastContainer />
  </div>
}

export default Login