import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
function Register() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    
    // const basedUrl = 'http://localhost:8000/api/v1/user';
    const basedUrl = 'https://atsdevs.org/DiceBackEnd/public/api/v1/user'
    const handleInput = (e) => {
        const {name, value} = e.target;
        setUser(prevUser => ({
            ...prevUser, [name]:value
        }));
    }
    const registerUser = async () => {
        try {
            const response = await axios.post(basedUrl, user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
        }catch(e){
            console.error(e);
            alert(e.response.data.message);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        registerUser();
        setUser({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password_confirmation: ''
        })
    }
  return (
    <div className='flex justify-center items-center w-screen h-screen bg-gradient-to-r from-slate-400 to-blue-400'>
        <div className='border-2 h-[330px] w-[30%] 
        sm:w-[80%]
        md:w-[50%]
        lg:w-[50%]'>
            <form onSubmit={handleSubmit} className='grid place-items-center bg-slate-100 h-full w-full bg-gradient-to-r from-slate-400 to-blue-500'>
                <legend className='text-3xl font-bold text-white'>Register</legend>
                    <input type="text" id='firstName' name='firstName' className='border-2 pl-2 h-[40px]' placeholder='First Name' value={user.firstName} onChange={handleInput}/>
                    <input type="text" id='lastName' name='lastName' className='border-2 pl-2 h-[40px]' placeholder='Last Name' value={user.lastName} onChange={handleInput}/>
                    <input type="text" id='email' name='email' className='border-2 pl-2 h-[40px]' placeholder='Email' value={user.email} onChange={handleInput}/>
                    <input type="password" id='password' name='password' className='border-2 pl-2 h-[40px]' placeholder='Password' value={user.password} onChange={handleInput}/>
                    <input type="password" id='password_confirmation' name='password_confirmation' className='border-2 pl-2 h-[40px]' placeholder='Password Confirmation' value={user.password_confirmation} onChange={handleInput}/>
                <button type="submit" className='bg-blue-500 w-48 h-10 text-white font-bold hover:bg-blue-200 hover:text-black'>Register</button>
                <Link to='/' className='hover:text-white'>Login</Link>
            </form>
        </div>
    </div>
  )
}

export default Register