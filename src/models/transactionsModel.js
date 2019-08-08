export default (sequelize, DataTypes) => {

    const Transaction = sequelize.define('transactions', {

        user_cpf: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        transaction_type: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: Date.now()
        },
        amount:{
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, 
    {
        timestamps: false
    });

    return Transaction;
}
