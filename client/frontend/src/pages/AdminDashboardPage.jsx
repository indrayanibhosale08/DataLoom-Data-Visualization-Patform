// // client/src/pages/AdminDashboardPage.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { FiTrash2, FiUserCheck } from 'react-icons/fi'; // Import the new icon
// import useAuth from '../hooks/useAuth'; // Import the auth hook

// const AdminDashboardPage = () => {
//   const { user: adminUser } = useAuth(); // Get the logged-in admin's info
//   const [stats, setStats] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Function to fetch all data for the dashboard
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
//       const config = { headers: { 'x-auth-token': token } };
//       const [statsRes, usersRes] = await Promise.all([
//         axios.get('http://localhost:5000/api/admin/stats', config),
//         axios.get('http://localhost:5000/api/admin/users', config),
//       ]);
//       setStats(statsRes.data);
//       setUsers(usersRes.data);
//     } catch (err) {
//       setError('Failed to fetch admin data. Please ensure you are logged in as an admin.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Handler for deleting a user
//   const handleDeleteUser = async (userId, userName) => {
//     if (window.confirm(`Are you sure you want to delete "${userName}"? This will also remove all their analysis history.`)) {
//       try {
//         const token = localStorage.getItem('token');
//         await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
//           headers: { 'x-auth-token': token },
//         });
//         fetchData(); // Refresh list on success
//       } catch (err) {
//         alert(err.response?.data?.msg || 'Failed to delete user.');
//       }
//     }
//   };

//   // Handler for changing a user's role
//   const handleRoleChange = async (userToUpdate) => {
//     const newRole = userToUpdate.role === 'admin' ? 'user' : 'admin';
//     if (window.confirm(`Are you sure you want to change ${userToUpdate.name}'s role to "${newRole}"?`)) {
//         try {
//             const token = localStorage.getItem('token');
//             await axios.put(
//                 `http://localhost:5000/api/admin/users/${userToUpdate._id}/role`,
//                 { role: newRole },
//                 { headers: { 'x-auth-token': token } }
//             );
//             fetchData(); // Refresh list on success
//         } catch (err) {
//             alert(err.response?.data?.msg || 'Failed to update role.');
//         }
//     }
//   };

//   if (loading) return <p className="text-center mt-8">Loading Admin Data...</p>;
//   if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

//   return (
//     <div>
//       <header className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
//         <Link to="/dashboard" className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg">Back to Dashboard</Link>
//       </header>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         {/* Stat Cards can go here if needed */}
//       </div>
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h3 className="text-xl font-semibold mb-4">User Management</h3>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {users.map(user => (
//                 <tr key={user._id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{user.name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm">{user.email}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
//                       {user.role}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center gap-4">
//                     <button onClick={() => handleDeleteUser(user._id, user.name)} className="text-red-500 hover:text-red-700 disabled:opacity-30" title={`Delete ${user.name}`} disabled={adminUser?.id === user._id}>
//                       <FiTrash2 />
//                     </button>
//                     <button onClick={() => handleRoleChange(user)} className="text-indigo-500 hover:text-indigo-700 disabled:opacity-30" title={`Change role for ${user.name}`} disabled={adminUser?.id === user._id}>
//                       <FiUserCheck />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboardPage;

// client/frontend/src/pages/AdminDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

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
  CircularProgress,
  Alert,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';

// Import MUI Icons
import DeleteIcon from '@mui/icons-material/Delete';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const AdminDashboardPage = () => {
  const { user: loggedInAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch all data for the dashboard
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'x-auth-token': token } };
     const usersRes = await axios.get('/api/admin/users', config);
      setUsers(usersRes.data);
    } catch (err) {
      setError('Failed to fetch admin data. Please ensure you are logged in as an admin.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete "${userName}"? This will also remove all their analysis history.`)) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
          headers: { 'x-auth-token': token },
        });
        fetchData(); // Refresh list on success
      } catch (err) {
        alert(err.response?.data?.msg || 'Failed to delete user.');
      }
    }
  };

  const handleRoleChange = async (userToUpdate) => {
    const newRole = userToUpdate.role === 'admin' ? 'user' : 'admin';
    if (window.confirm(`Are you sure you want to change ${userToUpdate.name}'s role to "${newRole}"?`)) {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:5000/api/admin/users/${userToUpdate._id}/role`,
                { role: newRole },
                { headers: { 'x-auth-token': token } }
            );
            fetchData(); // Refresh list on success
        } catch (err) {
            alert(err.response?.data?.msg || 'Failed to update role.');
        }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 4 }}>
        Admin Panel - User Management
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="user management table">
            <TableHead sx={{ bgcolor: 'grey.100' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Joined</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      color={user.role === 'admin' ? 'success' : 'primary'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Tooltip title="Change Role">
                      <span>
                        <IconButton
                          color="primary"
                          onClick={() => handleRoleChange(user)}
                          disabled={loggedInAdmin?.id === user._id}
                        >
                          <AdminPanelSettingsIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Delete User">
                       <span>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteUser(user._id, user.name)}
                          disabled={loggedInAdmin?.id === user._id}
                        >
                          <DeleteIcon />
                        </IconButton>
                       </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AdminDashboardPage;