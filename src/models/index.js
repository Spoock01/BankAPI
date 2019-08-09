
import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';

const sequelize = new Sequelize(
    'BankAPI',
    'postgres',
    '1234',{
        host: 'localhost',
        dialect: 'postgres',
        pool:{
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000 
        },
        logging: false
    }
);

const models = {
    User: sequelize.import('./userModel'),
    Transaction: sequelize.import('./transactionsModel')
};

models.sequelize = sequelize;
models.sequelize = sequelize;

export default models;
