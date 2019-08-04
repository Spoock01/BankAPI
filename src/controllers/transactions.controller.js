import Transaction from '../models/transactionsModel';

export async function getAllTransactionsByClient(req, res){
    
    try{
        const { user_cpf } = req.query;
        console.log(user_cpf);
        const allTransactions = await Transaction.findAll({
            where: {user_cpf} 
        });

        res.json(allTransactions);
    }catch(error){
        res.send(error)
    }

}


export async function registerTransaction(req, res) {

    // Waiting for token

    const { transaction_type, cpf } = req.query;

    try {

        let newTransaction = await Transaction.create({
            user_cpf: cpf,
            transaction_type,
        },
            {
                fields: ['user_cpf', 'transaction_type']
            });

        if (newTransaction) {
            res.status(200).send("Transaction successfully created!")
        }

    } catch (error) {

        res.status(500).json({
            message: "Something goes wrong.",
            data: {},
            error
        })
    }
    
}
