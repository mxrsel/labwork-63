import React, { useEffect, useState } from 'react';
import axiosApi from "../../axiosApi.ts";

interface Post {
    id: string;
    title: string;
    body: string;
}

const Home: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosApi.get('/posts.json');
                const postsData: { [key: string]: Post } = response.data;
                if (postsData) {
                    const postsArray = Object.keys(postsData).map(key => ({

                        ...postsData[key]
                    }));
                    setPosts(postsArray);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const deletePost = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await axiosApi.delete(`/posts/${id}.json`);
                const updatedPosts = posts.filter(post => post.id !== id);
                setPosts(updatedPosts);
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    return (
        <div>
            <h2>Post List</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        {post.title}
                        <button onClick={() => deletePost(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
