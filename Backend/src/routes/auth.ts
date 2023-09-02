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
        res.sendStatus(500).json({ error })
    }
})

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const user: IUser | null = await User.findOne({ email, password })
        if (!user) return res.sendStatus(401);

        req.session.auth = user
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500).json({ error })
    }
})

router.get('/logout', async (req : Request, res : Response) => {
    try {
        req.session.destroy(() => res.sendStatus(200))
    } catch (error) {
        res.sendStatus(500).json({error})
    }
})

export default router;