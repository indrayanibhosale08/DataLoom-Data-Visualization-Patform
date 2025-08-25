// // client/src/pages/HistoryPage.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const HistoryPage = () => {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('http://localhost:5000/api/history', {
//           headers: { 'x-auth-token': token },
//         });
//         setHistory(res.data);
//       } catch (err) {
//         setError('Failed to fetch history.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, []);

//   if (loading) return <p className="text-center mt-8">Loading history...</p>;
//   if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <header className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Analysis History</h1>
//         <Link 
//             to="/dashboard" 
//             className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
//         >
//             Back to Dashboard
//         </Link>
//       </header>
//       <div className="bg-white rounded-lg shadow-md p-6">
//         {history.length === 0 ? (
//           <p>No analysis history found.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rows</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Size</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {history.map((item) => (
//                   <tr key={item._id}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.fileName}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.rowCount}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(item.fileSize / 1024).toFixed(2)} KB</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.analysisDate).toLocaleString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HistoryPage;



// client/frontend/src/pages/HistoryPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import MUI components
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/history', {
          headers: { 'x-auth-token': token },
        });
        setHistory(res.data);
      } catch (err) {
        setError('Failed to fetch analysis history.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Analysis History
        </Typography>
        <Button variant="contained" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="analysis history table">
            <TableHead sx={{ bgcolor: 'grey.100' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>File Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Rows</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>File Size</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date Analyzed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.length === 0 && !error ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography color="text.secondary">No analysis history found.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                history.map((item) => (
                  <TableRow
                    key={item._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.fileName}
                    </TableCell>
                    <TableCell>{item.rowCount}</TableCell>
                    <TableCell>{(item.fileSize / 1024).toFixed(2)} KB</TableCell>
                    <TableCell>{new Date(item.analysisDate).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default HistoryPage;