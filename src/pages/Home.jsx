import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { initCart, addCart } from '../redux-store/Slice'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Home = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.data.User);
  const port = import.meta.env.VITE_PORT || 'http://localhost:8000';
  const login = useSelector((state) => state.data.Login);


  const addToCart = async (id) => {
    if (login) {
      const res = await axios.post(`${port}/addCart`, { productId: id, userId: user._id });

      console.log(res.data);
      if (res.data.success === true) {
        dispatch(initCart(res.data.cartItem));
        toast.success('Product added to cart successfully');
      } else {
       toast.error('Failed to add product to cart');
      }
      // console.log(res.data);
    } else {
      console.log(id);
      toast.warn("Please Login to save data");
      dispatch(addCart(id));
      toast.success('Product added to cart successfully');
    }
  }

  const toProduct = (id) => {
    navigate(`/product/${id}`);
  }

  const products = useSelector((state) => state.data.products).slice(0, 5) || [];


  return (
    <>
      <div className='w-full z-5 scrollbar-hide '>
        <div className="w-full relative z-5 w-full">
          <img src="./bg-mg.png" className='md:hidden rounded-xl my-10 mx-auto w-[90%] z-0' />
          <img src="./bg-pc.png" className='hidden md:block rounded-xl my-10 mx-auto w-[95%] z-0' />
          {/* mobile */}
          <div className="absolute top-[68%] left-[10%] md:hidden w-[80%] ">
            <p className='text-2xl mb-[40px]  sm:text-3xl'>Fresh Fruits and Veggies You Can Trust,
              Prices You'll Absolutely Love!</p>
            <Link to='/products' className='bg-green-500 text-white rounded-lg px-5 py-3 sm:px-7 sm:py-4'>Shop Now </Link>
          </div>
          {/* desktop */}
          <div className="absolute top-[33%] left-[40%] lg:left-[43%] hidden md:block w-full 2xl:left-[45%]">
            <p className=' mb-[40px] text-2xl lg:text-3xl'>Fresh Fruits and Veggies You Can Trust,<br />
              Prices You'll Absolutely Love!</p>
            <Link to='/products' className='bg-green-500 text-white rounded-lg px-5 py-3'>Shop Now </Link>
          </div>
        </div>
        <div className="w-[95%] mx-auto my-10">
          <p className='text-3xl mb-4'>Categories</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            <Link to='/prod/Fruit' className='bg-green-200 shadow-md rounded-lg p-4 flex flex-col items-center'>
              <img src="./fruit.png" alt="Fruits" className='h-[150px] w-auto object-cover rounded-md mb-5' />
              <span className='font-semibold'>Fruits</span>
            </Link>
            <Link to='/prod/Vegetable' className='bg-green-200 shadow-md rounded-lg p-4 flex flex-col justify-center items-center'>
              <img src="./veg.png" alt="Vegetables" className='h-[150px] w-auto object-cover rounded-md mt-1 mb-5' />
              <span className='font-semibold'>Vegetables</span>
            </Link>
            <Link to='/prod/Dairy' className='bg-green-200 shadow-md rounded-lg p-4 flex flex-col items-center'>
              <img src="./milk.png" alt="Dairy" className='h-[150px] w-auto object-cover rounded-md mt-1 mb-5' />
              <span className='font-semibold'>Dairy</span>
            </Link>
            <Link to='/prod/Bakery' className='bg-green-200 shadow-md rounded-lg p-4 flex flex-col items-center'>
              <img src="./bread.png" alt="Bakery" className='h-[150px] w-auto object-cover rounded-md mt-1 mb-5' />
              <span className='font-semibold'>Bakery</span>
            </Link>
          </div>
        </div>

        {
          products[0] ?
            <div className="cards w-[95%] mx-auto my-2 mb-8">
              <p className='text-3xl mb-4'>Popular Products</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 text-center mx-auto">
                {
                  products.map((item, index) => (
                    <div key={index} className="border border-4 rounded-md md:px-4 px-3 py-2 bg-white">
                      <div className="group cursor-pointer flex items-center justify-center px-2 h-[150px] overflow-hidden">
                        <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={item.imageOne} alt={item.name} onClick={() => toProduct(item._id)} />
                      </div>
                      <div className="text-gray-500/60 text-sm">
                        <p>{item.category}</p>
                        <p className="text-gray-700 font-medium text-lg truncate w-full">{item.name}</p>
                        <div className="flex items-end justify-between mt-3">
                          <p className="md:text-xl text-base font-medium text-green-500">
                            ${item.offerPrice} <span className="text-gray-500/60 md:text-sm text-xs line-through">${item.price}</span>
                          </p>
                          <div className="text-indigo-500">
                            <button className="flex items-center justify-center gap-1 bg-green-500 md:w-[80px] w-[64px] h-[34px] rounded text-white font-medium"
                              onClick={() => addToCart(item._id)} >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            :
            null
        }
        <div className="w-[95%] mx-auto mb-5">
          <button onClick={() => navigate('/products')} type="button" className="w-40 py-3 active:scale-95 transition text-sm text-white 
          rounded-full bg-green-500 flex items-center justify-center gap-1">
            <p className="mb-0.5">View Products</p>
          </button>
        </div>
        <div className='w-[95%] mx-auto my-10 relative bg-green-100 rounded-lg h-auto'>
          <p className='text-3xl text-center text-green-800 font-bold my-4 pt-4'>Why Choose Us</p>
          <div className=" flex w-full bg-green-100">
            <div className="flex flex-col bg-green-100">
              <div className="px-3 py-1  flex items-center gap-3 bg-green-100">
                <img src="./quality.svg" className='bg-green-500 h-14 rounded-xl p-2 mx-3 my-2' />
                <div className="bg-green-100">
                  <h3 className='text-xl font-semibold'>Quality Assurance</h3>
                  <p className=''>We ensure the highest quality standards for all our products.</p>
                </div>
              </div>
              <div className="px-3 py-1 flex items-center gap-2">
                <img src="./price.svg" className='bg-green-500 h-14 rounded-xl p-2 mx-3 my-2' />
                <div className="">
                  <h3 className='text-xl font-semibold'>Affordable Prices</h3>
                  <p className=''>Get the best value for your money with our competitive pricing.</p>
                </div>
              </div>
              <div className="px-3 py-1 flex items-center gap-2 mb-12">
                <img src="./delivery.svg" className='bg-green-500 h-14 rounded-xl p-2 mx-3 my-2' />
                <div className="">
                  <h3 className='text-xl font-semibold'>Fast Delivery</h3>
                  <p className=''>Enjoy quick and reliable delivery right to your doorstep.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Home