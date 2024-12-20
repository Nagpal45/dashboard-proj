import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

export const prisma = new PrismaClient();

app.listen(3000, ()=>{
    console.log('Server running on port 3000');
})