import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const categoryOptions = [
  { id: 1, text: "Self-Help" },
  { id: 2, text: "Sci-Fi" },
  { id: 3, text: "Thrillers" },
  { id: 4, text: "Romance" },
  { id: 5, text: "History" },
  { id: 6, text: "Horror" },
  { id: 7, text: "Mystery" },
  { id: 8, text: "Business" },
  { id: 9, text: "Poetry" },
  { id: 10, text: "CookBooks" },
];

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    category: '',
    oldPrice: '',
    newPrice: '',
  });

  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coverImage) {
      setMessage('Please upload a cover image.');
      return;
    }

    const data = new FormData();
    data.append('coverImage', coverImage);
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3000/api/v1/books/add-book', data, {
        withCredentials: true
      });

      setMessage(res.data.message);
      setFormData({
        title: '',
        author: '',
        description: '',
        category: '',
        oldPrice: '',
        newPrice: '',
      });
      setCoverImage(null);
      setLoading(false);
      navigate('/');
      toast.success("Book added successfully.", { autoClose: 2000 });

    } catch (error) {
      console.log(error);
      setLoading(false);
      setMessage(error.response?.data?.message || 'Failed to add book');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Add a New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['title', 'author', 'description', 'oldPrice', 'newPrice'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium capitalize">{field}</label>
            {field === 'description' ? (
              <textarea
                name={field}
                value={formData[field]}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 border rounded-lg"
                required
              />
            ) : (
              <input
                type={field.includes('Price') ? 'number' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            )}
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">Select a category</option>
            {categoryOptions.map((option) => (
              <option key={option.id} value={option.text}>
                {option.text}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Cover Image</label>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {message && <p className="text-sm text-center text-red-500">{message}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
