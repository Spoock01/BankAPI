import Sequelize, { Transaction } from 'sequelize';
import { sequelize } from '../database/database';
import transactionModel from './transactionsModel'

const User = sequelize.define('user', {

    full_name: {
        type: Sequelize.STRING
    },
    cpf: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING
    }

});

User.hasMany(Transaction, {foreingKey: 'user_cpf', sourceKey: 'cpf'});
Transaction.belongsTo(User, {foreingKey: 'user_cpf', sourceKey: 'cpf'});

export default User;