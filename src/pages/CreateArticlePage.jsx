import React, { useState, useRef } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import ReactMarkdown from 'react-markdown'; 
import remarkGfm from 'remark-gfm'; 
import CodeBlock from '../components/CodeBlock';
import rehypeRaw from 'rehype-raw';


const CreateArticlePage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [previewUrlMap, setPreviewUrlMap] = useState({});
    const contentRef = useRef(null);
    

const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setMessage('Uploading file...');
    const token = localStorage.getItem('authToken');
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/files/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
            });

            setPreviewUrlMap(prevMap => ({
                ...prevMap,
                [response.data.objectName]: response.data.previewUrl
            }));

            let mediaTag;
            if (file.type.startsWith('image/')) {
                mediaTag = `![Image](gcs://${response.data.objectName})\n`;
            } else if (file.type.startsWith('video/')) {
                mediaTag = `<gcs-video name="${response.data.objectName}"></gcs-video>\n`;
            } else {
                setMessage('Unsupported file type.');
                setIsUploading(false);
                return;
            }

        const { selectionStart } = contentRef.current;
        setContent(prev => prev.substring(0, selectionStart) + mediaTag + prev.substring(selectionStart));
        setMessage('File uploaded and inserted successfully!');
    } catch (err) {
        setMessage('Error uploading file.');
    } finally {
        setIsUploading(false);
    }
};

const customComponents = {
        ...CodeBlock, 
        "gcs-video": ({ node, ...props }) => {
            const objectName = props.name;
            const url = previewUrlMap[objectName];
            if (url) {
                // If we have a preview URL, render a real video tag
                return <video controls src={url} width="100%"></video>;
            }
            // Otherwise, show the placeholder tag
            return <code>{`<gcs-video name="${objectName}"></gcs-video>`}</code>;
        },
        "img": ({ node, ...props }) => {
            if (props.src.startsWith('gcs://')) {
                const objectName = props.src.substring(6);
                const url = previewUrlMap[objectName];
                if (url) {
                    return <img src={url} alt={props.alt} />;
                }
                return <code>{`![${props.alt}](${props.src})`}</code>;
            }
            return <img {...props} />;
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
    
    {/* Tab-like controls for Edit/Preview */}
    <div className="mb-4 border-b border-gray-700">
        <nav className="-mb-px flex space-x-8">
            <button onClick={() => setShowPreview(false)} className={`py-4 px-1 border-b-2 font-medium text-lg ${!showPreview ? 'border-highlight text-strong' : 'border-transparent text-text-body hover:text-text-primary'}`}>
                Edit
            </button>
            <button onClick={() => setShowPreview(true)} className={`py-4 px-1 border-b-2 font-medium text-lg ${showPreview ? 'border-highlight text-strong' : 'border-transparent text-text-body hover:text-text-primary'}`}>
                Preview
            </button>
        </nav>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label className="block text-text-body mb-2 text-lg" htmlFor="title">Title</label>
                        <input type="text" id="title" className="w-full px-4 py-2 bg-background rounded text-text-primary text-xl focus:ring-2 focus:ring-highlight focus:outline-none" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        {showPreview ? (
            <div>
                <label className="block text-text-body mb-2 text-lg">Preview</label>
                <div className="prose prose-lg lg:prose-xl max-w-none dark:prose-invert prose-headings:font-poppins prose-headings:text-text-heading prose-p:text-text-body prose-a:text-strong prose-strong:text-text-primary bg-background rounded p-4 h-96 overflow-y-auto">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}
                                    components={customComponents} >{content}</ReactMarkdown>
                </div>
            </div>
        ) : (
            <div>
                <label className="block text-text-body mb-2 text-lg" htmlFor="content">Content (Markdown)</label>
                        <textarea ref={contentRef} id="content" className="w-full px-4 py-2 bg-background rounded text-text-primary font-jetbrains h-96" value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
        )}
        
 
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <button type="submit" className="w-full sm:w-auto bg-highlight hover:bg-strong text-white font-bold py-3 px-6 rounded text-lg transition-colors">Publish Article</button>
    <label className={`w-full sm:w-auto text-center bg-surface border border-highlight text-highlight font-bold py-3 px-6 rounded text-lg transition-colors ${showPreview || isUploading ? 'cursor-not-allowed opacity-50' : 'hover:bg-highlight hover:text-white cursor-pointer'}`}>
                            <span>{isUploading ? 'Uploading...' : 'Upload File'}</span>
                            <input 
                                type="file" 
                                accept="image/*,video/mp4,video/webm" 
                                className="hidden" 
                                onChange={handleFileUpload} 
                                disabled={isUploading || showPreview} 
                            />
                        </label>
                    </div>
                    {message && <p className="text-center mt-4 text-strong">{message}</p>}
                </form>
            </div>
        </Layout>
    );
};
export default CreateArticlePage;