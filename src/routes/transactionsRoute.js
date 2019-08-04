import { Router } from 'express';
import { registerTransaction, getAllTransactionsByClient } from "../controllers/transactions.controller";
import { check, validationResult } from 'express-validator';
import { CPF_REGEX, OPERATION_TYPE } from '../Utils/Utils';

const router = Router();

router.post('/operation', [
    check('cpf').not().isEmpty().withMessage("CPF cannot be empty")
        .matches(CPF_REGEX).withMessage("Invalid cpf format.")
        .exists().withMessage("CPF is required!"),
    check('transaction_type').exists().withMessage("Transaction is required.")
        .not().isIn(OPERATION_TYPE).withMessage("Unsupported transaction!")
        .not().isEmpty().withMessage("Transaction type cannot be empty")
        
], (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty())
        res.send(errors);
    else{
        next();
    }
}, registerTransaction);


router.get('/transactions', (req, res, next) => {
    res.send("Transactions route");
});


router.get('/allTransactions', [
    check('user_cpf').not().isEmpty().withMessage("CPF cannot be empty.")
        .matches(CPF_REGEX).withMessage("Invalid cpf format.")
        .exists().withMessage("CPF is required!")
],(req, res, next) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty())
        res.send(errors);
    else{
        next();
    }

}, getAllTransactionsByClient);

export default router;