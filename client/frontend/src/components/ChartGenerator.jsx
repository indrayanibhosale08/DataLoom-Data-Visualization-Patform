// client/frontend/src/components/ChartGenerator.jsx
import React, { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ThreeDChart from './ThreeDChart';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Import MUI components
import { Box, Typography, Button, Grid, TextField, MenuItem } from '@mui/material';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const ChartGenerator = ({ excelData }) => {
  const [columns, setColumns] = useState([]);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartType, setChartType] = useState('bar');
  
  const chartRef = useRef(null);
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (excelData && excelData.length > 0) {
      const columnHeaders = Object.keys(excelData[0]);
      setColumns(columnHeaders);
      
      // Robustly set initial values to prevent rendering issues
      if (columnHeaders.length > 0) {
        setXAxis(columnHeaders[0]);
      }
      if (columnHeaders.length > 1) {
        setYAxis(columnHeaders[1]);
      } else if (columnHeaders.length > 0) {
        setYAxis(columnHeaders[0]);
      }
    }
  }, [excelData]);

  const handlePngDownload = () => {
    const chartInstance = chartRef.current;
    if (chartInstance) {
      const imageUrl = chartInstance.toBase64Image();
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `${chartType}-chart.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePdfDownload = async () => {
    const chartContainer = chartContainerRef.current;
    if (!chartContainer) return;
    try {
      const canvas = await html2canvas(chartContainer, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${chartType}-chart.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    }
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: false,
      },
    },
  };

  const renderChart = () => {
    if (chartType === '3dbar') {
      return <ThreeDChart excelData={excelData} xAxis={xAxis} yAxis={yAxis} />;
    }
    if (chartType === 'pie') {
      const pieChartData = {
        labels: excelData?.map(row => row[xAxis]) || [],
        datasets: [{
          label: yAxis,
          data: excelData?.map(row => row[yAxis]) || [],
          backgroundColor: [
            '#42A5F5', '#66BB6A', '#FFA726', '#FF7043', '#8D6E63',
            '#26A69A', '#EC407A', '#7E57C2', '#AB47BC', '#29B6F6'
          ],
          borderColor: '#ffffff',
          borderWidth: 1,
        }],
      };
      return <Pie ref={chartRef} data={pieChartData} options={chartOptions} />;
    }
    const standardChartData = {
      labels: excelData?.map(row => row[xAxis]) || [],
      datasets: [{
        label: `${yAxis} by ${xAxis}`,
        data: excelData?.map(row => row[yAxis]) || [],
        backgroundColor: chartType === 'bar' ? 'rgba(66, 165, 245, 0.6)' : 'rgba(66, 165, 245, 0.2)',
        borderColor: 'rgba(66, 165, 245, 1)',
        borderWidth: 1,
        fill: chartType === 'line',
      }],
    };
    if (chartType === 'line') {
      return <Line ref={chartRef} data={standardChartData} options={chartOptions} />;
    }
    return <Bar ref={chartRef} data={standardChartData} options={chartOptions} />;
  };

  if (!excelData || excelData.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center', border: '2px dashed grey.300', borderRadius: 2 }}>
        <Typography color="text.secondary">Upload a file to begin analysis.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField 
            select 
            fullWidth 
            label="X-Axis (Labels)" 
            value={xAxis} 
            onChange={(e) => setXAxis(e.target.value)} 
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          >
            {columns.map(col => <MenuItem key={col} value={col}>{col}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField 
            select 
            fullWidth 
            label="Y-Axis (Values)" 
            value={yAxis} 
            onChange={(e) => setYAxis(e.target.value)} 
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          >
            {columns.map(col => <MenuItem key={col} value={col}>{col}</MenuItem>)}
          </TextField>
        </Grid>
      </Grid>
      
      <Box ref={chartContainerRef} sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        {renderChart()}
      </Box>

      <Box sx={{ mt: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
        <Box sx={{ width: { xs: '100%', md: '250px' } }}>
          <TextField select fullWidth label="Chart Type" value={chartType} onChange={(e) => setChartType(e.target.value)} variant="outlined" size="small" InputLabelProps={{ shrink: true }}>
            <MenuItem value="bar">Bar Chart</MenuItem>
            <MenuItem value="line">Line Chart</MenuItem>
            <MenuItem value="pie">Pie Chart</MenuItem>
            <MenuItem value="3dbar">3D Bar Chart</MenuItem>
          </TextField>
        </Box>
        {chartType !== '3dbar' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="outlined" onClick={handlePngDownload}>Download as PNG</Button>
            <Button variant="outlined" color="secondary" onClick={handlePdfDownload}>Download as PDF</Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChartGenerator;