import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Spinner = () => (
    <div className="flex justify-center items-center p-10">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-strong"></div>
    </div>
);

const DisplayArticlePage = () => {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setArticle(data);
            } catch (e) {
                setError("Failed to load the article. It might not exist or the server is unavailable.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchArticle();
        }
    }, [id]);

    return (
        <Layout>
            {loading && <Spinner />}
            {error && <p className="text-center text-strong bg-highlight/20 p-4 rounded-lg">{error}</p>}
            {article && (
                <article className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4 font-poppins">{article.title}</h1>
                    <p className="text-text-body/80 text-lg mb-8">
                        Published on {new Date(article.publishedDate).toLocaleDateString()} by {article.authorUsername}
                    </p>

                    <div
        className="prose prose-lg lg:prose-xl max-w-none dark:prose-invert prose-headings:font-poppins prose-headings:text-text-heading prose-p:text-text-body prose-a:text-strong hover:prose-a:text-highlight prose-blockquote:text-text-body/90 prose-strong:text-text-primary"
    >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
    </div>
                </article>
            )}
        </Layout>
    );
};

export default DisplayArticlePage;

