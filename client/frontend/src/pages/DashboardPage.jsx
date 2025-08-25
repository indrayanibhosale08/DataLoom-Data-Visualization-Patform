// // client/src/pages/DashboardPage.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import StatCard from '../components/StatCard';
// import { FiFileText, FiBarChart2, FiActivity, FiDownload } from 'react-icons/fi';
// import useAuth from '../hooks/useAuth';
// import { useNavigate } from 'react-router-dom';

// const DashboardPage = () => {
//     const { user } = useAuth();
//     const navigate = useNavigate();
    
//     // State to hold stats, loading status, and errors
//     const [stats, setStats] = useState({
//         totalFiles: 0,
//         chartsCreated: 0,
//         recentActivity: 0,
//         exports: 0
//     });
//     const [loading, setLoading] = useState(true);

//     // useEffect hook to fetch data when the component mounts
//     useEffect(() => {
//         const fetchStats = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const res = await axios.get('http://localhost:5000/api/history/stats', {
//                     headers: { 'x-auth-token': token },
//                 });
//                 setStats(res.data); // Update state with fetched data
//             } catch (error) {
//                 console.error("Failed to fetch dashboard stats", error);
//                 // Keep default stats on error
//             } finally {
//                 setLoading(false); // Stop loading indicator
//             }
//         };

//         fetchStats();
//     }, []); // Empty dependency array means this runs once on mount

//     // Show a simple loading state
//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-full">
//                 <p>Loading Dashboard...</p>
//             </div>
//         );
//     }

//     return (
//         <div>
//             {/* Header */}
//             <div className="flex justify-between items-center mb-8">
//                 <div>
//                     <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
//                     <p className="text-gray-600 mt-1">Welcome back, {user?.name}! Here's what's happening.</p>
//                 </div>
//                 <button 
//                     onClick={() => navigate('/analytics')}
//                     className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
//                 >
//                     Upload File
//                 </button>
//             </div>

//             {/* Stats Grid - Now connected to state */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <StatCard 
//                     title="Total Files" 
//                     value={stats.totalFiles} 
//                     icon={<FiFileText size={24} />} 
//                     description="Excel files you've uploaded" 
//                 />
//                 <StatCard 
//                     title="Charts Created" 
//                     value={stats.chartsCreated} 
//                     icon={<FiBarChart2 size={24} />} 
//                     description="Visualizations generated (coming soon)" 
//                 />
//                 <StatCard 
//                     title="Recent Activity" 
//                     value={stats.recentActivity} 
//                     icon={<FiActivity size={24} />} 
//                     description="Actions performed (coming soon)" 
//                 />
//                 <StatCard 
//                     title="Exports" 
//                     value={stats.exports} 
//                     icon={<FiDownload size={24} />} 
//                     description="Charts downloaded (coming soon)" 
//                 />
//             </div>
//             {/* You can add more sections here later, like a list of recent files */}
//         </div>
//     );
// };

// export default DashboardPage;


// // 2.client/frontend/src/pages/DashboardPage.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import useAuth from '../hooks/useAuth';
// import { useNavigate } from 'react-router-dom';

// // Import MUI components
// import { Box, Typography, Grid, Paper, Button, CircularProgress } from '@mui/material';

// // Import MUI Icons
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import DownloadIcon from '@mui/icons-material/Download';

// // A reusable StatCard component built with MUI
// const StatCard = ({ title, value, icon, description }) => {
//   return (
//     <Paper 
//       elevation={3} 
//       sx={{ 
//         p: 2.5, 
//         display: 'flex', 
//         alignItems: 'center', 
//         borderRadius: 2, 
//         height: '100%' 
//       }}
//     >
//       <Box sx={{ 
//         bgcolor: 'primary.main', 
//         color: 'white', 
//         p: 2, 
//         borderRadius: '50%', 
//         mr: 2, 
//         display: 'flex' 
//       }}>
//         {icon}
//       </Box>
//       <Box>
//         <Typography variant="h6" color="text.primary" sx={{ fontWeight: 'bold' }}>
//           {value}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {title}
//         </Typography>
//       </Box>
//     </Paper>
//   );
// };


// const DashboardPage = () => {
//     const { user } = useAuth();
//     const navigate = useNavigate();
    
