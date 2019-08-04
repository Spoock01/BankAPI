import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Transaction from './transactionsModel'


const User = sequelize.define('user', {

    full_name: {
        type: Sequelize.TEXT
    },
    cpf: {
        type: Sequelize.TEXT,
        primaryKey: true
    },
    password: {
        type: Sequelize.TEXT
    }

}, {
        timestamps: false
    });

// User.hasMany(Transaction, { foreingKey: 'user_cpf', sourceKey: 'cpf' });
// Transaction.belongsTo(User, { foreingKey: 'user_cpf', sourceKey: 'cpf' });

export default User;