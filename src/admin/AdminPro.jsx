import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../redux-store/Slice';

const AdminPro = () => {

  const orders = useSelector((state) => state.data.allorder) || [];
  console.log(orders[0]);
  const port = 'http://localhost:8000';
  const dispatch = useDispatch();


  const changestatus = async (value, index, id) => {
    console.log(value, index, id);
    const res = await axios.post(`${port}/status`, { value, index, id });
    console.log(res);
    dispatch(setUser(res.data.user));
  }


  var admin = false || sessionStorage.getItem('admin');
  if (!admin) {
    navigate('/admin');
  }

  return (
    <>
      {
        admin && (<div className="md:p-10 p-4 space-y-4">
          <h2 className="text-lg font-medium">Orders List</h2>
          {orders?.[0]?.map((order, index) => (
            <div key={index} className="flex flex-col md:grid  md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800">
              <div className="text-sm">
                <p className='font-medium mb-1 text-2xl'>{order?.username?.charAt(0)?.toUpperCase() + order?.username?.slice(1)}</p>
                <p>{order?.address?.[0].name}, {order?.address?.[0].street}, {order?.address?.[0].city}, {order?.address?.[0].state}, {order?.address?.[0].country} </p>
                <p>{order?.address?.[0].phone}</p>
                <p>{order?.address?.[0].email}</p>
              </div>
              <div className="flex gap-5 flex-col">
                {/* <img className="w-12 h-12 object-cover opacity-60" alt="boxIcon" /> */}
                <>
                  {order?.order?.map((item, index) => (
                    <div key={index} className="flex flex-col justify-center ml-8">
                      <p className=" font-medium text-base my-auto text-black text-xl">
                        {item.name}
                      </p>
                      <div className="flex flex-col text-sm">
                        <p>Method: Online</p>
                        <p>Date: {new Date(item.uploadAt).toLocaleString(
                          'en-GB', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        }
                        )}</p>
                        <p>Payment: Paid</p>
                        <p>Status: <select onChange={(e) => changestatus(e.target.value, index, order?._id)}>
                          {
                            item.status == 'Delivered' ? 
                             <>
                             <option value={item.status}>{item.status}</option>
                             <option value="On Going">On Going</option>
                             </>
                              : 
                          <>
                          <option value={item.status}>{item.status}</option>
                          <option value="Delivered">Delivered</option>
                          </>
                          }

                        </select></p>
                        <span className={`text-indigo-700 `}>Quantity : {item.quantity}</span>
                        <p className="font-medium">$2000</p>
                      </div>
                    </div>
                  ))}
                </>
              </div>

            </div>
          ))}
        </div>)
      }
    </>
  )
}

export default AdminPro