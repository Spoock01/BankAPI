import express from 'express';
import userRoutes from './routes/userRoute';
import transactionsRoutes from './routes/transactionsRoute';

const app = express();

const port = 9996;

app.use(express.json());

app.use('/transaction', transactionsRoutes);
app.use('/user', userRoutes);


app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

export default app;