import React, { useEffect } from "react";
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setProducts } from '../redux-store/Slice'

const AdminDash = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const products = useSelector((state) => state.data.products);
    var admin = false || sessionStorage.getItem('admin');
    if (!admin) {
        navigate('/admin');
    }

    const port = 'http://localhost:8000';


    const deleteProduct = async (id) => {
        const response = window.confirm("Are you sure to delete ?")
        if (response) {
            console.log(id)
            const res = await axios.post(`${port}/deleteProduct`, { id });
            dispatch(setProducts(res.data.products));
            if(res.data.success){
                console.log("Deleted Successfully");
            }else{
                console.error(res.data.message)
            }
        }
    }

    const edit = (id) =>{
       navigate(`/admin-edit-products/${id}`);
    }

    return (
        <>
            {
                admin && (
                    <div className="flex-1 py-10 flex flex-col justify-between">
                        <div className="w-[95%] mx-auto mb-5 flex justify-start gap-5">
                            <button type="button" className="w-40 py-3 active:scale-95 transition text-sm text-white 
          rounded-lg bg-green-500 flex items-center justify-center gap-1" onClick={() => navigate('/admin-add-products')}>
                                <p className="mb-0.5">Add Products</p>
                            </button>
                            <button type="button" className="w-40 py-3 active:scale-95 transition text-sm text-white 
          rounded-lg bg-green-500 flex items-center justify-center gap-1" onClick={() => navigate('/admin-orders')}>
                                <p className="mb-0.5">Orders</p>
                            </button>
                        </div>
                        <div className="w-full md:p-10 p-4">
                            <h2 className="pb-4 text-lg font-medium">All Products</h2>
                            <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
                                <table className="md:table-auto table-fixed w-full overflow-hidden">
                                    <thead className="text-gray-900 text-sm text-left">
                                        <tr>
                                            <th className="px-4 py-3 font-semibold truncate">Product</th>
                                            <th className="px-4 py-3 font-semibold truncate">Category</th>
                                            <th className="px-4 py-3 font-semibold truncate hidden md:block">Selling Price</th>
                                            <th className="px-4 py-3 font-semibold truncate">Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm text-gray-500">
                                        {products?.map((product, index) => (
                                            <tr key={index} className="border-t border-gray-500/20">
                                                <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                                                    <div className="border border-gray-300 rounded p-2">
                                                        <img src={product.imageOne} alt="Product" className="w-16" />
                                                    </div>
                                                    <span className="truncate max-sm:hidden w-full">{product.name}</span>
                                                </td>
                                                <td className="px-4 py-3">{product.category}</td>
                                                <td className="px-4 py-3 max-sm:hidden">${product.offerPrice}</td>
                                                <td className="px-4 py-3">
                                                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                                                        {/* <input type="checkbox" className="sr-only peer" defaultChecked={product.inStock} /> */}
                                                        {/* <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div> */}
                                                        {/* <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span> */}
                                                        <button className='bg-green-800 text-white px-3 py-1 text-lg rounded' onClick={() => edit(product._id)}>E</button>
                                                        <button className='bg-red-800 text-white px-3 py-1 text-lg rounded' onClick={() => deleteProduct(product._id)}>D</button>
                                                    </label>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default AdminDash