
import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './database/dbConnection.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config({path: "./config/.env"});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// This is connected with frontend:-
app.use(
  cors({
    origin: [process.env.CLIENT_URI],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ----------------------------------Routes--------------------------------------------------  //
import userRouter from './routes/userRoute.js';
import employeeRouter from './routes/employeeRoute.js';
import { errorMiddleware } from './middlewares/error.js';
import authenticateRoute from './routes/authenticateRoute.js';

app.use('/api/v1/user', userRouter);
app.use('/api/v1/employee', employeeRouter);
app.use('/api/v1/authenticate', authenticateRoute);


app.use(errorMiddleware);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, async()=>{
    await dbConnection();
    console.log(`Server listen on ${PORT}`)
})