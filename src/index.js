import express from 'express';
import userRoutes from './routes/userRoute';
import transactionsRoutes from './routes/transactions';

const app = express();

const port = 9999;

app.use(express.json());

app.use('/user', userRoutes);
app.use('/transaction', transactionsRoutes);


app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

export default app;