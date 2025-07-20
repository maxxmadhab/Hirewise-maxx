import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// ⚠️ Hardcoded Supabase credentials – move to environment variables for production!
const supabaseUrl = 'https://gzjlwcmuhnljcescqvvl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Truncated

// Create Supabase client with server-side cookie context
export const supabaseServer = () => {
  const cookieStore = cookies();

  return createServerComponentClient(
    { cookies: () => cookieStore },
    {
      supabaseUrl,
      supabaseKey,
      options: {
        global: {
          headers: { 'x-application-name': 'Faculty Recruitment App' },
        },
      },
    }
  );
};

// ✅ Gender distribution
export async function getGenderDistribution() {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from('faculty_applications')
    .select('gender, count(*)')
    .group('gender');

  if (error) throw error;

  return data.map(item => ({
    name: item.gender === 'Male' ? 'Male' : 'Female',
    value: item.count,
    color: item.gender === 'Male' ? '#3B82F6' : '#EC4899',
  }));
}

// ✅ Department-wise application counts
export async function getDepartmentApplications() {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from('faculty_applications')
    .select('department, count(*)')
    .group('department');

  if (error) throw error;

  return data.map(item => ({
    name: item.department,
    applications: item.count,
  }));
}
