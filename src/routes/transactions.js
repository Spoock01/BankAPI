import { Router } from 'express';

const router = Router();

router.get('/operation', (req, res, next) =>{
    res.send("Operation route");
});

router.get('/transactions', (req, res, next) => {
    res.send("Transactions route");
});

export default router;