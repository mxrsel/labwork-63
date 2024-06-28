import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosApi from "../../axiosApi.ts";
interface EditPostProps {
    postId: string;
}

interface Post {
    id: string;
    title: string;
    body: string;
}

const EditPost: React.FC<EditPostProps> = ({ postId }) => {
    const [post, setPost] = useState<Post | null>(null);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axiosApi.get(`/posts/${postId}.json`);
                setPost(response.data);
                setTitle(response.data.title);
                setBody(response.data.body);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [postId]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axiosApi.put(`/posts/${postId}.json`, { title, body });
            navigate('/');
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Edit Post</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Body:</label>
                    <textarea value={body} onChange={(e) => setBody(e.target.value)} />
                </div>
                <button type="submit">Update Post</button>
            </form>
        </div>
    );
};

export default EditPost;
