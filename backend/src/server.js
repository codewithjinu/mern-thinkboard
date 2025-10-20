import express from "express";
import noteRoutes from "./routes/noteRoutes.js"
import { connectDB } from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import rateLimiter from './middleware/rateLimiter.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001
connectDB();

//middleware
app.use(cors({
    origin: "http://localhost:5173",
}));
// app.use(cors({
//     origin: "http://localhost:5173",
// }));
app.use(express.json());// this middleware will parse JSON bodies: req.body
app.use(rateLimiter);


//our simple custome middleware

// app.use((req,res,next)=>{
//     console.log('REquest method is ${req.method} & REq URL is ${req.url}')
//      next();
// });

app.use("/api/notes", noteRoutes);



app.listen(5001, () => {
    console.log("Server started on PORT:5001.");
});

// mongodb+srv://thinkboard_db:<db_password>@cluster0.uidymro.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
