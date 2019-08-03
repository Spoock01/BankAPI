import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import CPF_REGEX from '../Utils/Utils';
import FULL_NAME_REGEX from '../Utils/Utils';

const router = Router();

// TODO Mudar query to Body

router.post('/register', [
    check('full_name').exists().withMessage("Full name is required")
    .not().isEmpty().withMessage("Full name cannot be empty")
    .not().isNumeric().withMessage("Full name must be a string.")
    .matches(FULL_NAME_REGEX).withMessage("Full name must be characters only"),

    check('cpf').exists().withMessage("CPF is required.")
    .not().isEmpty().withMessage("CPF cannot be empty")
    .matches(CPF_REGEX).withMessage("Invalid cpf format."),

    check('password').exists().withMessage("Password is required.")
    .not().isEmpty().isLength({ min: 5 }).withMessage("Password must be at least 5 chars long.")
    .isString().withMessage("Password must be a string.")   
], (req, res, next) =>{

    console.log(req.query)

    const errors = validationResult(req);

    if(!errors.isEmpty())
        res.send(errors);
    else
        res.send(req.query);

});

router.get('/login', [
    check('cpf').exists().withMessage("CPF is required.")
    .not().isEmpty().matches(CPF_REGEX).withMessage("Invalid cpf format.")
    .not().isAlphanumeric().withMessage("CPF must be a string."),
    check('password').exists().withMessage("Password is required.")
    .not().isEmpty().isLength({ min: 5 }).withMessage('Password must be at least 5 chars long.')
    .isString().withMessage("Password must be a string.")   
], (req, res, next) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty())
        res.send(errors);
    else
        res.send("Validated");

});


export default router;