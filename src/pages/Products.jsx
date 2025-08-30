import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { addProducts } from '../redux-store/Slice'
import { initCart, addCart } from '../redux-store/Slice'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Products = () => {
  const [count, setCount] = useState(0);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const port = import.meta.env.VITE_PORT;
  const login = useSelector((state) => state.data.Login);
  const user = useSelector((state) => state.data.User);

  const [temp, setTemp] = useState('');
  // console.log(temp)
  const [search, Setsearch] = useState('');

  const product = useSelector((state) => state.data.products) || [];
  const tempproduct = useSelector((state) => state.data.filterProduct) || [];
  const [Bool, setBool] = useState(false);

  // Add to cart functionality

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
      toast.warn("Please Login to Continue");
      // console.log(id);
      dispatch(addCart(id));
      toast.success('Product added to cart successfully');
    }
  }



  const onSearch = () => {
    if (temp.trim()) {
      setBool(true);
      const newtemp = temp.trim();
      const temp2 = product.filter(item => item.name.toLowerCase().includes(newtemp.toLocaleLowerCase()) || item.category.toLowerCase().includes(newtemp.toLocaleLowerCase()))
      // console.log(temp2);
      dispatch(addProducts(temp2));

    } else {
      setBool(false)
    }
  }

  const SearchCheck = (value) => {
    if(!value.trim()) setBool(false);
  }


  // console.log('temp', tempproduct);



  const toProduct = (id) => {
    Navigate(`/product/${id}`);
  }



  return (
    <div className='w-[95%] mx-auto my-10'>
      <div className="w-full mb-5">
        <div className="mr-auto text-3xl font-semibold mb-4">All Products</div>
        <div className="mx-auto flex items-center gap-2 w-[90%] md:mx-auto justify-center">
          <div className="flex items-center gap-3 max-w-md w-full">
            <div className="flex items-center w-full border pl-3 gap-2 bg-white border-gray-500/30 h-[46px] rounded-md overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 30 30" fill="#6B7280">
                <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
              </svg>
              <input type="search" placeholder="Search for products" className="w-full h-full outline-none text-gray-500 placeholder-gray-500 text-sm pr-2"
                onChange={(e) => {
                  setTemp(e.target.value);
                  SearchCheck(e.target.value);
                }} 
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onSearch()
                  // console.log(e.key);
                }}/>
            </div>
            <button type="submit" className="bg-green-500 w-32 h-[46px] rounded-md text-sm text-white" onClick={() => onSearch()}>Search</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 text-center mx-auto">
        {Bool ?
          tempproduct.map((item, i) => (
            <div key={i} className="border border-4 rounded-md md:px-4 px-3 py-2 bg-white">
              <div className="group cursor-pointer flex items-center justify-center px-2 h-[150px] overflow-hidden">
                <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={item.imageOne} alt={item.name}
                  onClick={() => toProduct(item._id)} />

              </div>
              <div className="text-gray-500/60 text-sm">
                <p>{item.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{item.name}</p>
                <div className="flex items-end justify-between mt-3">
                  <p className="md:text-xl text-base font-medium text-green-500">
                   ₹{item.offerPrice} <span className="text-gray-500/60 md:text-sm text-xs line-through">${item.price}</span>
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
          :
          product.map((item, i) => (
            <div key={i} className="border border-4 rounded-md md:px-4 px-3 py-2 bg-white">
              <div className="group cursor-pointer flex items-center justify-center px-2 h-[150px] overflow-hidden">
                <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={item.imageOne} alt={item.name}
                  onClick={() => toProduct(item._id)} />

              </div>
              <div className="text-gray-500/60 text-sm">
                <p>{item.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{item.name}</p>
                <div className="flex items-end justify-between mt-3">
                  <p className="md:text-xl text-base font-medium text-green-500">
                    ₹{item.offerPrice} <span className="text-gray-500/60 md:text-sm text-xs line-through">${item.price}</span>
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
      <ToastContainer />
    </div>
  )
}

export default Products
