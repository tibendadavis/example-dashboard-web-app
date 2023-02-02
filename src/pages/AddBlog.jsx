import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
    const [title, settitle] = useState()
    const [description, setdescription] = useState()
    const [img, setimg] = useState([])
    const [newBlog, setnewBlog] = useState(" ")
    const [accepted, setaccepted] = useState(false)
    const nav = useNavigate();

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
    }, []);


    // // const carImages = new FormData();
    // // [...images].forEach(file =>{
    // //     carImages.append("images", file)
    // // })
    // // //console.log(carImages)

    const handleChange1 = (e) => {
        settitle(e.target.value)
    }
    const handleChange2 = (e) => {
        setdescription(e.target.value)
    }
    const handleChange3 = (e) => {
        setimg(e.target.files)
        const blog = {
            title: title,
            description: description
        }
        //console.log(blog);
        axios.post("http://localhost:3000/reviews", blog)
            .then(res => {
                setnewBlog(res.data.newReview)
                //console.log(newBlog);
            })
    }

    const handleSubmit = (e) => {
        //    e.preventDefault();

        //console.log(newBlog);
        const blogimg = new FormData();
        [...img].forEach(file => {
            blogimg.append("image", file);
            blogimg.append("reviewid", newBlog.id);
        })
        const bg = {
            image: blogimg.get("image"),
            reviewid: blogimg.get("reviewid")
        }
        axios.post("http://localhost:3000/blogimg/uploads", bg,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(res => {
                //console.log(res)
                alert(
                    'Blog added Succesfully'
                )
            })

        // axios.post("http://localhost:3000/reviews",blog )
        // .then(res =>{
        //     console.log(res);
        // }
        // )
    }





    return !accepted ? (<></>) : (
        <div className=" w-screen h-fit">
            <h2 className=" m-3 font-bold text-2xl text-blue-900">Add Blog</h2>
            <form onSubmit={handleSubmit}>
                <div className=" p-5">
                    <div>
                        <tr className=" font-sans font-semibold text-xl">TITLE: <input className=" p-3" type="text" value={title} onChange={handleChange1} required /></tr>
                        <tr className=" font-sans font-semibold p-2 text-xl">DESCRIPITION: </tr><textarea
                            rows="15"
                            className=" w-2/4 p-2"
                            value={description}
                            onChange={handleChange2}
                            required
                        ></textarea>

                    </div>
                    <div>
                        <tr className=" font-sans font-semibold text-lg">IMAGE: <input onChange={handleChange3} type="file" accept=".jpg,.png,.jpeg" required /></tr>
                    </div>
                </div>
                <button type="submit" onSubmit={handleSubmit} className=" bg-blue-900 text-white rounded p-2 mx-8
                    "> POST BLOG</button>
            </form>
        </div>
    )

}

export default AddBlog;