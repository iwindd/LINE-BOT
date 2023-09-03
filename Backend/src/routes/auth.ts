import express, { Request, Response } from 'express';
import App, { IApp } from '../models/AppModel';
import auth from '../middlewares/auth';
import guest from '../middlewares/guest';
const router = express.Router();

/* DEBUG */
router.post('/add', async (req : Request, res: Response) => {
    try{
        const { 
            email,
            username,
            password,
            type
        } = req.body

        await App.create({email, username, password, type})
        res.sendStatus(200)
    } catch(error){
        res.sendStatus(500).json({error})
    }
})

router.post('/login', guest, async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const user: IApp | null = await App.findOne({ email, password })
        if (!user) return res.sendStatus(401);

        req.session.auth = user._id
        res.json({
            auth: req.session.auth
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
    try {
        const auth = req.session.auth
        const user: IApp | null = await App.findById(auth)
        if (!user) return res.sendStatus(401);

        res.json({
            auth: user
        });
    } catch (error) {
        res.sendStatus(500).json({ error })
    }
})

export default router;