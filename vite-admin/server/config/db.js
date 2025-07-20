// db/config.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gzjlwcmuhnljcescqvvl.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6amx3Y211aG5samNlc2NxdnZsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTczMDUyMCwiZXhwIjoyMDY3MzA2NTIwfQ.NpftP_xUgtoporS5WjSHK5xix0yjBhmErUoV3bIo6QY';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default supabase;
