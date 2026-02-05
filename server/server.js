import express from "express";
import "dotenv/config";
import cors from "cors";

import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoute.js";

const app = express();

/* -------------------- Middleware -------------------- */
app.use(
  cors({
    origin: "*", // later you can restrict to frontend domain
    credentials: true,
  }),
);

app.use(express.json());

/* -------------------- Routes -------------------- */
app.get("/", (req, res) => {
  res.send("API is working");
});

app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

/* -------------------- Server Start -------------------- */
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();

export default app;
