import express from 'express'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import adminRoutes from './routes/admin.routes.js'
import cookieParser from "cookie-parser";
import { connectToDB } from './db/db.js';
import path from 'path'
import cors from 'cors' 
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(cors({
    origin: ['http://localhost:5000','http://localhost:3000'] ,
    credentials: true 
}));


app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
});
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname , "/frontend/dist")))


app.use('/api/user' , userRoutes)
app.use("/api/auth", authRoutes);
app.use('/api/admin' , adminRoutes)



app.get("*" , (req,res)=> {
    res.sendFile(path.join(__dirname , "frontend" , "dist" , "index.html"
    ))
})

app.listen(3000, ()=>{
    console.log(`server listening on port 3000`)
    connectToDB()
})