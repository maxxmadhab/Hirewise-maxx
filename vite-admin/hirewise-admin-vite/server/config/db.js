import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'db.gzjlwcmuhnljcescqvvl.supabase.co',
  database: 'postgres',
  password: 'maxxmad',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

export default {
  query: (text, params) => pool.query(text, params),
};
