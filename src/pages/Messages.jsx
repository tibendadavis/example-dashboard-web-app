import react from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dateFormat from 'dateformat';

const Messages = () => {
    const [msg, setmsg] = useState([])
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

        axios.get("http://localhost:3000/messages/")
            .then(res => {
                setmsg(res.data.Messages)
                console.log(res.data.Messages)
            }
            )
    }, [])


    return !accepted ? (<></>) : (
        <div className=' bg-gray-200 h-full w-fit'>
            <div className=' text-left text-3xl font-sans font-bold p-6 italic text-blue-900'><h1>MESSAGES</h1></div>
            {msg.map((msg, index) => (
                <div className=' bg-gray-300 rounded-xl p-3 m-4'>
                    <h2 className=' font-sans font-bold text-xl text-blue-600'>&nbsp;&nbsp;{index + 1}&nbsp;&nbsp;&nbsp;&nbsp;{msg.email}</h2>
                    <div className=' py-4 px-2 text-justify w-3/4'>&nbsp;&nbsp;{msg.message}</div>
                    <div className=' text-right px-7 text-sm'>{dateFormat((msg.dateCreated), "dddd, mmmm dS, yyyy")}</div>
                    <button className=' bg-blue-900 text-white p-2 rounded-lg' onClick={() => {
                        axios.delete("http://localhost:3000/messages/" + msg.id)
                            .then(res => {
                                axios.get("http://localhost:3000/messages/")
                                    .then(res => {
                                        setmsg(res.data.Messages)
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

export default Messages