//     const [stats, setStats] = useState({
//         totalFiles: 0,
//         chartsCreated: 0,
//         exports: 0
//     });
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchStats = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const res = await axios.get('http://localhost:5000/api/history/stats', {
//                     headers: { 'x-auth-token': token },
//                 });
//                 setStats(res.data);
//             } catch (error) {
//                 console.error("Failed to fetch dashboard stats", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchStats();
//     }, []);

//     if (loading) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     return (
//         <Box>
//             {/* Header */}
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
//                 <Box>
//                     <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
//                         Dashboard
//                     </Typography>
//                     <Typography variant="subtitle1" color="text.secondary">
//                         Welcome back, {user?.name}!
//                     </Typography>
//                 </Box>
//                 <Button 
//                     variant="contained"
//                     size="large"
//                     onClick={() => navigate('/analytics')}
//                 >
//                     Upload File
//                 </Button>
//             </Box>

//             {/* Stats Grid */}
//             <Grid container spacing={3}>
//                 <Grid item xs={12} sm={6} md={4}>
//                     <StatCard 
//                         title="Total Files Uploaded" 
//                         value={stats.totalFiles} 
//                         icon={<InsertDriveFileIcon />} 
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4}>
//                     <StatCard 
//                         title="Charts Created" 
//                         value={stats.chartsCreated} 
//                         icon={<BarChartIcon />}
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4}>
//                     <StatCard 
//                         title="Exports" 
//                         value={stats.exports} 
//                         icon={<DownloadIcon />}
//                     />
//                 </Grid>
//             </Grid>

//             {/* You can add another Grid for recent files here */}
//             <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 2 }}>
//                 <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
//                     Recent Files
//                 </Typography>
//                 <Typography color="text.secondary">
//                     Displaying a list of recent uploads is a great next feature!
//                 </Typography>
//             </Paper>
//         </Box>
//     );
// };

// export default DashboardPage;

// 3.client/frontend/src/pages/DashboardPage.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import useAuth from '../hooks/useAuth';
// import { useNavigate } from 'react-router-dom';

// // Import MUI components
// import {
//   Box,
//   Typography,
//   Grid,
//   Paper,
//   Button,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   Divider
// } from '@mui/material';

// // Import MUI Icons
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import DownloadIcon from '@mui/icons-material/Download';
// import FolderIcon from '@mui/icons-material/Folder';

// // A reusable StatCard component built with MUI, defined within the page component
// const StatCard = ({ title, value, icon }) => {
//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         p: 2.5,
//         display: 'flex',
//         alignItems: 'center',
//         borderRadius: 2,
//         height: '100%'
//       }}
//     >
//       <Box sx={{
//         bgcolor: 'primary.main',
//         color: 'white',
//         p: 2,
//         borderRadius: '50%',
//         mr: 2,
//         display: 'flex'
//       }}>
//         {icon}
//       </Box>
//       <Box>
//         <Typography variant="h6" color="text.primary" sx={{ fontWeight: 'bold' }}>
//           {value}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {title}
//         </Typography>
//       </Box>
//     </Paper>
//   );
// };

// const DashboardPage = () => {
//     const { user } = useAuth();
//     const navigate = useNavigate();

//     const [stats, setStats] = useState({ totalFiles: 0, chartsCreated: 0, exports: 0 });
//     const [recentFiles, setRecentFiles] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Only fetch data if the user object is available
//         if (user) {
//             const fetchData = async () => {
//                 try {
//                     const token = localStorage.getItem('token');
//                     const config = { headers: { 'x-auth-token': token } };

//                     // Use Promise.all to fetch both sets of data concurrently
//                     const [statsRes, recentFilesRes] = await Promise.all([
//                         axios.get('http://localhost:5000/api/history/stats', config),
//                         axios.get('http://localhost:5000/api/history/recent', config)
//                     ]);

//                     setStats(statsRes.data);
//                     setRecentFiles(recentFilesRes.data);
//                 } catch (error) {
//                     console.error("Failed to fetch dashboard data", error);
//                 } finally {
//                     setLoading(false);
//                 }
//             };

//             fetchData();
//         } else {
//             // If there's no user, we can stop loading
//             setLoading(false);
//         }
//     }, [user]); // The effect depends on the user object

//     if (loading || !user) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     return (
//         <Box>
//             {/* Header */}
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
//                 <Box>
//                     <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
//                         Dashboard
//                     </Typography>
//                     <Typography variant="subtitle1" color="text.secondary">
//                         Welcome back, {user.name}!
//                     </Typography>
//                 </Box>
//                 <Button
//                     variant="contained"
//                     size="large"
//                     onClick={() => navigate('/analytics')}
//                 >
//                     Upload File
//                 </Button>
//             </Box>

