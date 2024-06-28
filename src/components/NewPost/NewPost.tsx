// src/components/NewPost.tsx
import React, { useState } from 'react';
import axiosApi from "../../axiosApi.ts";
const NewPost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const postData = {
            title,
            body,
            createdAt: new Date().toISOString()
        };
        try {
            await axiosApi.post('/posts.json', postData);
            // Дополнительные действия после успешной отправки данных
            setTitle('');
            setBody('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div>
            <h2>Add New Post</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <br />
                <label>Body:</label>
                <textarea value={body} onChange={(e) => setBody(e.target.value)} required></textarea>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default NewPost;
