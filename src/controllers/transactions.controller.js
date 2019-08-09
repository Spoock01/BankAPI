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

export async function getClientWallet(req, res){

    const { cpf } = req.query;

    var user = await models.User.findOne({
        where: { cpf }
    });

    if (user != null){

        const { cpf, wallet } = user;
    
        res.json({
            user: cpf,
            current_wallet: wallet
        });
    } 
    else
        res.status(404).send("User not found!");

}

export async function getUserByCpf(cpf) {

    var current_user = await models.User.findOne({
        where: { cpf }
    });

    return current_user;
}

export async function registerTransaction(req, res) {

    try{
    models.sequelize.transaction().then(async () => {

        const { transaction_type, cpf, amount } = req.query;
        const current_user = await getUserByCpf(cpf);
        var newValue = 0;

        if (current_user != null) {
            const { wallet } = current_user;

            if(transaction_type === OPERATION_TYPE[0]){
                newValue = (parseFloat(wallet) + parseFloat(amount));
            }else if (transaction_type === OPERATION_TYPE[1] && parseFloat(wallet) >= parseFloat(amount)){
                newValue = (parseFloat(wallet) - parseFloat(amount));
            }else{
                newValue = -1;
            }

            if (newValue >= 0) {
                current_user.update({ wallet: newValue });
                createOperation(res, current_user, transaction_type, amount);
            } 
            else 
                res.send("Insufficient funds.");
            
        }else{
            res.status(403).send("Forbidden");
        }
    })
    }
    catch(error){
        console.log("Um erro ocorreu ao processar a transação! Tente novamente mais tarde.");
    };
}

async function createOperation(res, current_user, transaction_type, amount) {

    const { cpf } = current_user;

    try {

        await models.Transaction.create({
            user_cpf: cpf,
            transaction_type,
            amount
        },
        {
            fields: ['user_cpf', 'transaction_type', 'amount']
        });

        res.send("Transaction successfully registered!");        

    } catch (error) {

        res.json({
            message: "Something goes wrong when creating op.",
            data: {},
            error
        });
    }
}
