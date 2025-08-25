// // client/frontend/src/components/Register.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const { name, email, password } = formData;

//   const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     if (password.length < 6) {
//       setError('Password must be at least 6 characters long');
//       return;
//     }
//     try {
//       const res = await axios.post(
//         'http://localhost:5000/api/users/register',
//         formData
//       );
//       localStorage.setItem('token', res.data.token);
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.response?.data?.msg || 'Registration failed. Please try again.');
//       console.error(err.response?.data);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center text-gray-900">
//           Create your Account
//         </h2>
//         {error && (
//           <div className="p-3 text-sm text-white bg-red-500 rounded-lg" role="alert">
//             {error}
//           </div>
//         )}
//         <form className="space-y-6" onSubmit={onSubmit}>
//           <div>
//             <label
//               htmlFor="name"
//               className="text-sm font-medium text-gray-700"
//             >
//               Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               id="name"
//               value={name}
//               onChange={onChange}
//               required
//               className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="Your Name"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="email"
//               className="text-sm font-medium text-gray-700"
//             >
//               Email address
//             </label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               value={email}
//               onChange={onChange}
//               required
//               className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="you@example.com"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="password"
//               className="text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               value={password}
//               onChange={onChange}
//               required
//               minLength="6"
//               className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="••••••••"
//             />
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Register
//             </button>
//           </div>
//         </form>
//         <p className="text-sm text-center text-gray-600">
//           Already have an account?{' '}
//           <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;



// client/frontend/src/components/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Button, TextField, Box, Typography, Paper, Alert } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    try {
      // --- URL UPDATED HERE ---
      const res = await axios.post('/api/users/register', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5',
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: '100%', maxWidth: 400 }}>
        <Typography component="h1" variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
          Create an Account
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal" required fullWidth id="name" label="Full Name"
            name="name" autoComplete="name" autoFocus value={name} onChange={onChange}
          />
          <TextField
            margin="normal" required fullWidth id="email" label="Email Address"
            name="email" autoComplete="email" value={email} onChange={onChange}
          />
          <TextField
            margin="normal" required fullWidth name="password" label="Password"
            type="password" id="password" autoComplete="new-password" value={password} onChange={onChange}
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: 'none' }}>
              {"Sign In"}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;