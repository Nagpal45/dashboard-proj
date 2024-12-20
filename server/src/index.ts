import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';
import cohortRoutes from './routes/cohort.route';
import studentRoutes from './routes/student.route';
import courseRoutes from './routes/course.route';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

export const prisma = new PrismaClient();

app.use('/api/cohort', cohortRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/course', courseRoutes);

app.listen(5000, ()=>{
    console.log('Server running on port 5000');
})