// // client/frontend/src/pages/HomePage.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion'; // <-- Import motion

// // Import MUI components
// import { Box, Button, Container, Grid, Typography, Paper } from '@mui/material';

// // Import MUI Icons
// import BarChartIcon from '@mui/icons-material/BarChart';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
// import InsightsIcon from '@mui/icons-material/Insights';

// // Reusable animated component for features
// const MotionPaper = motion(Paper);

// const HomePage = () => {
//   const features = [
//     {
//       icon: <UploadFileIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
//       title: 'Effortless Uploads',
//       description: 'Easily upload your .xls and .xlsx files with a simple drag-and-drop or file selection.',
//     },
//     {
//       icon: <BarChartIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
//       title: 'Dynamic Visualizations',
//       description: 'Generate interactive 2D and 3D charts. Switch between bar, line, and pie charts instantly.',
//     },
//     {
//       icon: <AutoAwesomeIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
//       title: 'AI-Powered Insights',
//       description: 'Leverage the power of AI to automatically generate actionable insights and summaries from your data.',
//     },
//   ];

//   // Animation variants for staggering children
//   const containerVariants = {
//     hidden: {},
//     visible: {
//       transition: {
//         staggerChildren: 0.2, // Delay between each child animation
//       },
//     },
//   };

//   // Animation for items fading/sliding in
//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   };
  
//   // Animation for features appearing on scroll
//   const featureVariants = {
//       hidden: { opacity: 0, scale: 0.8 },
//       visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
//   };

//   return (
//     <Box sx={{ bgcolor: 'background.paper', color: 'text.primary', overflowX: 'hidden' }}>
//       {/* Hero Section */}
//       <Container maxWidth="lg" sx={{ py: { xs: 8, md: 16 } }}>
//         <Grid container spacing={4} alignItems="center">
//           <Grid 
//             item 
//             xs={12} 
//             md={6}
//             component={motion.div} // <-- Make Grid a motion component
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <Typography 
//               component={motion.h1} // <-- Animate each element
//               variants={itemVariants}
//               variant="h2" 
//               sx={{ fontWeight: 'bold', mb: 2 }}
//             >
//               Transform Your Spreadsheets into Stories
//             </Typography>
//             <Typography 
//               component={motion.p}
//               variants={itemVariants}
//               variant="h6" 
//               color="text.secondary" 
//               sx={{ mb: 4 }}
//             >
//               DataLoom helps you effortlessly upload, analyze, and visualize your Excel data. Turn raw numbers into beautiful charts and actionable insights in seconds.
//             </Typography>
//             <Box 
//               component={motion.div}
//               variants={itemVariants}
//               sx={{ display: 'flex', gap: 2 }}
//             >
//               <Button component={Link} to="/login" variant="contained" size="large">Login</Button>
//               <Button component={Link} to="/register" variant="outlined" size="large">Register</Button>
//             </Box>
//           </Grid>
//           <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <MotionPaper // Use our animated Paper component
//               elevation={6}
//               sx={{ p: 4, borderRadius: '50%', bgcolor: 'primary.light', display: 'flex', justifyContent: 'center', alignItems: 'center', width: 300, height: 300, opacity: 0.2 }}
//               initial={{ scale: 0, opacity: 0, rotate: -90 }}
//               animate={{ scale: 1, opacity: 1, rotate: 0 }}
//               transition={{ duration: 0.8, type: 'spring' }}
//             >
//                <InsightsIcon sx={{ fontSize: 180, color: 'primary.main' }} />
//             </MotionPaper>
//           </Grid>
//         </Grid>
//       </Container>

