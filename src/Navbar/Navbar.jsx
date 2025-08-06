import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setLogout } from '../redux-store/Slice'
import axios from 'axios';


const Navbar = () => {
  const [isMenu, setIsMenu] = useState(false);

  var Login = useSelector((state) => state.data.Login);
  const dispatch = useDispatch();
    const port = import.meta.env.VITE_PORT


  const Logout = async () => {
    dispatch(setLogout());
    console.log("Log out");
 try{
     const res = await axios.get(`${port}/logout`,{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
     });
    //  console.log(res.data);

 } catch (error) {
      // console.log("Error in logout", error.message);
    }
    setIsMenu(false);
  }


  return <>
    <header className="border-2 border-gray-300">
      <nav className={isMenu ? 'h-[70px] w-[100%] relative flex items-center z-10 justify-between px-2 bg-white' : 'h-[70px] w-[100%] relative flex items-center z-10 justify-between px-2 bg-white shadow-md'}>
        <Link className='text-green-600 z-10' to='/'><p className='bg-white w-[200px]'><span className='text-[38px] font-bold'>F</span>
          <span className='font-bold text-[24px]'>arm to Home</span></p></Link>
        <ul className={isMenu ? 'flex gap-8 absolute md:static top-[70px] left-0 w-full z-9 justify-center items-start p-4 flex-col md:flex-row bg-white shadow-lg duration-500 ease-in-out' :
          'flex gap-8 absolute top-[-300px] left-0 w-full z-9 justify-center items-start p-4 flex-col bg-white md:static md:flex-row'}>
          <NavLink to='/' className='z-9' onClick={() => setIsMenu(false)}><li>Home</li></NavLink>
          <NavLink to='/products' className='z-9' onClick={() => setIsMenu(false)}><li>Products</li></NavLink>
          <NavLink to='/cart' className='z-9' onClick={() => setIsMenu(false)}><li>Cart</li></NavLink>
          <NavLink to='/order' className='z-9' onClick={() => setIsMenu(false)}><li>My Orders</li></NavLink>
          {
            Login ?
              <Link className='bg-red-500 px-3 py-1 md:hidden text-center text-white rounded-lg mb-3'
                onClick={() => setIsMenu(false)}><button>Logout</button></Link>
              :
              <Link to='/login' className='bg-green-500 px-3 py-1 md:hidden text-center text-white rounded-lg mb-3'
                onClick={() => setIsMenu(false)}><button>Login</button></Link>
          }
        </ul>
        <div className='flex items-center gap-4 z-10'>
          {
            Login ?
              <Link to='/profile' className='h-8 w-8 md:size-600px rounded-2xl bg-black'><img src="./login-pro.png"
                className='h-8 w-8 md:size-600px rounded-2xl' /></Link>
              :
              <Link to='/profile' className='h-8 w-8 md:size-600px rounded-xl'><img src="./logout-pro.jpeg" className='h-8 w-8 md:size-600px rounded-2xl' /></Link>

          }{
            Login ?
              <div className='hidden md:block bg-red-500 px-4 py-1 text-center text-white rounded-lg'
                onClick={Logout}><button>Logout</button></div>
              :
              <Link to='/login' className='hidden md:block bg-green-500 px-4 py-1 text-center text-white rounded-lg'><button>Login</button></Link>

          }
          <img src="./menu.svg" className={isMenu ? 'hide h-8 md:hidden' : 'h-8 cursor-pointer md:hidden'} onClick={() => setIsMenu(true)} />
          <img src="./cancel.svg" className={isMenu ? 'h-8 cursor-pointer md:hidden' : 'hide h-8 md:hidden'} onClick={() => setIsMenu(false)} />
        </div>
      </nav>
    </header>
  </>
}

export default Navbar