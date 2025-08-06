import { Route, BrowserRouter, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Product from './pages/Product';
import Products from './pages/Products';
import Contact from './pages/Contact';
import AdminLogin from './admin/AdminLogin';
import Login from './signup/Login'
import Cart from './pages/Cart'
import Book from './pages/Book'
import Payment from './pages/Payment'
import PageNotFound from './pages/PageNotFound';
import Root from './Root';
import Signup from './signup/Signup';
import Prod from './pages/Prod';
import Profile from './pages/Profile';
import Password from './signup/Password';
import AdminDash from './admin/AdminDash';
import Success from './pages/Success';
import Failure from './pages/Failure';
import AdminAdd from './admin/AdminAdd';
import AdminPro from './admin/AdminPro';
import MyOrders from './pages/MyOrders'
import { useEffect } from 'react'
import { setProducts } from './redux-store/Slice'
import { useDispatch, useSelector } from 'react-redux'
import { initCart } from './redux-store/Slice'
import axios from 'axios'
import { setLogin, setUser, initOrder, initallorder } from './redux-store/Slice';
import AdminEdit from './admin/AdminEdit';
import Scroll from './pages/Scroll';



const App = () => {


  // axios.defaults.withCredentials = true;

  const port = import.meta.env.VITE_PORT;

  // console.log(`Port: ${port}`);
  

  const data = useSelector((state) => state.data.products);
  const dispatch = useDispatch();
  const login = useSelector((state) => state.data.Login);
  const user = useSelector((state) => state.data.User);
  const orderss = useSelector((state) => state.data.order);
  const admin = sessionStorage.getItem("admin");




  const fetch = async () => {
    // console.log("Fetch")
    const products = await axios.get(`${port}/getproducts`);
    dispatch(setProducts(products.data.products));
  }


  const token = async () => {

    const allorder = await axios.get(`${port}/user-orders`);
    // console.log(allorder.data.users);
    const tempOrders = allorder.data.users
    dispatch(initallorder(tempOrders));

    const res = await axios.get(`${port}/token`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // console.log("Token Response: ", res.data);
    if (res.data.success === true) {
      // console.log("Token fetched successfully");
      dispatch(setLogin());
      dispatch(setUser(res.data.user));
      dispatch(initCart(res.data.user.cart));
    }

  }
  useEffect(() => {
    token();
    fetch();
  }, []);



  return <BrowserRouter>
    <Scroll />
    <Routes>
      <Route path='/' element={<Root />} errorElement={<Error />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='products' element={<Products />} />
        <Route path='product/:id' element={<Product />} />
        <Route path='contact' element={<Contact />} />
        <Route path='order' element={<MyOrders />} />
        <Route path='profile' element={<Profile />} />
        <Route path='cart' element={<Cart />} />
        <Route path='payment' element={<Payment />} />
        <Route path='book' element={<Book />} />
        <Route path='password' element={<Password />} />
        <Route path='success' element={<Success />} />
        <Route path='failure' element={<Failure />} />
        <Route path='prod/:category' element={<Prod />} />
        <Route path='admin' element={<AdminLogin />} />
        <Route path='admin-dash' element={<AdminDash />} />
        <Route path='admin-add-products' element={<AdminAdd />} />
        <Route path='admin-edit-products/:id' element={<AdminEdit />} />
        <Route path='admin-orders' element={<AdminPro />} />
        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>


}

export default App
