import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeCart } from '../redux-store/Slice'
import axios from 'axios'
import { initCart, setUser } from '../redux-store/Slice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Cart = () => {

  const navigate = useNavigate();
  const products = useSelector((state) => state.data.cart) || [];
  const login = useSelector((state) => state.data.Login) || false;
  const user = useSelector((state) => state?.data?.User ?? []) || [];

  const post = import.meta.env.VITE_PORT;

  const add = user?.address?.[0] || [];

  const [bool, setBool] = useState(false);
  // console.log(bool);

  const dispatch = useDispatch();

  const [address, setAddress] = useState({
    name: add.name,
    street: add.street,
    city: add.city,
    state: add.state,
    country: add.country,
    phone: add.phone,
    email: add.email
  });

  const loadRazorpay = async () => {
    if (!login) return toast.warn("Please login to continue payment");

    if (bool) {
      const res = await axios.post(`${post}/address`, { address, userId: user._id });
      dispatch(setUser(res.data.user));
      setBool(false);
    }


    if (!address.name || !address.street || !address.city || !address.state || !address.country
      || !address.phone || !address.email) {
      return toast.warn('All fields are Required in Delivery Address')
    }

    const { data } = await axios.post(`${post}/create-order`, {
      amount: totalAmount,
      user
    });
    const { order } = data;

    const option = {
      key: 'rzp_test_DSuUrYYaA2xxc8',
      amount: totalAmount * 100,
      currency: 'INR',
      name: 'Farm 2 Home',
      description: 'Transaction',
      order_id: order.id,
      handler: async (response) => {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
        const verifyResponse = await axios.post(`${post}/verifyPayment`, {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature
        });
        const { success, message } = verifyResponse.data;
        console.log(success)
        console.log("Payment verification response:", verifyResponse.data);
        if (success) {
          for (const item of products) {
            await axios.post(`${post}/toOrder`, {
              userId: user._id,
              productId: item.productId,
              quantity: item.quantity
            });
          }

          const users = await axios.post(`${post}/user`, { userId: user._id });
          dispatch(setUser(users.data.user));
          await axios.post(`${post}/emptyCart`, { userId: user._id });
          dispatch(initCart([]));

          alert("Payment Successful");
          // const orders = await axios.post(`${post}/user-orders`, { userId: user._id });
          // // console.log(orders.data.orders.order)
          // dispatch(initOrder(orders.data.orders));

          // await axios.post(`${post}/order`, {userId : user._id});

          navigate('/success', { state: { order_id: razorpay_order_id, payment_id: razorpay_payment_id } });
        } else {
          console.error("Payment verification failed:", message);
          alert("Payment Failed");
          navigate('/failure', { state: { reason: message } });
        }
      },
      prefill: {
        name: address.name,
        email: address.email,
        contact: address.phone
      },
      theme: {
        color: '#22c55e'
      },
    };

    const razorpay = new window.Razorpay(option);
    razorpay.open();
  }


  const toCart = async (productName, quantity) => {

    if (login) {
      const res = await axios.post(`${post}/aiCart`, { productName, userId: user._id, quantity: Number(quantity) });
      console.log(res.data);
      if (res.data.success === true) {
        dispatch(initCart(res.data.cartItem));
        toast.success('Product added to cart successfully');
      } else {
        toast.error('Failed to add product to cart');
      }
      // console.log(res.data);
    } else {
      const res = await axios.post(`${post}/getId`, { productName });
      dispatch(addCartquantity({ id: res.data.id, quantity: Number(quantity) }));
      toast.success('Product added to cart successfully');
    }
  }


  const [showAddressForm, setShowAddressForm] = useState(false);

  const goProduct = () => {
    navigate('/products');
  }

  const [totalAmount, setTotalamount] = useState(0);



  const calculateTotal = () => {
    const total = products.reduce((acc, item) => acc + item.offerPrice * item.quantity, 0);
    setTotalamount(total);
  }

  // Calculate total amount whenever cart items change
  useEffect(() => {
    calculateTotal();
  }, [products]);

  const removeFromCart = async (index, productId) => {
    const res = window.confirm("Are you sure you want to remove this product from the cart?");
    if (login) {
      if (res) {
        dispatch(removeCart(index));
        console.log("Removing product from cart:", productId);
        console.log("User ID:", user._id);
        const response = await axios.post(`${post}/removeCart`, {
          productId: productId,
          userId: user._id
        });


        console.log(response.data);

      }
    } else {
      if (res) dispatch(removeCart(index));

    }
  }

  // const changeQuantity = (value, index) => {
  //   products[index].quantity = value;
  //   console.log(index + 1, products[index].quantity)
  // }
  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className='flex-1 max-w-4xl'>
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart
        </h1>

        {
          products[0] ?
            <>
              <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                <p className="text-left">Product Details</p>
                <p className="text-center">Subtotal</p>
                <p className="text-center">Action</p>
              </div>

              {products.map((product, index) => (
                <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                  <div className="flex items-center md:gap-6 gap-3">
                    <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
                      <img className="max-w-full h-full object-cover p-2" src={product.imageOne} alt={product.name} />
                    </div>
                    <div>
                      <p className="hidden md:block font-semibold">{product.name}</p>
                      <div className="font-normal text-gray-500/70">
                        <div className='flex items-center'>
                          <p> <button className='text-green-500' onClick={() => {
                            console.log(product.quantity);
                            calculateTotal();
                            toCart(product.name, product.quantity);
                            console.log(product.quantity);
                          }}>+</button> Qty: {product.quantity} <button className='text-red-500' onClick={() => {
                            console.log(product.quantity);
                            calculateTotal();
                            toCart(product.name, product.quantity);
                            console.log(product.quantity);
                          }}>-</button></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-center">₹{product.offerPrice * product.quantity}</p>
                  <button className="cursor-pointer mx-auto">
                    <svg width="20" height="20" onClick={() => removeFromCart(index, product.productId)} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              )
              )}
            </>
            :
            <div>No Product Found</div>
        }

        <button className="group cursor-pointer flex items-center mt-8 gap-2 text-green-500 font-medium" onClick={goProduct}>
          Continue Shopping
        </button>

      </div>

      {
        products[0] && (
          <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
            <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
            <hr className="border-gray-300 my-5" />

            <div className="mb-6">
              <p className="text-sm font-medium uppercase">Delivery Address</p>
              <div className="relative flex justify-between items-start mt-2">
                <p className="text-gray-500">
                  {add.name ? (showAddressForm ? "" : add.name) : 'No address found'}
                </p>
                {!showAddressForm && (
                  <button onClick={() => {
                    setShowAddressForm(!showAddressForm);
                    setBool(true);
                  }} className="text-green-500 hover:underline cursor-pointer">
                    Change
                  </button>
                )}
              </div>
              {
                showAddressForm && (
                  <div className="mt-4 space-y-2">
                    <input
                      type="text"
                      placeholder="Name"
                      value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      className="w-full border border-gray-300 px-3 py-2 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      className="w-full border border-gray-300 px-3 py-2 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full border border-gray-300 px-3 py-2 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-full border border-gray-300 px-3 py-2 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      value={address.country}
                      onChange={(e) => setAddress({ ...address, country: e.target.value })}
                      className="w-full border border-gray-300 px-3 py-2 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full border border-gray-300 px-3 py-2 outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={address.email}
                      onChange={(e) => setAddress({ ...address, email: e.target.value })}
                      className="w-full border border-gray-300 px-3 py-2 outline-none"
                    />
                  </div>
                )
              }

              <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

              <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                {/* <option value="COD">Cash On Delivery</option> */}
                <option value="Online">Online Payment</option>
              </select>
            </div>

            <hr className="border-gray-300" />

            <div className="text-gray-500 mt-4 space-y-2">
              <p className="flex justify-between">
                <span>Price</span><span> ₹{totalAmount}</span>
              </p>
              <p className="flex justify-between">
                <span>Shipping Fee</span><span className="text-green-600">Free</span>
              </p>
              <p className="flex justify-between">
                <span>Tax </span><span className="text-green-600">Free</span>
              </p>
              <p className="flex justify-between text-lg font-medium mt-3">
                <span>Total Amount:</span><span> ₹{totalAmount}</span>
              </p>
            </div>

            <button className="w-full py-3 mt-6 cursor-pointer rounded bg-green-500 text-white font-medium hover:bg-green-600 transition"
              onClick={loadRazorpay}>
              Place Order
            </button>
          </div>
        )
      }
      <ToastContainer />
    </div>
  )
}

export default Cart
