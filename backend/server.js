import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 3000;
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";

const app = express();

connectDB()

app.use("/api/user", userRoutes);

app.get("/", (req, res) => res.send("server ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server started @http://localhost:${port}`))