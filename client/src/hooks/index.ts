import { useEffect, useState } from "react";
import axios from "axios"

export const backendURL = "http://localhost:3000"
export interface Blogs{
    "content": JSON;
    "title": string;
    "id": number;
    "author": {
        name: string
    }
}

//forGetting singleBlogPost
export const useBlog = ({id}: {id: string}) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [blog, setBlog] = useState()

    useEffect(() => {
        const token = localStorage.getItem("token")
        axios.get(`${backendURL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        })
        .then(response => {
            setBlog(response.data.blog)
            setLoading(false)
        })
    }, [id])

    return {
        loading,
        blog
    }
}


//for getAllBlogs
export const useBlogs = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        axios.get(`${backendURL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response => {
            setBlogs(response.data.blogs)
            setLoading(false)
        })
    }, [])

    return {
        loading, 
        blogs
    }
}
