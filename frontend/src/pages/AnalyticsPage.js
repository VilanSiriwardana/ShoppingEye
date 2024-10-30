import React from "react";
import SidebarIcon from "../components/sidebar/SidebarIcon";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  ComposedChart,
  Area,
  Pie,
  Cell,
} from "recharts";
import "./Analytics.css";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import { useProductContext } from './ProductContext';

const data = [
  { name: "Total Products", pv: 8 },
  { name: "Wishlist Products", pv: 12 },

];

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const generatePDF = async (productCount) => {
  const chartElements = document.querySelectorAll('.chart');
  const chartImages = [];

  for (let i = 0; i < chartElements.length; i++) {
    const chartCanvas = await html2canvas(chartElements[i]);
    const chartImg = chartCanvas.toDataURL("image/png");
    chartImages.push(`<img src="${chartImg}" style="width: 100%; height: auto;" />`);
  }

  const pdfContent = `
  <div style="font-family: Arial, sans-serif; margin: 20px;">
    <h2 style="text-align: center; color: #333;">Shop Analytics</h2>
    <h3 style="color: #555;">Summary</h3>
    <table border="1" cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse; border: 2px solid #ccc;">
      <thead>
        <tr style="background-color: #f2f2f2;">
          <th style="border: 1px solid #ccc; text-align: left;">Total Products</th>
          <th style="border: 1px solid #ccc; text-align: left;">Wishlist Added</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #ccc; text-align: left;">${productCount}</td>
          <td style="border: 1px solid #ccc; text-align: left;">12</td>
        </tr>
      </tbody>
    </table>
    
    <h3 style="color: #555;">Charts</h3>
    <div style="display: flex; flex-direction: column; align-items: center;">
      ${chartImages.join('')}
    </div>
  </div>
`;


  const element = document.createElement("div");
  element.innerHTML = pdfContent;

  const opt = {
    margin: 1,
    filename: 'shop_analytics.pdf',
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().from(element).set(opt).save();
};

export default function AnalyticsPage() {
  const { productCount } = useProductContext();

  return (
    <div className="analytics-container">
      <SidebarIcon />
      <main className="main-content">
        <div className="main-title">
          <h3>ANALYTICS DASHBOARD</h3>
          <button className="download-btn" onClick={() => generatePDF(productCount)}>Download Analytics</button>
        </div>

        <div id="analytics-content" className="main-cards">
          <div className="card">
            <div className="card-inner">
              <h3>TOTAL PRODUCTS</h3>
            </div>
            <h1>{productCount}</h1>
          </div>

          <div className="card">
            <div className="card-inner">
              <h3>WISHLIST ADDED</h3>
            </div>
            <h1>12</h1>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts">
          <div className="chart-row">
            <div className="chart">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" fill="#8884d8" />
                  <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        
        </div>
      </main>
    </div>
  );
}
