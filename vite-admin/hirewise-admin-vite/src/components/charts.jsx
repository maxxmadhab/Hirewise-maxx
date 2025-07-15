'use client';

import { useEffect, useState } from 'react';
import { User, Building } from 'lucide-react';
import { supabase } from '../../lib/supabase-client';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend
} from 'recharts';

export default function AnalyticsDashboard() {
  const [genderData, setGenderData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch gender distribution from Supabase SQL function
      const { data: genderRaw, error: genderError } = await supabase.rpc('get_gender_distribution');

      if (genderError) {
        console.error('Gender Error:', genderError);
        return;
      }

      const transformedGender = genderRaw.map(item => ({
        name: item.gender === 'Male' ? 'Male' : 'Female',
        value: item.value,
        color: item.gender === 'Male' ? '#3B82F6' : '#EC4899',
      }));

      // Fetch department applications from Supabase SQL function
      const { data: deptRaw, error: deptError } = await supabase.rpc('get_department_applications');

      if (deptError) {
        console.error('Department Error:', deptError);
        return;
      }

      const transformedDept = deptRaw.map(item => ({
        name: item.department,
        applications: item.applications,
      }));

      setGenderData(transformedGender);
      setDepartmentData(transformedDept);

      console.log('✅ Gender Data:', transformedGender);
      console.log('✅ Department Data:', transformedDept);
    };

    fetchData();
  }, []);

  // Custom shape for the pie chart to create a 3D effect
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-6 pb-4">
      {/* Gender Distribution Pie Chart */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <User className="h-5 w-5 mr-2" />
          Gender Distribution
        </h2>
        <div className="h-48">
          {genderData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  innerRadius={40}
                  paddingAngle={2}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1000}
                  animationEasing="ease-out"
                >
                  {genderData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} applicants`, '']}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    padding: '8px 12px'
                  }}
                />
                <Legend 
                  iconType="circle"
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{
                    paddingTop: '10px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-gray-500">No gender data available.</p>
          )}
        </div>
      </div>

      {/* Department Applications Bar Chart */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Building className="h-5 w-5 mr-2" />
          Applications by Department
        </h2>
        <div className="h-48">
          {departmentData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={departmentData}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={{ stroke: '#e5e7eb' }}
                />
                <Tooltip 
                  cursor={{ fill: '#f3f4f6' }}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    padding: '8px 12px'
                  }}
                />
                <Bar 
                  dataKey="applications" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                >
                  {departmentData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill="#3B82F6" 
                      stroke="#2563eb"
                      strokeWidth={index === departmentData.length - 1 ? 1 : 0}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-gray-500">No department data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}