import express from 'express';
import cors from 'cors';
import applicationsRoute from './routes/applications.js'; // <-- Make sure the path is correct

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/api", (req, res) => {
  res.json({ users: ["maxx1", "maxx2", "maxx3"] });
});

// Faculty application route
app.use("/api/applications", applicationsRoute);

// Start server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
