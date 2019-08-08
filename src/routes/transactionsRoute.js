import { Router } from 'express';
import { registerTransaction, getAllTransactionsByClient, getClientWallet } from "../controllers/transactions.controller";
import { check, validationResult } from 'express-validator';
import { CPF_REGEX, OPERATION_TYPE } from '../Utils/Utils';
import jwt from 'jsonwebtoken';

const router = Router();
var errors;

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
    verifyToken
    , async (req, res, next) => {

        const errors = validationResult(req);

        jwt.verify(req.headers.authorization, 'secretkey', (err, authData) => {
            if (err) {
                res.status(403).send("Token expirou.");
            } else {
                if (!errors.isEmpty())
                    res.send(errors);
                else {
                    console.log("Calling registerTransaction");
                    next();
                }
            }
        });
    }, registerTransaction);

router.get('/clientTransactions',
    [
        check('user_cpf').not().isEmpty().withMessage("CPF cannot be empty.")
            .matches(CPF_REGEX).withMessage("Invalid cpf format.")
            .exists().withMessage("CPF is required!")
    ],
    (req, res, next) => {

        if (isRequestValid(req))
            next();
        else
            res.send(errors);

    }, getAllTransactionsByClient);


router.get('/balance',
    [
        check('cpf').not().isEmpty().withMessage("CPF cannot be empty.")
            .matches(CPF_REGEX).withMessage("Invalid cpf format.")
            .exists().withMessage("CPF is required!")
    ],
    verifyToken
    , (req, res, next) => {
        const errors = validationResult(req);

        if (isRequestValid(req)) {
            jwt.verify(req.headers.authorization, 'secretkey', (err, authData) => {
                if (err) {
                    res.status(403).send("Token expirou.");
                } else {
                    if (!errors.isEmpty())
                        res.send(errors);
                    else {
                        console.log("Calling getWallet");
                        next();
                    }
                }
            });
        }
}, getClientWallet);


function isRequestValid(req) {
    errors = validationResult(req);
    return errors.isEmpty();
}


function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        next();
    } else {
        res.status(403).send("Status 403");
    }
}


export default router;