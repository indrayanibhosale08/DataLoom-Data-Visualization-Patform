// // client/src/components/AiInsights.jsx
// import React, { useState } from 'react';
// import axios from 'axios';

// const AiInsights = ({ excelData }) => {
//   const [insights, setInsights] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleGenerateInsights = async () => {
//     setLoading(true);
//     setError('');
//     setInsights('');

//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.post(
//         'http://localhost:5000/api/ai/generate-insights',
//         { jsonData: excelData }, // Send the data in the request body
//         { headers: { 'x-auth-token': token } }
//       );
//       setInsights(res.data.insights);
//     } catch (err) {
//       setError('Failed to generate insights. Please try again.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!excelData || excelData.length === 0) {
//     return null; // Don't show anything if there's no data
//   }

//   return (
//     <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
//       <h3 className="text-xl font-semibold mb-4">AI-Powered Insights</h3>
//       <button
//         onClick={handleGenerateInsights}
//         disabled={loading}
//         className="w-full px-4 py-2 font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none disabled:bg-purple-300"
//       >
//         {loading ? 'Analyzing...' : 'Generate Auto-Insights'}
//       </button>

//       {error && <div className="mt-4 p-3 text-sm text-white bg-red-500 rounded-lg">{error}</div>}
      
//       {insights && (
//         <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//           <h4 className="font-semibold mb-2">Analysis Results:</h4>
//           {/* Using <pre> preserves whitespace and line breaks from the AI's response */}
//           <pre className="whitespace-pre-wrap font-sans text-gray-700">{insights}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AiInsights;



// client/frontend/src/components/AiInsights.jsx
import React, { useState } from 'react';
import axios from 'axios';

// Import MUI components
import { Button, Paper, Typography, Box, Alert, CircularProgress } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const AiInsights = ({ excelData }) => {
  const [insights, setInsights] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateInsights = async () => {
    setLoading(true);
    setError('');
    setInsights('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/ai/generate-insights', { jsonData: excelData }, {
        headers: { 'x-auth-token': token },
      });
      setInsights(res.data.insights);
    } catch (err) {
      setError('Failed to generate insights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!excelData || excelData.length === 0) {
    return null; // Don't render if there's no data
  }

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
        AI-Powered Insights
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={handleGenerateInsights}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} color="inherit"/> : <AutoAwesomeIcon />}
      >
        {loading ? 'Analyzing...' : 'Generate Auto-Insights'}
      </Button>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      
      {insights && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Analysis Results:</Typography>
          <Typography component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.875rem' }}>
            {insights}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default AiInsights;