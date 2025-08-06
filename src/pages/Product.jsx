import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initCart, addCart } from '../redux-store/Slice'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Product = () => {
  const { id } = useParams();
  const item = useSelector((state) => state.data.products)
  const dispatch = useDispatch();
  const login = useSelector((state) => state.data.Login)
  const port = import.meta.env.VITE_PORT || 'http://localhost:8000';
  const user = useSelector((state)=> state.data.User)
  const navigate = useNavigate();




  const prod = item.filter(product => product._id == id);
  const product = prod[0];

  const addToCart = async (id) => {
    if (login) {
      const res = await axios.post(`${port}/addCart`, { productId: id, userId: user._id });

      // console.log(res.data);
      if (res.data.success === true) {
        dispatch(initCart(res.data.cartItem));
        toast.success('Product added to cart successfully');
      } else {
        toast.error('Failed to add product to cart');
      }
      // console.log(res.data);
    } else {
      toast.warn("Please Login to save data");
      console.log(id);
      dispatch(addCart(id));
      toast.success('Product added to cart successfully');
    }
  }


 const buyNow =(id)=>{
   addToCart(id);
   navigate('/cart')
 }



  const [thumbnail, setThumbnail] = useState(product.imageOne);

  // Relaated products

  const [count, setCount] = useState(0);



  return product && (
    <div className="max-w-6xl w-[95%] px-6 mx-auto my-16">
      <p className="text-4xl font-semibold mb-6" >Product</p>
      <div className="flex flex-col md:flex-row gap-16 mt-4 mb-12">
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            <div className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
              <img src={product.imageOne} onClick={() => setThumbnail(product.imageOne)} />
            </div>
            {
              product.imageTwo ?
                <div className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                  <img src={product.imageTwo} onClick={() => setThumbnail(product.imageTwo)} />
                </div>
                : null
            }

            {
              product.imageThree ?
                <div className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                  <img src={product.imageThree} onClick={() => setThumbnail(product.imageThree)} />
                </div>
                : null
            }

            {
              product.imageFour ?
                <div className="border border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                  <img src={product.imageFour} onClick={() => setThumbnail(product.imageFour)} />
                </div>
                : null
            }
          </div>

          <div className="border border-gray-500/30 w-[400px]  h-[400px] rounded overflow-hidden flex items-center justify-center">
            <img alt="Selected product" src={thumbnail} className='h-[250px] w-[250px]' />
          </div>
        </div>

        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>


          <div className="mt-6">
            <p className="text-gray-500/70 line-through">MRP: ${product.price}</p>
            <p className="text-2xl font-medium">MRP: ${product.offerPrice}</p>
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            <li >{product.discription}</li>
            <li>Fresh Items</li>
            <li>No.1 Quality</li>
          </ul>

          <div className="flex items-center mt-10 gap-4 text-base">
            <button className="w-full py-3.5 border-gray-300 border-2 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
              onClick={() => addToCart(product._id)} >
              Add to Cart
            </button>
            <button className="w-full py-3.5 cursor-pointer font-medium bg-green-500 text-white hover:bg-green-600 transition"
            onClick={()=> buyNow(product._id)} >
              Buy now
            </button>
          </div>
        </div>
      </div>
      {/* Related Product */}

      {/* <div className="">
        <p className='text-2xl font-semibold mb-4'>Related Products</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 text-center mx-auto">
          <div className="border border-4 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
            <div className="group cursor-pointer flex items-center justify-center px-2">
              <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={product1.image} alt={product1.name} />
            </div>
            <div className="text-gray-500/60 text-sm">
              <p>{product.category}</p>
              <p className="text-gray-700 font-medium text-lg truncate w-full">{product1.name}</p>
              <div className="flex items-center gap-0.5">
                {Array(5).fill('').map((_, i) => (
                  product1.rating > i ? (
                    <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z" fill="#22C55E" />
                    </svg>
                  ) : (
                    <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z" fill="#22C55E" fillOpacity="0.35" />
                    </svg>
                  )
                ))}
                <p>({product1.rating})</p>
              </div>
              <div className="flex items-end justify-between mt-3">
                <p className="md:text-xl text-base font-medium text-green-500">
                  ${product1.offerPrice} <span className="text-gray-500/60 md:text-sm text-xs line-through">${product1.price}</span>
                </p>
                <div className="text-indigo-500">
                  {count === 0 ? (
                    <button className="flex items-center justify-center gap-1 bg-green-100 border border-green-300 md:w-[80px] w-[64px] h-[34px] rounded text-green-600 font-medium" onClick={() => setCount(1)} >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#22C55E" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Add
                    </button>
                  ) : (
                    <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-green-500/25 rounded select-none">
                      <button onClick={() => setCount((prev) => Math.max(prev - 1, 0))} className="cursor-pointer text-md px-2 h-full" >
                        -
                      </button>
                      <span className="w-5 text-center text-green-500">{count}</span>
                      <button onClick={() => setCount((prev) => prev + 1)} className="cursor-pointer text-md px-2 h-full" >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <ToastContainer />
    </div>
  );
}

export default Product