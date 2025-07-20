import { supabase } from '../../lib/supabase-client';

// Register a new user
export async function registerUser({ name, email, phone, password }) {
  // 1. Register with email/password
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });
  if (error) throw error;

  // 2. Insert extra info into profiles table
  if (data.user) {
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      full_name: name,
      phone
    });
    if (profileError) throw profileError;
  }
  return data.user;
}

// Login with email or phone and password
export async function loginUser({ username, password }) {
  let emailToUse = username;
  // If not an email, treat as phone number and look up email
  if (!/^[^@]+@[^@]+\.[^@]+$/.test(username)) {
    // Look up email by phone
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('phone', username)
      .single();
    if (error || !data?.id) throw new Error('Phone number not found');
    // Now get the user's email from auth.users
    const { data: userData, error: userError } = await supabase
      .from('auth.users')
      .select('email')
      .eq('id', data.id)
      .single();
    if (userError || !userData?.email) throw new Error('User email not found');
    emailToUse = userData.email;
  }
  // Now login with email and password
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email: emailToUse,
    password
  });
  if (loginError) throw loginError;
  return loginData.user;
}

// Fetch user profile by user ID
export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
} 