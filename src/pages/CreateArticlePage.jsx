import React, { useState, useRef } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const CreateArticlePage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const contentRef = useRef(null);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsUploading(true);
        setMessage('Uploading image...');
        const token = localStorage.getItem('authToken');
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/files/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
            });
            const imageTag = `<img src="${response.data.url}" alt="" style="max-width: 100%; height: auto; border-radius: 8px;" />\n`;
            const { selectionStart } = contentRef.current;
            setContent(prev => prev.substring(0, selectionStart) + imageTag + prev.substring(selectionStart));
            setMessage('Image uploaded and inserted successfully!');
        } catch (err) {
            setMessage('Error uploading image.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        const token = localStorage.getItem('authToken');
        if (!token) {
            setMessage('You are not authorized.');
            return;
        }

        try {
            
            await axios.post(`${import.meta.env.VITE_API_URL}/api/articles`, { title, content }, { headers: { 'Authorization': `Bearer ${token}` } });
            setMessage('Article created successfully!');
            setTitle('');
            setContent('');
        } catch (err) {
            setMessage('Failed to create article.');
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto bg-surface p-6 sm:p-8 rounded-lg">
                <h1 className="text-4xl font-bold text-text-heading mb-8 font-poppins">Create New Article</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-text-body mb-2 text-lg" htmlFor="title">Title</label>
                        <input type="text" id="title" className="w-full px-4 py-2 bg-background rounded text-text-primary text-xl focus:ring-2 focus:ring-highlight focus:outline-none" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-text-body mb-2 text-lg" htmlFor="content">Content (HTML allowed)</label>
                        <textarea ref={contentRef} id="content" className="w-full px-4 py-2 bg-background rounded text-text-primary font-jetbrains h-96" value={content} onChange={(e) => setContent(e.target.value)} />
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <button type="submit" className="w-full sm:w-auto bg-highlight hover:bg-strong text-white font-bold py-3 px-6 rounded text-lg transition-colors">Publish Article</button>
                        <label className="w-full sm:w-auto text-center bg-surface border border-highlight text-highlight hover:bg-highlight hover:text-white font-bold py-3 px-6 rounded text-lg cursor-pointer transition-colors">
                            <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
                        </label>
                    </div>
                    {message && <p className="text-center mt-4 text-strong">{message}</p>}
                </form>
            </div>
        </Layout>
    );
};
export default CreateArticlePage;