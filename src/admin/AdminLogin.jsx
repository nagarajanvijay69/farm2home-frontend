import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const adminLogin =(e)=>{
    e.preventDefault();
    if(!email.trim() || !password.trim()) alert("Enter all fields");
     if(email == 'adminemail@gmail.com' && password == 'adminpass01'){
       sessionStorage.setItem("admin", true);
       navigate('/admin-dash');
     }else{
       if(email != 'adminemail@gmail.com') alert("Incorrect Email id")
       else alert("Incorrect Password")
     }
  }

  return (
    <div className='w-[100dvw] my-28 flex justify-center items-center'>
      <form className="bg-white text-gray-500 max-w-[350px] mx-4 md:p-6 p-4 text-left
  text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10 border-2 border-gray-300" onSubmit={adminLogin}>
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Admin Login</h2>
        <input id="email" className="w-full border bg-transparent my-3 border-gray-500/30 outline-none rounded py-2.5 px-4"
         type="email" placeholder="Enter your email" required onChange={(e)=> setEmail(e.target.value)}/>
        <input id="password" className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded py-2.5 px-4"
         type="password" placeholder="Enter your password" required onChange={(e)=> setPassword(e.target.value)} />
        <div className="text-right py-4">
        </div>
        <button type="submit" className="w-full mb-3 bg-green-500 hover:bg-green-600/90 active:scale-95 transition py-2.5 rounded text-white">Log in</button>
      </form>
    </div>
  )
}

export default AdminLogin