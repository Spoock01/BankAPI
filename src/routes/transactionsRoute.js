import { Router } from 'express';
import { registerTransaction, getAllTransactionsByClient, getClientWallet } from "../controllers/transactions.controller";
import { check, validationResult } from 'express-validator';
import { SECRET_KEY, CPF_REGEX }  from '../Utils/Utils';
import jwt from 'jsonwebtoken';

const router = Router();
var errors;

router.post('/operation', verifyToken, async (req, res, next) => {

        jwt.verify(req.headers.authorization, SECRET_KEY, (err, authData) => {
            if (err) {
                res.status(403).send("Token expirou.");
            } else{
                next();
            }
        });
    }, registerTransaction);

router.get('/clientTransactions',
[
    check('cpf').not().isEmpty().withMessage("CPF cannot be empty.")
        .matches(CPF_REGEX).withMessage("Invalid cpf format.")
        .exists().withMessage("CPF is required!")
],

(req, res, next) => {

    const error = validationResult(req);
    if(error.isEmpty()){
        next();
    }else{
        res.status(401).json(error);
    }
}, getAllTransactionsByClient);


router.get('/balance', verifyToken, 
[
    check('cpf').not().isEmpty().withMessage("CPF cannot be empty.")
        .matches(CPF_REGEX).withMessage("Invalid cpf format.")
        .exists().withMessage("CPF is required!")
],

(req, res, next) => {

    const error = validationResult(req);

    if(error.isEmpty()){
        jwt.verify(req.headers.authorization, SECRET_KEY, (err, authData) => {
            if (err) {
                res.status(403).send("The token has expired!");
            } else 
                next();  
        });
    }else{
        res.status(401).json(error);
    }
}, getClientWallet);




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