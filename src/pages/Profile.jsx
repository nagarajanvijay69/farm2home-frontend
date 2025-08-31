import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setLogout } from '../redux-store/Slice'
import axios from 'axios';
import Cookies from 'js-cookie'



const Profile = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const port = import.meta.env.VITE_PORT;


  const Login = useSelector((state) => state.data.Login);
  const name = useSelector((state) => state.data.User.username);

  const logout = async () => {
    dispatch(setLogout());
    try {
      const res = await axios.get(`${port}/logout`,{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // if (res.data.success) {
      //   Cookies.remove('token');
      // }
      // console.log(res.data);
    } catch (error) {
      // console.log("Error in logout", error.message);
    }
  }


  return (
    <>

      <div className="my-28 flex flex-col items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-2xl p-6 max-w-md text-center border-2">
          {
            Login ?
              <img
                src='./login-pro.png'
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto border-4 border-green-500"
              />
              :
              <img
                src='./logout-pro.jpeg'
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto border-4 border-green-500"
              />
          }
          <h1 className="text-2xl font-bold mt-4">Welcome, {Login ? name : "User"} 👋</h1>
          <p className="text-gray-600 mt-2">
            Glad to have you back on our store. Explore your favorite products!
          </p>
        </div>
        <div className="w-[95%] mx-auto mb-5 flex justify-center items-center mt-4 gap-4">
          <button onClick={() => Navigate('/products')} type="button" className="w-40 py-3 active:scale-95 transition text-sm text-white 
          rounded-full bg-green-500 flex items-center justify-center gap-1">
            <p className="mb-0.5">View Products</p>
          </button>
          {
            Login ?
              <button type="button" className="w-40 py-3 active:scale-95 transition text-sm text-white 
          rounded-full bg-red-500 flex items-center justify-center gap-1" onClick={logout}>
                <p className="mb-0.5">Log out</p>
              </button>
              :
              <button type="button" onClick={() => Navigate('/login')} className="w-40 py-3 active:scale-95 transition text-sm text-white 
          rounded-full bg-indigo-500 flex items-center justify-center gap-1">
                <p className="mb-0.5">Log in</p>
              </button>
          }
        </div>
      </div>

    </>
  )
}

export default Profile