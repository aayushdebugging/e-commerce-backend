import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';



import connectDB from './config/db.js';

//dot env config
dotenv.config();


//database connnection
connectDB();

//rest object
const app = express()


//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());



//route
//routes import
import testRoutes from './routes/testRoute.js';
import userRoutes from './routes/userRoutes.js';


app.use('/api/v1',testRoutes);
app.use('/api/v1/user',userRoutes);



app.get('/' ,(req,res)=>{
    return res.status(200).send("<h1>Welcome to the Node App</h1>");
});


//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT , ()=>{
    console.log(`Server Running on PORT ${process.env.PORT}`.bgMagenta.white);
});