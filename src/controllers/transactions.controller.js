import models from '../models';
import { OPERATION_TYPE } from '../Utils/Utils'

export async function getAllTransactionsByClient(req, res) {

    try {
        const { user_cpf } = req.query;

        const allTransactions = await models.Transaction.findAll({
            where: { user_cpf }
        });

        res.send(allTransactions);
    } catch (error) {
        res.send(error);
    }

}

async function getUserByCpf(cpf) {

    var current_user = await models.User.findOne({
        where: { cpf }
    });

    return current_user;
}


export async function registerTransaction(req, res, next) {

    // Waiting for token
    models.sequelize.transaction().then( async (tr) =>  {

        const { transaction_type, cpf, amount } = req.query;
        const current_user = await getUserByCpf(cpf);

        if (current_user != null) {
            const { wallet } = current_user;

            var newValue = transaction_type === OPERATION_TYPE[0] ?
                (parseFloat(wallet) + parseFloat(amount)) : 
                parseFloat(wallet) > parseFloat(amount) ? (parseFloat(wallet) - parseFloat(amount)) : false;
                
            if(newValue != false){
                current_user.update({wallet: newValue})
                createOperation(res, current_user, transaction_type, amount);
                tr.commit();
            }else{
                res.send("Saque maior que saldo.");
            }
        }
    }).catch((error) => {
        console.log("catch error: " + error);
        throw new Error();
    })

    
}

async function createOperation (res, current_user, transaction_type, amount){

    const {cpf} = current_user;

    try {

        let newTransaction = await models.Transaction.create({
            user_cpf: cpf,
            transaction_type,
            amount,
        },
        {
            fields: ['user_cpf', 'transaction_type', 'amount']
        });

        if (newTransaction) {
            res.send("Transaction successfully registered!")
        }

    } catch (error) {

        res.json({
            message: "Something goes wrong when creating op.",
            data: {},
            error
        })
    }
}
