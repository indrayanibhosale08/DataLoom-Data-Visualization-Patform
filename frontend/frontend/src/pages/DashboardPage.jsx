// frontend/src/pages/DashboardPage.jsx
import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2'; // Import more chart types
import {
  Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend
} from 'chart.js';
import Layout from '../components/Layout'; // Use our layout
import { uploadExcel } from '../services/api'; // Use our API service

// Register all necessary components for Chart.js
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const DashboardPage = () => {
  const [file, setFile] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // ⭐ State for dynamic controls
  const [headers, setHeaders] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartType, setChartType] = useState('bar');

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return setError('Please select a file.');
    setLoading(true);
    setError('');
    // Reset previous state
    setChartData(null);
    setHeaders([]);
    setRawData([]);

    const formData = new FormData();
    formData.append('excelFile', file);
    
    try {
      // Use the service function now
      const { data } = await uploadExcel(formData);
      setHeaders(data.headers);
      setRawData(data.data);
      // Set default axes if possible
      if (data.headers.length > 0) setXAxis(data.headers[0]);
      if (data.headers.length > 1) setYAxis(data.headers[1]);
    } catch (err) {
      setError(err.response?.data?.message || 'File upload failed.');
    } finally {
      setLoading(false);
    }
  };

  const generateChart = () => {
    if (!xAxis || !yAxis || rawData.length === 0) {
      return setError('Please select both X and Y axes.');
    }
    setError('');

    const dataForChart = {
      labels: rawData.map(item => item[xAxis]),
      datasets: [{
        label: `${yAxis} by ${xAxis}`,
        data: rawData.map(item => item[yAxis]),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }],
    };
    setChartData(dataForChart);
  };
  
  const ChartComponent = () => {
    if (!chartData) return null;
    switch (chartType) {
      case 'line': return <Line data={chartData} options={chartOptions} />;
      case 'pie': return <Pie data={chartData} options={chartOptions} />;
      case 'bar':
      default:
        return <Bar data={chartData} options={chartOptions} />;
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' }, title: { display: true, text: 'Data Visualization' } },
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Controls Column */}
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Controls</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">1. Upload File</label>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="...tailwind classes..."/>
            <button onClick={handleUpload} disabled={loading || !file} className="...tailwind classes...">
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>

          {headers.length > 0 && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">2. Select Chart Type</label>
                <select value={chartType} onChange={(e) => setChartType(e.target.value)} className="...tailwind classes...">
                  <option value="bar">Bar Chart</option>
                  <option value="line">Line Chart</option>
                  <option value="pie">Pie Chart</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">3. Select X-Axis (Labels)</label>
                <select value={xAxis} onChange={(e) => setXAxis(e.target.value)} className="...tailwind classes...">
                  {headers.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">4. Select Y-Axis (Values)</label>
                <select value={yAxis} onChange={(e) => setYAxis(e.target.value)} className="...tailwind classes...">
                   {headers.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
              <button onClick={generateChart} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                Generate Chart
              </button>
            </>
          )}
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>

        {/* Chart Display Column */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Chart Visualization</h2>
          <div className="relative" style={{ height: '500px' }}>
            {chartData ? <ChartComponent /> : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Upload a file and generate a chart to see it here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;