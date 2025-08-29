import { use, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setPrompt } from '../redux-store/Slice'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { initCart, addCartquantity } from '../redux-store/Slice'
import { useNavigate } from 'react-router-dom'

const Chat = () => {

  const [icon, setIcon] = useState(true);
  const [chat, setChat] = useState(false);
  const [load, setLoad] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [temp1, setTemp1] = useState("");
  const port = import.meta.env.VITE_PORT;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.data.User);
  const login = useSelector((state) => state.data.Login);

   // Adding products into cart Though Leo AI 

   const toCart = async (productName, quantity) => {
    if (login) {
      const res = await axios.post(`${port}/aiCart`, { productName, userId: user._id, quantity : Number(quantity) });
      console.log(res.data);
      if (res.data.success === true) {
        dispatch(initCart(res.data.cartItem));
        toast.success('Product added to cart successfully');
      } else {
       toast.error('Failed to add product to cart');
      }
      // console.log(res.data);
    } else {
      const res = await axios.post(`${port}/getId`, { productName });
      dispatch(addCartquantity({ id: res.data.id, quantity : Number(quantity) }));
      toast.success('Product added to cart successfully');
    }
  }


  const handleIconClick = () => {
    setIcon(false);
    setChat(true);
  }

  useEffect(() => {
    setQuestion("How can you help me ?");
    setAnswer("I can help you by answering questions about Farm2Home products, their prices, and details. I can also help you navigate the Farm2Home website, add items to your cart, and provide general information about the site");
  }, [])


  const prompt = useSelector((state) => state.data.prompt);

  const checkLoading = async () => {
    if (!temp1.trim()) return toast.warn("Enter Your Query !!");
    console.log(prompt);
    setLoad(true);
    setQuestion(temp1);
    setTemp1("");
    const res = await axios.post(`${port}/query`, { query: prompt });
    console.log(res.data.answer);
    if (res.data.answer.includes('navigate-')) {
      const url = res.data.answer.split('navigate-')[1];
      console.log(url);
      handleChatClick();
      if (url === 'home') {
        navigate('/');
        setAnswer(`Navigated to ${url} page`);
        setLoad(false);
      } else {
        navigate(`/${url}`);
        setAnswer(`Navigated to ${url} page`);
        setLoad(false);
      }
      return;
    }

    if (res.data.answer.includes('cart-')) {
      const productName = res.data.answer.split('cart-')[1].split('-')[0];
      const quantity = res.data.answer.split('cart-')[1].split('-')[1];
      console.log(productName, quantity);
      handleChatClick();
      setAnswer(`Added ${quantity} of ${productName} to cart`);
      toCart(productName, quantity);
      setLoad(false);
      navigate('/cart');
      return;
    }

    setAnswer(res.data.answer);
    setLoad(false);
  }

  const handleChatClick = () => {
    setChat(false);
    setIcon(true);
  }
  const handleChat = (e) => {
    e.stopPropagation();
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') checkLoading();
  }

  const result = <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>;

  return (
    <>
      {
        icon && <div className="icon w-[99dvw] fixed flex z-10" >
          <img src="./bot.png" className="size-[60px] fixed  right-[25px] md:right-[30px] bottom-[5%] cursor-pointer" onClick={handleIconClick} />
        </div>
      }
      {
        chat && <div className="w-[99dvw] h-[99dvh] fixed flex z-10 justify-center items-center mb-[5dvh] " onClick={handleChatClick}>
          <div className="chat-cointainer bg-white h-[87%] w-[85%] flex flex-col z-12 rounded border-4 border-gray-500 mb-16 relative md:mb-20"
            onClick={(e) => handleChat(e)}>
            <div className=" bg-green-400 h-[50px] w-auto">
              <img src="./cancel.svg" className="size-[35px] m-1.5 cursor-pointer" onClick={handleChatClick} />
            </div>
            <div className="my-4 text-xl mx-3 flex flex-col h-[100%]">
              <div className="my-3 text-right mr-4 font-semibold" style={{ animationDelay: '0.3s' }} >{question}</div>
              <div className="my-4 overflow-hidden max-h-[70%] z-13  overflow-y-scroll">
                {load ? <div className="text-res loading">
                  <span>L</span>
                  <span>o</span>
                  <span>a</span>
                  <span>d</span>
                  <span>i</span>
                  <span>n</span>
                  <span>g</span>
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div> : result}
              </div>
            </div>
            <div className="bg-green-400 w-[100%] absolute bottom-0 h-14 flex justify-center items-center">
              <input type="text" value={temp1} onChange={(e) => {
                setTemp1(e.target.value);
                dispatch(setPrompt(e.target.value));
              }} onKeyDown={handleKey} className="h-9 rounded-xl w-[80%] pl-4 mr-1 px-2 md:px-3 lg:px-5 focus:outline-none" placeholder="Enter your query..." />
              <img src="./arrow.svg" className="size-[40px] lg:size-[43px] ml-1 lg:mx-3 cursor-pointer" onClick={checkLoading} />
            </div>
          </div>
        </div>
      }
      <ToastContainer />
    </>
  )
}

export default Chat