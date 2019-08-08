import express from 'express';
import userRoutes from './routes/userRoute';
import transactionsRoutes from './routes/transactionsRoute';
import models from './models'

const app = express();

const port = 9999;

app.use(express.json());

app.use('/transaction', transactionsRoutes);
app.use('/user', userRoutes);


models.sequelize.sync({ force: true }).then(() =>{
    app.listen(port);
    console.log(`Running server on port ${port}`);

});


export default app;