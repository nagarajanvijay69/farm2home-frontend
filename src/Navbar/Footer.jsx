import { Link } from "react-router-dom"
const Footer = () => {
  return <>
    <footer className='bg-green-100 py-5 px-4' id="footer">
      <div className="hero mb-8">
        <h1 className="text-3xl font-bold text-center mb-4 text-green-500">Farm to Home</h1>
        <p className="text-center mb-4">Fresh groceries and snacks delivered to your door. Trusted by thousands, we make shopping easy and affordable.</p>
      </div>
      <div className="follow mb-8">
        <h1 className="text-xl font-semibold my-1">Follow Us</h1>
        <ul>
          <li><Link className="w-[90px]" to='https://www.linkedin.com/in/nagarajan-dev?utm_source=share&utm_campaign=share_via&utm
          _content=profile&utm_medium=android_app' target="_blank">Linkedin</Link></li>
          <li><Link to='https://x.com/Naga_rajanVijay?t=XQBXoLMUFVpUsB0sFBwL-Q&s=09' target="_blank">Twitter</Link></li>
          <li><Link>Instagram</Link></li>
          <li><Link>Facebook</Link></li>
        </ul>
      </div>
      <div className="quick-links mb-8">
        <h1 className="text-xl font-semibold my-1">Quick Links</h1>
        <ul>
          <Link to='/'><li>Home</li></Link>
          <Link to='/products'><li>Products</li></Link>
          <Link to='/cart'><li>Cart</li></Link>
          <Link to='/contact'><li>Contact</li></Link>
        </ul>
      </div>
      <div className="connect mb-8">
        <h1 className="text-xl font-semibold my-1">Connect</h1>
        <ul>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/signup'>Signup</Link></li>
        </ul>
      </div>
      <div className="support mb-8">
        <h1 className="text-xl font-semibold my-1">Customer Support</h1>
        <ul className="w-[100px]">
          <li>nagarajanvijay69@gmail.com</li>
          <li className="bg-green-500 text-white w-auto h-auto py-1 rounded-lg text-center my-1"><Link to='/contact' className="px-3 py-2">Contact</Link></li>
        </ul>
      </div>
      <div className="copyright py-1">
        <p className="text-center">© 2025 Farm to Home. All rights reserved.</p>
      </div>
    </footer>
  </>
}

export default Footer