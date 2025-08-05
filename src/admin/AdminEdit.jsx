import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setProducts } from '../redux-store/Slice'
import axios from 'axios'


const AdminEdit = () => {

    const port = 'http://localhost:8000';

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const products = useSelector((state) => state.data.products);

    const product = products.filter((item) => item._id == id);
    console.log(product[0]);
    var admin = false || sessionStorage.getItem('admin');
    if (!admin) {
        navigate('/admin');
    }

    const [Id, setId] = useState(product[0]._id);
    const [category, setCategory] = useState(product[0].category);
    const [discription, setdiscription] = useState(product[0].discription);
    const [name, setname] = useState(product[0].name);
    const [price, setprice] = useState(product[0].price);
    const [offerPrice, setoffterPrice] = useState(product[0].offerPrice);
    const images = [product[0].imageOne, product[0].imageTwo, product[0].imageThree, product[0].imageFour]
    console.log(images);
    

    const update = async (e) => {
        e.preventDefault();
        const res = await axios.put(`${port}/update`, { id: Id, name, category, discription, price, offerPrice });
        const products = res.data.products;
        dispatch(setProducts(products));
        setId('');
        setCategory("");
        setdiscription("");
        setprice("");
        setoffterPrice("");
        navigate('/admin-dash');
    }

    return (
        <>
            {
                admin && (<div className="w-[95%] mx-auto">
                    <div className="py-10 flex flex-col justify-between bg-white md:w-[70%] lg:w-[50%] mx-auto">
                        <form className="md:p-10 p-4 space-y-5" onSubmit={update}>
                            <div>
                                <p className="text-base font-medium">Product Image</p>
                                <div className="flex flex-wrap items-center gap-3 mt-2">
                                    {Array(4).fill('').map((_, index) => (
                                        <label key={index} htmlFor={`image${index}`}>
                                            {/* <input accept="image/*" type="file" id={`image${index}`} hidden
                                                onChange={(e) => {
                                                    setImgfile(e.target.files[0]);
                                                    const updatedFiles = [...Files];
                                                    updatedFiles[index] = e.target.files[0];
                                                    setFiles(updatedFiles);
                                                }} /> */}
                                            <img className=" cursor-pointer" src={
                                                images[index] ? images[index] : "./input.jpeg" } alt="uploadArea" width={100} height={100} />
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                                <input id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                                    required value={name} onChange={(e) => setname(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                                <textarea id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
                                    placeholder="Type here" value={discription} onChange={(e) => setdiscription(e.target.value)}></textarea>
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <label className="text-base font-medium" htmlFor="category">Category</label>
                                <select id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" onChange={(e) => setCategory(e.target.value)}>
                                    <option value={category}>{category}</option>
                                    {[{ name: 'Fruits' }, { name: 'Vegetables' }, { name: 'Dairy' }, { name: 'Bakery' }].map((item, index) => (
                                        <option key={index} value={item.name}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center gap-5 flex-wrap">
                                <div className="flex-1 flex flex-col gap-1 w-32">
                                    <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                                    <input id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                                        value={price} required onChange={(e) => setprice(e.target.value)} />
                                </div>
                                <div className="flex-1 flex flex-col gap-1 w-32">
                                    <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                                    <input id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                                        value={offerPrice} required onChange={(e) => setoffterPrice(e.target.value)} />
                                </div>
                            </div>
                            <button className="px-8 py-2.5 bg-green-500 text-white font-medium rounded" type='submit'>Update</button>
                        </form>
                    </div>
                </div>)
            }
        </>
    )
}

export default AdminEdit