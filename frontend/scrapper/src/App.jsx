import React, { useState } from "react";
import axios from "axios";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white  rounded-lg shadow-lg p-4 mb-4 w-full max-w-4xl mx-auto flex items-center space-x-4 transition-transform transform hover:scale-105">
      <div className="flex-shrink-0 w-1/3">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-auto rounded-md"
        />
      </div>
      <div className="w-2/3 text-left">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">{product.title}</h2>
        <ul className="list-disc pl-5 mb-4 text-gray-700">
          {product.summary.map((point, index) => (
            <li key={index} className="mb-1">
              {point}
            </li>
          ))}
        </ul>
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 flex items-center justify-center hover:underline"
        >
          View Product
        </a>
      </div>
    </div>
  );
};

const Spinner = () => (
  <div className="flex flex-col justify-center items-center space-y-4 my-10">
    <div className="w-12 h-12 border-4  border-dotted rounded-full animate-spin-slow"></div>
    <div className="text-white text-lg font-semibold animate-bounce">
      Hang tight, we're fetching amazing products for you!
    </div>
  </div>
);

function App() {
  const [domain, setDomain] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDomainSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://assignbkend.onrender.com/api/domain-scrape",
        { domain }
      );
      setProducts(response.data);
      setError("");
    } catch (error) {
      console.error(
        "Error scraping domain:",
        error.response ? error.response.data : error.message
      );
      setError("Failed to scrape the domain. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-center font-sans p-5">
      <style>
        {`
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 3s linear infinite;
          }
        `}
      </style>
      <form
        onSubmit={handleDomainSubmit}
        className="mb-6 flex items-center justify-center flex-col bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
      >
        <label htmlFor="input" className="font-bold text-lg mb-2 text-gray-800">
          Domain Name
        </label>
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          required
          placeholder="Enter domain (e.g., example.com)"
          className="p-3 border border-gray-300 rounded-md w-64 mb-4 bg-white focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="w-64 p-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 hover:scale-95 font-semibold transition-transform"
        >
          Start Scraping
        </button>
      </form>
      {error && <p className="text-red-500 mb-4 text-lg font-medium">{error}</p>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-flow-row gap-4">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