//       {/* Features Section */}
//       <Box sx={{ bgcolor: 'grey.100', py: { xs: 8, md: 12 } }}>
//         <Container maxWidth="lg">
//           <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 6 }}>
//             Everything You Need to Analyze Your Data
//           </Typography>
//           <Grid container spacing={4}>
//             {features.map((feature, index) => (
//               <Grid 
//                 item 
//                 xs={12} 
//                 md={4} 
//                 key={index}
//                 component={motion.div} // Make the grid item a motion component
//                 variants={featureVariants}
//                 initial="hidden"
//                 whileInView="visible" // <-- Triggers animation on scroll
//                 viewport={{ once: true, amount: 0.3 }} // Ensures it animates once
//               >
//                 <Paper elevation={0} sx={{ p: 3, textAlign: 'center', bgcolor: 'transparent', height: '100%' }}>
//                   {feature.icon}
//                   <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
//                     {feature.title}
//                   </Typography>
//                   <Typography color="text.secondary">
//                     {feature.description}
//                   </Typography>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* Footer */}
// //       <Box component="footer" sx={{ bgcolor: 'background.paper', py: 4 }}>
// //         <Container maxWidth="lg">
// //           <Typography variant="body2" color="text.secondary" align="center">
// //             © {new Date().getFullYear()} DataLoom. All Rights Reserved.
// //           </Typography>
// //         </Container>
// //       </Box>
//     </Box>
//   );
// };

// export default HomePage;

// client/frontend/src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import MUI components and icons
import { Box, Button, Container, Grid, Typography, Paper, AppBar, Toolbar } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import BarChartIcon from '@mui/icons-material/BarChart';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const HomePage = () => {
  const features = [
    {
      icon: <UploadFileIcon fontSize="large" color="primary" />,
      title: 'Effortless Uploads',
      description: 'Simply upload your .xls or .xlsx files and let our platform handle the parsing.',
    },
    {
      icon: <BarChartIcon fontSize="large" color="primary" />,
      title: 'Dynamic Visualizations',
      description: 'Generate beautiful, interactive charts—from bar and line graphs to 3D visualizations.',
    },
    {
      icon: <AutoAwesomeIcon fontSize="large" color="primary" />,
      title: 'AI-Powered Insights',
      description: 'Unlock hidden trends and get automated, actionable insights from your data in seconds.',
    },
  ];

  return (
    <Box sx={{ bgcolor: 'background.paper', color: 'text.primary', overflowX: 'hidden' }}>
      {/* Navbar */}
      <AppBar 
        position="sticky" 
        sx={{ 
          bgcolor: 'rgba(255, 255, 255, 0.7)', 
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', flexGrow: 1 }}>
              DataLoom
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button component={Link} to="/login" variant="text">Login</Button>
              <Button component={Link} to="/register" variant="contained">Sign Up</Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ 
          background: 'radial-gradient(circle, rgba(237,242,255,1) 0%, rgba(255,255,255,1) 70%)' 
      }}>
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 }, minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <Typography component="h1" variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Turn Your Data Into Decisions
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                  DataLoom is the simplest way to transform complex spreadsheets into clear, beautiful, and interactive visualizations.
                </Typography>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
                  <Button component={Link} to="/register" variant="contained" size="large" sx={{ py: 1.5, px: 4 }}>
                    Get Started for Free
                  </Button>
                </motion.div>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <img 
                  src="/hero-illustration.svg" 
                  alt="Data Analytics Illustration" 
                  style={{ maxWidth: '450px', width: '100%', height: 'auto' }} 
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'grey.100', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 2 }}>
            A Suite of Powerful Features
          </Typography>
          <Typography color="text.secondary" sx={{ textAlign: 'center', mb: 8 }}>
            Everything you need to turn raw data into clear insights.
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{ height: '100%' }}
                >
                  <Paper 
                    component={motion.div}
                    whileHover={{ y: -10, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }}
                    elevation={2} 
                    sx={{ 
                      p: 4, 
                      textAlign: 'center', 
                      borderRadius: 4, 
                      height: '100%',
                      bgcolor: 'background.paper' 
                    }}
                  >
                    {feature.icon}
                    <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }} gutterBottom>
            DataLoom
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
            Making data beautiful and understandable.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;