//             {/* Stats Grid */}
//             <Grid container spacing={3}>
//                 <Grid item xs={12} sm={6} md={4}>
//                     <StatCard
//                         title="Total Files Uploaded"
//                         value={stats.totalFiles}
//                         icon={<InsertDriveFileIcon />}
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4}>
//                     <StatCard
//                         title="Charts Created"
//                         value={stats.chartsCreated}
//                         icon={<BarChartIcon />}
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4}>
//                     <StatCard
//                         title="Exports"
//                         value={stats.exports}
//                         icon={<DownloadIcon />}
//                     />
//                 </Grid>
//             </Grid>

//             {/* Recent Files Section */}
//             <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, mt: 4, borderRadius: 2 }}>
//                 <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
//                     Recent Files
//                 </Typography>
//                 {recentFiles.length > 0 ? (
//                     <List disablePadding>
//                         {recentFiles.map((file, index) => (
//                             <React.Fragment key={file._id}>
//                                 <ListItem>
//                                     <ListItemIcon>
//                                         <FolderIcon />
//                                     </ListItemIcon>
//                                     <ListItemText
//                                         primary={file.fileName}
//                                         secondary={`Analyzed on ${new Date(file.analysisDate).toLocaleDateString()}`}
//                                     />
//                                 </ListItem>
//                                 {index < recentFiles.length - 1 && <Divider component="li" />}
//                             </React.Fragment>
//                         ))}
//                     </List>
//                 ) : (
//                     <Typography color="text.secondary" sx={{ pl: 2 }}>
//                         No recent activity. Upload a file to get started!
//                     </Typography>
//                 )}
//             </Paper>
//         </Box>
//     );
// };

// export default DashboardPage;



// // client/frontend/src/pages/DashboardPage.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import useAuth from '../hooks/useAuth';
// import { useNavigate } from 'react-router-dom';

// // Import MUI components
// import {
//   Box,
//   Typography,
//   Grid,
//   Paper,
//   Button,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   Divider
// } from '@mui/material';

// // Import MUI Icons
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import DownloadIcon from '@mui/icons-material/Download';
// import FolderIcon from '@mui/icons-material/Folder';

// // A reusable StatCard component built with MUI
// const StatCard = ({ title, value, icon }) => {
//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         p: 2.5,
//         display: 'flex',
//         alignItems: 'center',
//         borderRadius: 2,
//         height: '100%'
//       }}
//     >
//       <Box sx={{
//         bgcolor: 'primary.main',
//         color: 'white',
//         p: 2,
//         borderRadius: '50%',
//         mr: 2,
//         display: 'flex'
//       }}>
//         {icon}
//       </Box>
//       <Box>
//         <Typography variant="h6" color="text.primary" sx={{ fontWeight: 'bold' }}>
//           {value}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {title}
//         </Typography>
//       </Box>
//     </Paper>
//   );
// };


// const DashboardPage = () => {
//     const { user } = useAuth();
//     const navigate = useNavigate();
    
//     // --- CHANGE #1: ADD NEW STATE FOR RECENT FILES ---
//     const [stats, setStats] = useState({ totalFiles: 0, chartsCreated: 0, exports: 0 });
//     const [recentFiles, setRecentFiles] = useState([]); // <-- New state added
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const config = { headers: { 'x-auth-token': token } };

//                 // --- CHANGE #2: FETCH BOTH STATS AND RECENT FILES ---
//                 // Use Promise.all to make both API calls concurrently for efficiency
//                 const [statsRes, recentFilesRes] = await Promise.all([
//                     axios.get('http://localhost:5000/api/history/stats', config),
//                     axios.get('http://localhost:5000/api/history/recent', config)
//                 ]);

//                 setStats(statsRes.data);
//                 setRecentFiles(recentFilesRes.data); // <-- Set the state for the new data

//             } catch (error) {
//                 console.error("Failed to fetch dashboard data", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []); // <-- We are using your working useEffect logic (empty array)

//     if (loading) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     return (
//         <Box>
//             {/* Header */}
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
//                 <Box>
//                     <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
//                         Dashboard
//                     </Typography>
//                     <Typography variant="subtitle1" color="text.secondary">
//                         Welcome back, {user?.name}!
//                     </Typography>
//                 </Box>
//                 <Button 
//                     variant="contained"
//                     size="large"
//                     onClick={() => navigate('/analytics')}
//                 >
//                     Upload File
//                 </Button>
//             </Box>

