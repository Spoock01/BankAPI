import Sequelize from 'sequelize';
import { sequelize } from '../database/database';


const Transaction = sequelize.define('transactions', {

    date: {
        type: Sequelize.DATE
    },
    type: {
        type: Sequelize.STRING
    },
    user_cpf: {
        type: Sequelize.STRING,
        primaryKey: true
    }

    },{
        timestamps: false
});

export default Transaction;