import express from 'express';

const app = express();

app.get("/api", (req, res) => {
  res.json({ users: ["maxx1", "maxx2", "maxx3"] });
});


app.listen(5000, () => {
  console.log("Server started on port 5000");
});
