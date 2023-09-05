import express, {Request, Response} from 'express';
import { ensure, stop, isRunning } from '../../api/main';

const Route = express.Router();

Route.get("/get", async (req: Request, res: Response) => {
    if (!req.session.auth) return res.sendStatus(403)

    const auth: string = req.session.auth
    const state: boolean = isRunning(auth)

    res.status(200).json({ state })
})

Route.post("/change", async (req: Request, res: Response) => {
    if (!req.session.auth) return res.sendStatus(403)

    const { state } = req.body
    const [status, code] = state ? (
        await ensure(req.session.auth)
    ) : (
        await stop(req.session.auth)
    );

    if (!status) {
        return res.status(400).json({ code, state })
    }

    res.sendStatus(200)
})


export default Route