import { useEffect } from "react";
import { useLocation } from "react-router-dom"



const Scroll =()=>{
     const  {pathname } = useLocation();

     useEffect(()=>{
          window.scrollTo({
               top : 0,
               behavior : 'smooth',
               left : 0
          })
          // console.log("Scroll");

          document.querySelector('.main-content')?.scrollTo({
               top : 0,
               left : 0,
               behavior : 'smooth'
          })
          
     },[pathname]);

     return null;
}

export default Scroll