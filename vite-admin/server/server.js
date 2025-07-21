import express from 'express';
import cors from 'cors';
import applicationsRoute from './routes/applications.js'; // <-- Make sure the path is correct

const app = express();

// Middlewares
const allowedOrigins = [
  "https://hirewise-maxxf2.onrender.com", // old Render frontend (optional)
  "https://hirewise-maxx-git-main-madhabs-projects-e78e2689.vercel.app" // ✅ new Vercel frontend
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.use(express.json());

// Test route
app.get("/api", (req, res) => {
  res.json({ users: ["maxx1", "maxx2", "maxx3"] });
});

// Faculty application route
app.use("/api/applications", applicationsRoute);

// Start server


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
