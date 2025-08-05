import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Prod = () => {

  const { category } = useParams();
  const navigate = useNavigate();



  const product = useSelector((state) => state.data.products).filter((item) => item.category.toLowerCase() === category.toLowerCase());
  console.log("Product", product);




  const toProduct = (id) => {
    navigate(`/product/${id}`);
  }

  return (
    <div className='w-[95%] mx-auto my-10'>
      <div className="w-full mb-5">
        <div className="mr-auto text-3xl font-semibold mb-4">{category}</div>
        <div className="mx-auto flex items-center gap-2 w-[90%] md:mx-auto justify-center">
          <div className="flex items-center gap-3 max-w-md w-full">
            <div className="flex items-center w-full border pl-3 gap-2 bg-white border-gray-500/30 h-[46px] rounded-md overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 30 30" fill="#6B7280">
                <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
              </svg>
              <input type="text" placeholder="Search for products" className="w-full h-full outline-none text-gray-500 placeholder-gray-500 text-sm" />
            </div>
            <button type="submit" className="bg-green-500 w-32 h-[46px] rounded-md text-sm text-white">Search</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 text-center mx-auto">
        {
          product.length === 0 && <div className="col-span-5 text-center text-gray-500">No products found in this category.</div>
        }
        {
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
                    ${item.offerPrice} <span className="text-gray-500/60 md:text-sm text-xs line-through">${item.price}</span>
                  </p>
                  <div className="text-indigo-500">
                    <button className="flex items-center justify-center gap-1 bg-green-500 md:w-[80px] w-[64px] h-[34px] rounded text-white font-medium" >
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
  )
}

export default Prod