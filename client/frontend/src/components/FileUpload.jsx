// // client/src/components/FileUpload.jsx
// import React, { useState } from 'react';
// import axios from 'axios';

// const FileUpload = ({ onUploadSuccess }) => {
//   const [file, setFile] = useState(null);
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false); // <-- Add loading state

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setError('');
//     setMessage('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setError('Please select a file to upload.');
//       return;
//     }

//     setError('');
//     setMessage('');
//     setLoading(true); // <-- Set loading to true

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('Authentication error. Please log in again.');
//         setLoading(false);
//         return;
//       }
      
//       const res = await axios.post('http://localhost:5000/api/files/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'x-auth-token': token,
//         },
//       });
      
//       setMessage('File uploaded and parsed successfully!');
//       onUploadSuccess(res.data);

//     } catch (err) {
//       setError(err.response?.data?.msg || 'File upload failed.');
//       console.error(err);
//     } finally {
//       setLoading(false); // <-- Set loading back to false
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md">
//       <h3 className="text-xl font-semibold mb-4">Upload Excel File</h3>
//       {error && <div className="p-3 mb-4 text-sm text-white bg-red-500 rounded-lg">{error}</div>}
//       {message && <div className="p-3 mb-4 text-sm text-white bg-green-500 rounded-lg">{message}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <input
//             type="file"
//             accept=".xls,.xlsx"
//             onChange={handleFileChange}
//             className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
//             disabled={loading} // <-- Disable while loading
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none disabled:bg-indigo-400 disabled:cursor-not-allowed"
//           disabled={loading} // <-- Disable while loading
//         >
//           {loading ? 'Processing...' : 'Upload and Analyze'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default FileUpload;

// client/frontend/src/components/FileUpload.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Paper, Typography, Box, Alert, CircularProgress } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError('');
      setMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    setError('');
    setMessage('');
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      // --- URL UPDATED HERE ---
      const res = await axios.post('/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
      });
      setMessage('File uploaded and parsed successfully!');
      onUploadSuccess(res.data);
    } catch (err) {
      setError(err.response?.data?.msg || 'File upload failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
        Upload Excel File
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Button
          variant="outlined" component="label" fullWidth
          startIcon={<UploadFileIcon />} sx={{ mb: 1 }} disabled={loading}
        >
          Choose File
          <input type="file" hidden accept=".xls,.xlsx" onChange={handleFileChange} />
        </Button>
        {fileName && <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>{fileName}</Typography>}
        
        <Button
          type="submit" variant="contained" fullWidth
          disabled={loading || !file} sx={{ height: 40 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload and Analyze'}
        </Button>
        
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
      </Box>
    </Paper>
  );
};

export default FileUpload;