import express, { Request, Response } from 'express';
import User, { IUser } from '../models/UserModel';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500).json({ error: error })
    }
})

router.post('/login', async (req: Request, res: Response) => {
    res.send("LOGIN")
})

export default router;