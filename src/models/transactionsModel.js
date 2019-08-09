import { OPERATION_TYPE, CPF_REGEX } from "../Utils/Utils";

export default (sequelize, DataTypes) => {

    const Transaction = sequelize.define('transactions', {

        user_cpf: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isCpf(cpf) {
                    if (!cpf.match(CPF_REGEX)) {
                        throw new Error('Cpf is not valid!');
                    }
                }
            }
        },
        transaction_type: {
            type: DataTypes.TEXT,
            allowNull: false, 
            isIn: {
                args: [OPERATION_TYPE],
                msg: "Unsupported transaction! Operations currently supported: " + OPERATION_TYPE
            }
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: Date.now()
        },
        amount:{
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isFloat: {
                    args: true,
                    msg: "Amount must be float."
                }
            } 
        }
    }, 
    {
        timestamps: false
    });

    return Transaction;
}
