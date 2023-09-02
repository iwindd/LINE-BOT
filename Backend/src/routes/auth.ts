import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    res.send("REGISTER")
})

router.post('/login', async (req: Request, res: Response) => {
    res.send("LOGIN")
})

export default router;