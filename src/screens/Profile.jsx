import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
    const [user, setUser] = useState([]);
    const [update, setUpdate] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [form, setForm] = useState(false);
    const basedUrl = 'http://localhost:8000/api/v1/';
    //const basedUrl = 'https://atsdevs.org/DiceBackEnd/public/api/v1/'
    const navigate = useNavigate();
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const getData = async () => {
        try {
            const response = await axios.get(`${basedUrl}user/${id}`);
            setUser(response.data.data);
            setUpdate(response.data.data);
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        getData();
    }, []);

    const updateData = async (id) => {
        try {
            const response = await axios.put(`${basedUrl}user/${id}`, update, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setUser(response.data.data);
            setUpdate(response.data);
            console.log(response.data);
            alert(response.data.message);
        } catch (e) {
            alert(e.response.data.message);
        }
    }
    const updateUser = (e) => {
        e.preventDefault();
        updateData(user.id);
        setForm(!form);
        setUpdate({
            firstName: update.firstName,
            lastName: update.lastName,
            email: update.email,
            password: update.password,
            password_confirmation: update.password_confirmation
        })
    }
    const handleUpdate = (e) => {
        const {name, value} = e.target;
        setUpdate(prevUpdate => ({
            ...prevUpdate, [name]:value
        }));
    }

    const handleForm = (id) => {
        console.log(id);
        setForm(!form);
    }

    const logout = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(`${basedUrl}logout`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Logout successful');
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
        localStorage.removeItem('token');
        localStorage.removeItem('id');
    }

    return (
        <>
            <div className={form ? 'w-[40%] h-[50%] sm:w-[70%] absolute border-2 bg-slate-500 ml-[30%] mt-[13%] sm:ml-[17%]' : 'hidden'}>
                <form onSubmit={updateUser} className='grid gap-5 place-items-center mt-3'>
                    <h1 className='text-2xl font-bold text-white'>Update Profile</h1>
                    <input type="text" name="firstName" value={update.firstName} onChange={handleUpdate} className='pl-3 h-8 w-[50%]'/>
                    <input type="text" name="lastName" value={update.lastName} onChange={handleUpdate} className='pl-3 h-8 w-[50%]'/>
                    <input type="email" name="email" value={update.email} onChange={handleUpdate} className='pl-3 h-8 w-[50%]'/>
                    <input type="password" name="password" onChange={handleUpdate} placeholder="Change Password" className='pl-3 h-8 w-[50%]'/>
                    <input type="password" name="password_confirmation" onChange={handleUpdate} placeholder="Confirm Password" className='pl-3 h-8 w-[50%]'/>
                        <button type="submit" className='border-2 w-20 hover:bg-green-500 text-white'>Update</button>
                        <h1 onClick={handleForm} className='cursor-pointer font-bold text-white hover:text-red-700'>Close</h1>
                </form>
            </div>
            <div className='h-[80%] w-[90%] sm:w-[500px] flex flex-row-reverse mb-10'>
                <div className='flex gap-10 sm:gap-2 sm:mr-5 items-center'>
                    <h1 className='font-bold text-white text-xl'>{user.lastName}, {user.firstName}</h1>
                    <button className='border bg-green-500 rounded-sm h-12 w-28 px-5 font-bold text-white hover:bg-green-400' onClick={() => handleForm(user.id)}>Update</button>
                    <button className='border font-bold text-white bg-red-500 rounded-sm h-12 w-28 hover:bg-red-400' onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </>
    )
}

export default Profile;