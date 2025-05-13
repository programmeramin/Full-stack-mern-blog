import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoDBConnect from './config/MongoDB.js';
import authRoute from './routes/authRoute.js';
import postRoute from './routes/postRoute.js';
import userRoutes from './routes/userRoute.js'
import commentRoute from './routes/commentRoutes.js';
import contactRoute from "./routes/contactRoute.js"

// dotenv config
dotenv.config();
const PORT = process.env.PORT || 6060;
         
// app config
const app = express();

app.use(
  cors({
    origin: process.env.VITE_APP_URL,
    credentials: true,
  })
);

app.use(cookieParser());

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app route
app.get("/", (req, res) =>{
  res.json("Hello world")
});

// server routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoutes);
app.use('/api/blog', postRoute);
app.use("/api/comments", commentRoute);
app.use("/api", contactRoute);
  
// lisetening server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  mongoDBConnect();
});   
