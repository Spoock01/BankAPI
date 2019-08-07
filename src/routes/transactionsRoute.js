import { Router } from 'express';
import { registerTransaction, getAllTransactionsByClient } from "../controllers/transactions.controller";
import { check, validationResult } from 'express-validator';
import { CPF_REGEX, OPERATION_TYPE } from '../Utils/Utils';

const router = Router();

router.post('/operation',
    [
        check('cpf').matches(CPF_REGEX).withMessage("Invalid cpf format.")
            .exists().withMessage("CPF is required!")
            .not().isEmpty().withMessage("CPF cannot be empty"),
        check('transaction_type').exists().withMessage("Transaction is required.")
            .isIn(OPERATION_TYPE).withMessage("Unsupported transaction! Operations currently supported: " + OPERATION_TYPE)
            .not().isEmpty().withMessage("Transaction type cannot be empty"),
        check('amount').exists().withMessage("Amount is required!")
        .isFloat().withMessage("Amount must be a float number.")
            

    ],
    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty())
            res.send(errors);
        else{
            console.log("Calling registerTransaction")
            next();
        } 
        
    }, registerTransaction);


router.get('/transactions', (req, res, next) => {
    res.send("Transactions route");
});


router.get('/allTransactions',
    [
        check('user_cpf').not().isEmpty().withMessage("CPF cannot be empty.")
            .matches(CPF_REGEX).withMessage("Invalid cpf format.")
            .exists().withMessage("CPF is required!")
    ],
    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty())
            res.send(errors);
        else 
            next();
        

    }, getAllTransactionsByClient);

export default router;