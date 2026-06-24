import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, ingestFunctions } from "./inngest/index.js";


const app = express();

const PORT = process.env.PORT || 3000;

// Connect Database
await connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// Inngest Endpoint
app.use(
  "/api/ingest",
  serve({
    client: inngest,
    functions: ingestFunctions,
  })
);

// Test Route
app.get("/", (req, res) => {
  res.send("Server is Live");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});