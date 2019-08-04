import Sequelize from 'sequelize';
import { sequelize } from '../database/database';


const Transaction = sequelize.define('transactions', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    user_cpf: {
        type: Sequelize.TEXT,
    },
    transaction_type: {
        type: Sequelize.TEXT
    },
    date: {
        type: Sequelize.DATE
    }
}, 
    {
        timestamps: false
    });

export default Transaction;