// frontend/src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api'; // Make sure this path is correct

const RegisterPage = () => {
  // Hook to programmatically navigate to other pages
  const navigate = useNavigate();

  // State to hold the form data (name, email, password)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // State to hold any error message from the backend
  const [error, setError] = useState('');
  // State to hold the success message
  const [success, setSuccess] = useState('');

  // A single handler to update the formData state as the user types
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    // Prevent the default browser action of refreshing the page
    e.preventDefault();
    // Clear any previous error or success messages
    setError('');
    setSuccess('');

    // Check if passwords are long enough (basic validation)
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      // Call the register function from our API service
      const { data } = await register(formData);
      
      // Set a success message
      setSuccess(data.message + ' Redirecting to login...');

      // After a short delay, redirect the user to the login page
      setTimeout(() => {
        navigate('/login');
      }, 2000); // 2-second delay

    } catch (err) {
      // If the API call fails, set the error message from the server's response
      // Axios puts the server's error response in err.response.data
      const errorMessage = err.response?.data?.error || 'Registration failed. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="email@example.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="******************"
            />
          </div>
          
          {/* Display Error or Success Messages Here */}
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          {success && <p className="text-green-500 text-xs italic mb-4">{success}</p>}

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-blue-500 hover:text-blue-800">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;