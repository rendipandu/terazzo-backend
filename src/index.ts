import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
// import roleRoutes from './routes/roleRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
// app.use('/role', roleRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});