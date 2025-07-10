'use client';

import { useEffect, useState } from 'react';
import { User, Building } from 'lucide-react';
import { supabase } from '../../lib/supabase-client'; // Make sure this path is correct
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
  CartesianGrid,
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-6 pb-4">
      {/* Gender Distribution Pie Chart */}
      <div className="bg-white rounded-lg shadow-sm p-4">
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
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-gray-500">No gender data available.</p>
          )}
        </div>
      </div>

      {/* Department Applications Bar Chart */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Building className="h-5 w-5 mr-2" />
          Applications by Department
        </h2>
        <div className="h-48">
          {departmentData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="#3B82F6" radius={[4, 4, 0, 0]} />
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
