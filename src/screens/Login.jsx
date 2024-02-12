import axios from 'axios';
import React, { useState, useContext } from 'react'
import { Link, useNavigate,  } from 'react-router-dom';

function Login() {
    const [isAuth, setAuth] = useState(false);
    const [login, setLogin] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const basedUrl = 'http://localhost:8000/api/v1/login';
    // const basedUrl = 'https://atsdevs.org/DiceBackEnd/public/api/v1/login'
    const loginForm = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(basedUrl, login, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const access = response.data.token;
            const id = response.data.data.id;
            localStorage.setItem('id', id);
            localStorage.setItem('token', access);
            setAuth(!isAuth);
            alert(response.data.message);
            navigate('/home');
        }catch(e){
            alert(e.response.data.message);
        }
    }

    const handleInput = (e) => {
        const {name, value} = e.target;
        setLogin(prevLogin => ({
            ...prevLogin, [name]: value
        }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        loginForm();
    }
  return (
    <div className='flex justify-center items-center w-screen h-screen '>
        <div className='border-2 h-[330px] w-[30%] flex
        sm:w-[80%]
        md:w-[50%]
        lg:w-[50%]'>
            <form onSubmit={handleSubmit} className='grid place-items-center bg-slate-100 h-full w-full bg-gradient-to-r from-slate-400 to-blue-500'>
                <legend className='text-3xl font-bold text-white'>Login</legend>
                    <input type="text" id='email' name='email' className='border-2 pl-2 h-[40px]' placeholder='Email' value={login.email} onChange={handleInput}/>
                    <input type="password" id='password' name='password' className='border-2 pl-2 h-[40px]' placeholder='Password' value={login.password} onChange={handleInput}/>
                <button type="submit" className='bg-blue-500 w-48 h-10 text-white font-bold hover:bg-blue-200 hover:text-black'>Login</button>
                <Link to='/register' className='hover:text-white'>Sign Up</Link>
            </form>
        </div>
    </div>
  )
}

export default Login