import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';

function HomePage() {
    const [post, setPost] = useState({ 
        title: '', 
        content: '',
        date: ''
    });
    const [update, setUpdate] = useState({
        title: '',
        content: ''
    });
    const [data, setData] = useState([]);
    const [close, setClose] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const basedUrl = 'http://localhost:8000/api/v1/';
    //const basedUrl = 'https://atsdevs.org/DiceBackEnd/public/api/v1/'
    const token = localStorage.getItem('token');

    const handleInput = (e) => {
        const { name, value } = e.target;
        setPost(prevInput => ({ ...prevInput, [name]: value }));
    }

    const postData = async () => {
        try {
            const response = await axios.post(`${basedUrl}posts`, post, {
                headers: { 
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }
            });
            console.log(response.data);
            alert(response.data.message);
            setPost({ 
                title: '', 
                content: '',
                date: ''
            });
            setTrigger(!trigger);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postData();
        setPost({ 
            title: '', 
            content: '',
            date: ''
        });
    }

    const getPosts = async () => {
        try {
            const response = await axios.get(`${basedUrl}posts`, {
                headers: { 
                    'Authorization': `Bearer ${token}` 
                }
            });
            console.log(response.data.data);
            setData(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }
    const updateData = async (id) => {
        try {
            const response = await axios.put(`${basedUrl}posts/${id}`, update, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setUpdate(response.data);
            alert(response.data.message);
            setClose(!close);
        }catch(e){
            console.log(e);
        }
    }
    const onUpdate = (e) => {
        e.preventDefault();
        updateData(update.id);
        setTrigger(!trigger);
    }

    const handleUpdate = (e) => {
        const {name, value} = e.target;
        setUpdate(prevUpdate => ({
            ...prevUpdate, [name]:value
        }))
    }

    useEffect(() => {
        getPosts();
        console.log(trigger);
    }, [trigger]);

    const deleteData = async (id) => {
        try{
            const response = await axios.delete(`${basedUrl}posts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data.data.message);
            setTrigger(!trigger);
        }catch(e){
            console.log(e);
        }
    }
    const handleDelete = (id) => {
        deleteData(id);
    }
    const closeBtn= () => {
        setClose(!close);
        setTrigger(!trigger);
    }
    const getData = async (id) => {
        try{
            const response = await axios.get(`${basedUrl}posts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUpdate(response.data.data);
        }catch(e){
            console.error(e)
        }
    }
    const updateBtn = (id) => {
        setClose(!close);
        getData(id);
        console.log(id);
    }
    return (
        <div className='grid'>
            <Profile />
            <div className='flex justify-center items-center w-screen h-[95%]'>
                <div className='border-2 grid place-items-center h-[700px] w-[80%] sm:w-[80%] md:w-[80%] lg:w-[80%] '>
                    <form onSubmit={handleSubmit} className='w-[100%] h-[10%] mt-[-10%] sm:mb-20 md:mb-20 lg:mb-20'>
                        <div className='flex w-full justify-center'>
                            <div className='grid gap-2 w-[45%] mt-10'>
                                <input type="text" name="title" placeholder='Title' className='border-2 pl-2 rounded-lg' value={post.title} onChange={handleInput} />
                                <textarea name="content" placeholder='Content' cols="1" rows="2" className='pl-2 rounded-lg border-2' value={post.content} onChange={handleInput} />
                            </div>
                            <button type="submit" className='border-2 ml-5 w-24 h-18 mt-10 text-white font-bold bg-green-500 hover:bg-green-400
                            md:ml-11'>Post</button>
                        </div>
                    </form>
                    <div className={close ? 'absolute border-2 h-[60%] w-[30%] bg-slate-500 sm:w-[60%] md:w-[50%] lg:w-[40%]' : 'hidden'}>
                        <form onSubmit={onUpdate} className='grid place-items-center h-full'>
                            <input type="text" name="title" placeholder='Title' className='border-2 pl-2 rounded-lg w-64 h-12' value={update.title} onChange={handleUpdate} />
                            <textarea name="content" placeholder='Content' cols="1" rows="2" className='pl-2 rounded-lg border-2 w-64 h-48' value={update.content} onChange={handleUpdate} />
                            <button type="submit" className='border-2 h-14 w-28 rounded-lg text-xl font-bold text-white hover:bg-green-600'>Update</button>
                            <h1 onClick={closeBtn} className='cursor-pointer mt-[-10%] font-bold text-white hover:text-red-700'>Close</h1>
                        </form>
                    </div>
                    <div className='w-[60%] grid max-h-[500px] sm:w-[90%] md:w-[90%] overflow-x-hidden'>
                        {data.map((post, index) => (
                            <div key={index} className='mb-10 grid gap-1 border-2 px-10 py-5 rounded-xl'>
                                <h1 className='text-white black font-bold text-2xl'>{post.title}</h1>
                                <p className='text-whitetext-xl font-bold'>{post.content}</p>
                                <p class='text-slate-700 font-bold text-sm'>{post.date}</p>
                                <div className='flex gap-5 mt-3'>
                                <button onClick={()=>handleDelete(post.id)} className=' bg-red-500 rounded-sm h-8 w-18 px-5 font-bold text-white hover:bg-red-400'>Delete</button><button className=' bg-green-500 rounded-sm h-8 w-18 px-5 font-bold text-white hover:bg-green-400' onClick={() => updateBtn(post.id)}>Update</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
