import express, { Request, Response } from 'express';
import User, { IUser } from '../models/UserModel';
import auth from '../middlewares/auth';
import guest from '../middlewares/guest';

const router = express.Router();

router.post('/login', guest, async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const user: IUser | null = await User.findOne({ email, password })
        if (!user) return res.sendStatus(401);

        req.session.auth = user
        res.json({
            auth: {
                ...user,
                ...{
                    password: undefined
                }
            }
        });
    } catch (error) {
        res.sendStatus(500).json({ error })
    }
})

router.get('/logout', auth, async (req: Request, res: Response) => {
    try {
        req.session.destroy(() => res.sendStatus(200))
    } catch (error) {
        res.sendStatus(500).json({ error })
    }
})

router.get('/user', auth, async (req: Request, res: Response) => {
    const auth = req.session.auth;
    res.json({ auth })
})

export default router;