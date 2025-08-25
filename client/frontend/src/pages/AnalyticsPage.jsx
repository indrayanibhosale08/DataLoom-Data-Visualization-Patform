// client/frontend/src/pages/AnalyticsPage.jsx
import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import ChartGenerator from "../components/ChartGenerator";
import AiInsights from "../components/AiInsights";

// Import MUI components
import { Grid, Paper, Typography, Box } from "@mui/material";

const AnalyticsPage = () => {
  const [excelData, setExcelData] = useState(null);
  const [historyId, setHistoryId] = useState(null); // <-- Add state for the ID

  const handleUploadSuccess = (data) => {
    setExcelData(data.jsonData);   // <-- Update to get jsonData
    setHistoryId(data.historyId); // <-- Update to get historyId
  };

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        Analytics
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <FileUpload onUploadSuccess={handleUploadSuccess} />
            <AiInsights excelData={excelData} />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{ mb: 2, fontWeight: "bold" }}
            >
              Data Visualization
            </Typography>
             <ChartGenerator excelData={excelData} historyId={historyId} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsPage;
