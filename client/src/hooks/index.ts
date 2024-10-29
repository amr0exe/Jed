import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"
export const backendurl = "https://jed-tw3l.onrender.com"

export interface Blogs{
    "content": JSON;
    "title": string;
    "id": number;
    "author": {
        name: string
    }
}
export interface Comments{
    "id": number;
    "content": string;
    "blogId": number;
    "userId": number;
    "user": {
        "username": string;
    }
}

//forGetting singleBlogPost
export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const [blog, setBlog] = useState();
    const [comments, setComments] = useState<Comments[]>([]);

    const fetchBlogData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
            return;
        }

        try {
            const response = await axios.get(`${backendurl}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBlog(response.data.blog);
            setComments(response.data.blog["comments"]);
            setLoading(false);
        } catch (err) {
            console.error("error while validating: ", err);
            navigate("/signin");
        }
    };

    useEffect(() => {
        fetchBlogData();
    }, [id]);

    const refetchComments = async () => {
        await fetchBlogData();
    };

    return {
        loading,
        blog,
        comments,
        refetchComments,
    };
};


//for getAllBlogs
export const useBlogs = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(!token) {
            navigate("/signin")
            return
        }

        axios.get(`${backendurl}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setBlogs(response.data.blogs)
            setLoading(false)
        })
        .catch(err => {
            console.error("error while validating: ", err)
            navigate("/signin")
        })
    }, [])

    return {
        loading, 
        blogs
    }
}

//for creatingComment
export const useCreateComment = () => {
    const [commentLoading, setLoading] = useState(false);

    const createComment = async ({ id, content, onSuccess }: { id: number; content: string; onSuccess?: () => void }) => {
        setLoading(true);
        const token = localStorage.getItem("token");

        try {
            await axios.post(`${backendurl}/api/v1/blog/${id}/comment`, { content }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (onSuccess) onSuccess(); // Trigger callback on success
        } catch (err) {
            console.error("Error while creating comment: ", err);
        } finally {
            setLoading(false);
        }
    };

    return { createComment, commentLoading };
};
