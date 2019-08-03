import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
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
)