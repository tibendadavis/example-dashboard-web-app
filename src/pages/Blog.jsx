import react from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Blog = () => {
    const [blogs, setblogs] = useState([])
    const nav = useNavigate();
    const [accepted, setaccepted] = useState(false);

    useEffect(() => {
        if (!window.sessionStorage.getItem('auth-token')) {
            console.log('no auth token set');
            nav("/");
        } else {
            const authToken = '123456abcdef';
            if (window.sessionStorage.getItem('auth-token') == authToken) {
                console.log('good token. Log in.')
                //do something like redirect to todo page
                setaccepted(true)
            } else {
                console.log('bad token.')
                nav("/");
            }
        }

        axios.get("http://localhost:3000/reviews")
            .then(res => {
                setblogs(res.data.reviews)
            }
            )
    }, [])

    return !accepted ? (<></>) : (
        <div className=' bg-gray-200 h-full w-screen'>
            <div className=' text-left text-3xl font-sans font-bold p-6 italic text-blue-900'><h1>BLOG LIST</h1></div>
            {blogs.map((blog, index) => (
                <div className=' bg-gray-300 rounded-xl p-3 m-4'>
                    <h2 className=' font-sans font-bold text-xl text-blue-600'>&nbsp;&nbsp;{index + 1}&nbsp;&nbsp;&nbsp;{blog.title}</h2>
                    <div className=' p-4 w-3/4'>&nbsp;&nbsp;&nbsp;&nbsp;{blog.description}</div>
                    <div className=' text-right px-7 text-sm'>{blog.dateCreated}</div>
                    <button className=' bg-blue-900 text-white p-2 rounded-lg' onClick={() => {
                        axios.delete("http://localhost:3000/reviews/" + blog.id)
                            .then(res => {
                                axios.get("http://localhost:3000/reviews")
                                    .then(res => {
                                        setblogs(res.data.reviews)
                                    }
                                    )
                            }
                            )
                    }}>Delete</button>
                </div>
            ))}
        </div>
    )

}

export default Blog