//             {/* Stats Grid */}
//             <Grid container spacing={3}>
//                 <Grid item xs={12} sm={6} md={4}>
//                     <StatCard 
//                         title="Total Files Uploaded" 
//                         value={stats.totalFiles} 
//                         icon={<InsertDriveFileIcon />} 
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4}>
//                     <StatCard 
//                         title="Charts Created" 
//                         value={stats.chartsCreated} 
//                         icon={<BarChartIcon />}
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4}>
//                     <StatCard 
//                         title="Exports" 
//                         value={stats.exports} 
//                         icon={<DownloadIcon />}
//                     />
//                 </Grid>
//             </Grid>

//             {/* --- CHANGE #3: REPLACE PLACEHOLDER WITH DYNAMIC LIST --- */}
//             <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, mt: 4, borderRadius: 2 }}>
//                 <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
//                     Recent Files
//                 </Typography>
//                 {recentFiles.length > 0 ? (
//                     <List disablePadding>
//                         {recentFiles.map((file, index) => (
//                             <React.Fragment key={file._id}>
//                                 <ListItem>
//                                     <ListItemIcon>
//                                         <FolderIcon />
//                                     </ListItemIcon>
//                                     <ListItemText
//                                         primary={file.fileName}
//                                         secondary={`Analyzed on ${new Date(file.analysisDate).toLocaleDateString()}`}
//                                     />
//                                 </ListItem>
//                                 {index < recentFiles.length - 1 && <Divider component="li" />}
//                             </React.Fragment>
//                         ))}
//                     </List>
//                 ) : (
//                     <Typography color="text.secondary" sx={{ pl: 2 }}>
//                         No recent activity. Upload a file to get started!
//                     </Typography>
//                 )}
//             </Paper>
//         </Box>
//     );
// };

// export default DashboardPage;

// client/frontend/src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

// Import MUI components
import {
  Box, Typography, Grid, Paper, Button, CircularProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, IconButton
} from '@mui/material';

// Import MUI Icons
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import BarChartIcon from '@mui/icons-material/BarChart';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// A redesigned, more attractive StatCard component
const StatCard = ({ title, value, icon }) => {
  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <Typography variant="subtitle1" color="text.secondary">
          {title}
        </Typography>
        <Box sx={{ bgcolor: 'primary.light', color: 'primary.main', p: 1.5, borderRadius: '50%', display: 'flex' }}>
          {icon}
        </Box>
      </Box>
      <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 2 }}>
        {value}
      </Typography>
    </Paper>
  );
};

const DashboardPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [stats, setStats] = useState({ totalFiles: 0, chartsCreated: 0, exports: 0 });
    const [recentFiles, setRecentFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const config = { headers: { 'x-auth-token': token } };
                    const [statsRes, recentFilesRes] = await Promise.all([
                    axios.get('/api/history/stats', config),
                    axios.get('/api/history/recent', config)
                ]);
                    setStats(statsRes.data);
                    setRecentFiles(recentFilesRes.data);
                } catch (error) {
                    console.error("Failed to fetch dashboard data", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [user]);

    if (loading || !user) {
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
                <Box>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                        Dashboard
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Welcome back, {user.name}!
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/analytics')}
                    startIcon={<BarChartIcon />}
                >
                    New Analysis
                </Button>
            </Box>

            {/* Stats Grid */}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard
                        title="Total Files Uploaded"
                        value={stats.totalFiles}
                        icon={<InsertDriveFileIcon />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard
                        title="Charts Created"
                        value={stats.chartsCreated}
                        icon={<BarChartIcon />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard
                        title="Total Exports"
                        value={stats.exports}
                        icon={<DownloadIcon />}
                    />
                </Grid>
            </Grid>

            {/* Recent Files Table */}
            <Paper elevation={4} sx={{ p: { xs: 2, md: 3 }, mt: 4, borderRadius: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Recent Activity
                    </Typography>
                    <Button
                      variant="text"
                      onClick={() => navigate('/history')}
                      endIcon={<ArrowForwardIcon />}
                    >
                      View All
                    </Button>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>File Name</TableCell>
                                <TableCell>Rows</TableCell>
                                <TableCell>Date Analyzed</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recentFiles.length > 0 ? (
                                recentFiles.map((file) => (
                                    <TableRow key={file._id} hover>
                                        <TableCell sx={{ fontWeight: 'medium' }}>{file.fileName}</TableCell>
                                        <TableCell>{file.rowCount}</TableCell>
                                        <TableCell>{new Date(file.analysisDate).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        <Typography color="text.secondary" sx={{ py: 3 }}>
                                            No recent activity. Upload a file to get started!
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default DashboardPage;