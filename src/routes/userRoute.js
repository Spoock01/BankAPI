import { Router } from 'express';
import { registerUser, compareUserPassword } from '../controllers/users.controller';
import { SECRET_KEY } from '../Utils/Utils';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', registerUser);

router.post('/login', async (req, res) => {

    const {cpf, password} = req.query;

    var result = await compareUserPassword(password, cpf);

    if(result){
        jwt.sign({cpf}, SECRET_KEY, {expiresIn: '1800s'}, (err, token) => {
            res.json({token: token});
        });
    }else
        res.status(401).json({error: "You have entered an invalid cpf or password."});
   
});

export default router;