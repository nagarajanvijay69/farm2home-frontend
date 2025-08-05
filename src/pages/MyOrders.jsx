import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

const Myorders = () => {
     
     const port = 'https://farm2home-backend-8013.onrender.com';

     const user = useSelector((state)=> state?.data?.User ?? []);

     // const login = useSelector((state)=> state?.data?.Login ?? false);
     const order = user?.order ?? [] 
     const navigate = useNavigate();


     return (
          <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
               <div className='flex-1 max-w-4xl'>
                    <h1 className="text-3xl font-medium mb-6">
                         My Orders
                    </h1>
                    {
                         order[0]?
                              <>
                                   <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                                        <p className="text-left">Product Details</p>
                                        <p className="text-center">Payment</p>
                                        <p className="text-center">Status</p>
                                   </div>

                                   {order.map((product, index) => (
                                        <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                                             <div className="flex items-center md:gap-6 gap-3">
                                                  <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
                                                       <img className="max-w-full h-full object-cover p-2" src={product.imageOne} alt={product.name} />
                                                  </div>
                                                  <div>
                                                       <p className="hidden md:block font-semibold text-black">{product.name}</p>
                                                       <div className="font-normal text-gray-500/70">
                                                            <div className='flex items-center text-black'>
                                                                 <p>Qty: {product.quantity}</p>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                             <p className="text-center text-black">{product.payment}</p>
                                             <button className="cursor-pointer mx-auto text-black">
                                                  {product.status}
                                             </button>
                                        </div>
                                   )
                                   )}
                              </>
                              :
                              <div>No Orders Found</div>
                    }
                    <button className="group cursor-pointer flex items-center mt-8 gap-2 text-green-500 font-medium"
                    onClick={()=> navigate('/products')} >
                         Continue Shopping
                    </button>
               </div>
          </div>
     )
}

export default Myorders
