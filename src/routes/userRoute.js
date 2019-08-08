import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import { registerUser, compareUserPassword } from '../controllers/users.controller';
import { CPF_REGEX, FULL_NAME_REGEX } from '../Utils/Utils';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', [
    check('full_name').exists().withMessage("Full name is required")
        .not().isEmpty().withMessage("Full name cannot be empty")
        .not().isNumeric().withMessage("Full name must be a string.")
        .not().matches(FULL_NAME_REGEX).withMessage("Full name must be characters only"),
    check('cpf').exists().withMessage("CPF is required.")
        .not().isEmpty().withMessage("CPF cannot be empty")
        .matches(CPF_REGEX).withMessage("Invalid cpf format."),
    check('password').exists().withMessage("Password is required.")
        .not().isEmpty().isLength({ min: 5 }).withMessage("Password must be at least 5 chars long.")
        .isString().withMessage("Password must be a string.")
], (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty())
        res.send(errors);
    else
        next();

}, registerUser);

router.get('/login', [
    check('cpf').exists().withMessage("CPF is required.")
        .not().isEmpty().matches(CPF_REGEX).withMessage("Invalid cpf format.")
        .not().isAlphanumeric().withMessage("CPF must be a string."),
    check('password').exists().withMessage("Password is required.")
        .not().isEmpty().isLength({ min: 5 }).withMessage('Password must be at least 5 chars long.')
        .isString().withMessage("Password must be a string.")
],async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty())
        res.send(errors);
    else{
        const {cpf, password} = req.query;

        var result = await compareUserPassword(password, cpf);
        console.log("Result: " + result);

        if(result){
            jwt.sign({cpf}, 'secretkey', {expiresIn: '120s'}, (err, token) => {
                res.json({token: token});
            });
        }else{
            console.log("Falso");
            res.status(403).send("Incorrect password!");
        }

    }
});

export default router;