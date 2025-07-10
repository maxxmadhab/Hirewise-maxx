// lib/supabase-client.js
// src/lib/supabase-client.js

import { createClient } from '@supabase/supabase-js'

// ⚠️ Hardcoded values (OK for dev, not for public prod)
const supabaseUrl = 'https://gzjlwcmuhnljcescqvvl.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6amx3Y211aG5samNlc2NxdnZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MzA1MjAsImV4cCI6MjA2NzMwNjUyMH0.c0tZ09oXh8271K_0Ks4WgCyJjgIizIZsGdpA2y0cn_o'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
