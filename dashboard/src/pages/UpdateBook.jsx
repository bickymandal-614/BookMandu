import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
  title: '',
  author: '',
  description: '',
  oldPrice: '',
  newPrice: '',
  publishedYear: '',
  coverImage: ''
});


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/books/get-single-book/${id}`, {
          withCredentials: true,
        });
        setBookData(res.data.book);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch book data.');
        setLoading(false);
        console.error(err);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
  const { name, value } = e.target;
  const parsedValue = ['oldPrice', 'newPrice', 'publishedYear'].includes(name)
    ? Number(value)
    : value;

  setBookData({ ...bookData, [name]: parsedValue });
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3000/api/v1/books/update-book/${id}`, bookData, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to update book.');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading book data...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Update Book</h2>

      {bookData.coverImage && (
        <div className="mb-6 flex justify-center">
          <img
            src={bookData.coverImage}
            alt="Book Cover"
            className="rounded-xl shadow w-52 h-auto object-cover"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-semibold mb-1">Title</label>
          <input
            id="title"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            placeholder="Book title"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="author" className="block font-semibold mb-1">Author</label>
          <input
            id="author"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            placeholder="Author name"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-semibold mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={bookData.description}
            onChange={handleChange}
            placeholder="Book description"
            rows="4"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
  <label htmlFor="oldPrice" className="block font-semibold mb-1">Old Price</label>
  <input
    id="oldPrice"
    type="number"
    name="oldPrice"
    value={bookData.oldPrice}
    onChange={handleChange}
    placeholder="Old Price"
    className="w-full border border-gray-300 p-2 rounded"
    required
  />
</div>

<div>
  <label htmlFor="newPrice" className="block font-semibold mb-1">New Price</label>
  <input
    id="newPrice"
    type="number"
    name="newPrice"
    value={bookData.newPrice}
    onChange={handleChange}
    placeholder="New Price"
    className="w-full border border-gray-300 p-2 rounded"
    required
  />
</div>


        <div>
          <label htmlFor="publishedYear" className="block font-semibold mb-1">Published Year</label>
          <input
            id="publishedYear"
            type="number"
            name="publishedYear"
            value={bookData.publishedYear}
            onChange={handleChange}
            placeholder="Published Year"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
