import React, { useState } from 'react'
import axios from 'axios'
import { setProducts } from '../redux-store/Slice'
import { useDispatch } from 'react-redux'
import { useNavigate} from 'react-router-dom'

const AdminAdd = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [category, setCategory] = useState('');
    const [discription, setdiscription] = useState('');
    const [name, setname] = useState('');
    const [price, setprice] = useState(0);
    const [offerPrice, setoffterPrice] = useState(0);

    var admin = false || sessionStorage.getItem('admin');
    if (!admin) {
        navigate('/admin');
    }

    const port = 'https://farm2home-backend-8013.onrender.com';

    const [Files, setFiles] = useState([]);
    const [Imgfile, setImgfile] = useState([]);


    const addProduct = async (e) => {
        e.preventDefault();
        console.log(name, price, offerPrice, category, discription);
        if (!name.trim() || !price.trim() || !offerPrice.trim() || !category.trim() || !discription.trim() || !Files) {
            alert("All fields are required");
            return;
        }

        const data = {
            name,
            discription,
            price,
            offerPrice,
            category
        }

        const formData = new FormData();
        formData.append('productData', JSON.stringify(data));

        for(let i = 0; i < Files.length; i++){
           formData.append('productImage', Files[i]);
        }

        const res = await axios.post(`${port}/add-product`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        if (res.data.success) {
            dispatch(setProducts(res.data.products))
            navigate('/admin-dash')
        } else {
            console.log(res)
            alert(res.data.message)
        }
    }

    return (
        <>
            {
                admin && (<div className="w-[95%] mx-auto">
                    <div className="py-10 flex flex-col justify-between bg-white md:w-[70%] lg:w-[50%] mx-auto">
                        <form className="md:p-10 p-4 space-y-5" onSubmit={addProduct}>
                            <div>
                                <p className="text-base font-medium">Product Image</p>
                                <div className="flex flex-wrap items-center gap-3 mt-2">
                                    {Array(4).fill('').map((_, index) => (
                                        <label key={index} htmlFor={`image${index}`}>
                                            <input accept="image/*" type="file" id={`image${index}`} hidden
                                                onChange={(e) => {
                                                    setImgfile(e.target.files[0]);
                                                    const updatedFiles = [...Files];
                                                    updatedFiles[index] = e.target.files[0];
                                                    setFiles(updatedFiles);
                                                }} />
                                            <img className=" cursor-pointer" src={
                                                Files[index] ? URL.createObjectURL(Files[index]) :
                                                    "./input.jpeg"} alt="uploadArea" width={100} height={100} />
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                                <input id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border
                                 border-gray-500/40" required value={name} onChange={(e) => setname(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                                <textarea id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 
                                resize-none" placeholder="Type here" value={discription} onChange={(e) => setdiscription(e.target.value)}></textarea>
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <label className="text-base font-medium" htmlFor="category">Category</label>
                                <select id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                                    onChange={(e) => setCategory(e.target.value)} value={category}>
                                    <option value="">Select Category</option>
                                    {[{ name: 'Fruits' }, { name: 'Vegetables' }, { name: 'Dairy' }, { name: 'Bakery' }].map((item, index) => (
                                        <option key={index} value={item.name}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center gap-5 flex-wrap">
                                <div className="flex-1 flex flex-col gap-1 w-32">
                                    <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                                    <input id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                                        required value={price} onChange={(e) => setprice(e.target.value)} />
                                </div>
                                <div className="flex-1 flex flex-col gap-1 w-32">
                                    <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                                    <input id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                                        required value={offerPrice} onChange={(e) => setoffterPrice(e.target.value)} />
                                </div>
                            </div>
                            <button className="px-8 py-2.5 bg-green-500 text-white font-medium rounded" type='submit'>ADD</button>
                        </form>
                    </div>
                </div>)
            }
        </>
    )
}

export default AdminAdd