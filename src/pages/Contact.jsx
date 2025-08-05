import React, { useState } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Contact = () => {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Message, setMessage] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!Name.trim() || !Email.trim() || !Message.trim()) return toast.warn("Fill all Fields");
        const formData = new FormData(event.target);

        formData.append("access_key", "028500d6-64b1-4cb7-815a-efcea1540594");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });
        setName("");
        setEmail("");
        setMessage("");

        const data = await response.json();

        if (data.success) {
            event.target.reset();
            toast.success('Message Send Successfully');
        }
    }
    return (
        <>
            <form className="flex flex-col items-center text-sm text-slate-800 my-16" onSubmit={onSubmit}>
                <p className="text-xs bg-green-200 text-green-600 font-medium px-3 py-1 rounded-full">Contact Us</p>
                <h1 className="text-4xl font-bold py-4 text-center">Let’s Get In Touch</h1>

                <div className="max-w-96 w-full px-4 my-4">
                    <label htmlFor="name" className="font-medium">Full Name</label>
                    <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus:outline-none transition-all overflow-hidden">
                        <input type="text" name='name' className="h-full px-2 w-full outline-none bg-transparent" placeholder="Enter your full name"
                            required value={Name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <label htmlFor="email-address" className="font-medium mt-4">Email Address</label>
                    <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus:outline-none transition-all overflow-hidden">
                        <input type="email" name='email' className="h-full px-2 w-full outline-none bg-transparent" placeholder="Enter your email address"
                            required value={Email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <label htmlFor="message" className="font-medium mt-4">Message</label>
                    <textarea rows="4" name='message' className="w-full mt-2 p-2 bg-transparent border border-slate-300 rounded-lg resize-none outline-none  transition-all"
                        placeholder="Enter your message" required value={Message} onChange={(e) => setMessage(e.target.value)}></textarea>

                    <button type="submit" className="flex items-center justify-center gap-1 mt-5 bg-green-500 hover:bg-green-600 text-white py-2.5 w-full rounded-full transition">
                        Submit Form
                    </button>
                </div>
            </form>
            <ToastContainer />

        </>
    )
}

export default Contact