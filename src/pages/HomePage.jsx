import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const getSnippet = (htmlContent) => {
  if (!htmlContent) return '';
  const text = htmlContent.replace(/<[^>]*>?/gm, ' ').trim();
  const firstLine = text.split('\n')[0];
  return firstLine.length > 150 ? firstLine.substring(0, 150) + '...' : firstLine;
};

const Spinner = () => ( <div className="flex justify-center items-center p-10"><div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-strong"></div></div> );

const ArticleCard = ({ article }) => (
  <div className="bg-surface p-6 rounded-lg shadow-lg hover:shadow-highlight/20 hover:ring-1 hover:ring-highlight transition-all duration-300 flex flex-col">
    <h3 className="text-xl font-bold text-text-heading mb-2 font-poppins">{article.title}</h3>
    <p className="text-text-body/80 text-sm mb-4">Published on {new Date(article.publishedDate).toLocaleDateString()} by {article.authorUsername}</p>
    <p className="text-text-body flex-grow">{getSnippet(article.content)}</p>
    <Link to={`/articles/${article.id}`} className="text-strong hover:text-highlight mt-4 inline-block font-semibold self-start">Read More &rarr;</Link>
  </div>
);

const HomePage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setArticles(data);
            } catch (e) {
                setError("Failed to load articles. Please make sure the backend API is running.");
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    return (
        <Layout>
            <h2 className="text-3xl font-bold text-text-primary mb-8 border-b-2 border-surface pb-2 font-poppins">Latest Posts</h2>
            {loading && <Spinner />}
            {error && <p className="text-center text-strong bg-highlight/20 p-4 rounded-lg">{error}</p>}
            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map(article => (<ArticleCard key={article.id} article={article} />))}
                </div>
            )}
            {!loading && !error && articles.length === 0 && (<p className="text-center text-text-body/70">No articles found. Why not write one?</p>)}
        </Layout>
    );
};
export default HomePage;