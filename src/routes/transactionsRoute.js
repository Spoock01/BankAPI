import { Router } from 'express';
import { registerTransaction, getAllTransactionsByClient, getClientWallet } from "../controllers/transactions.controller";
import { check, validationResult } from 'express-validator';
import SECRET_KEY from '../Utils/Utils';
import jwt from 'jsonwebtoken';

const router = Router();
var errors;

router.post('/operation', verifyToken, async (req, res, next) => {

        jwt.verify(req.headers.authorization, 'secretkey', (err, authData) => {
            if (err) {
                res.status(403).send("Token expirou.");
            } else{
                next();
            }
        });
    }, registerTransaction);

router.get('/clientTransactions', (req, res, next) => {

        if (isRequestValid(req))
            next();
        else
            res.send(errors);

    }, getAllTransactionsByClient);


router.get('/balance', verifyToken, (req, res, next) => {

        if (isRequestValid(req)) {

            jwt.verify(req.headers.authorization, SECRET_KEY, (err, authData) => {
                if (err) {
                    res.status(403).send("The token has expired!");
                } else 
                    next();  
                
            });
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