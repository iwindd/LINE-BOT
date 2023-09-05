import express, { Request, Response } from 'express'
import { LoadConfig, SetConfig } from '../controllers/ConfigController';
import { ConfigKey, ConfigReturn } from '../typings/config';
import { ensure, stop, isRunning } from '../api/main';
const Route = express.Router()

/* CONFIG */
Route.post("/config/set", async (req: Request, res: Response) => {
    if (!req.session.auth) return res.sendStatus(403)

    await SetConfig(req.session.auth, req.body.value as ConfigReturn | ConfigReturn[])
    res.sendStatus(200)
});

Route.get("/config/get", async (req: Request, res: Response) => {
    if (!req.session.auth) return res.sendStatus(403)

    const config = await LoadConfig(req.session.auth, req.query.key as ConfigKey | ConfigKey[])
    res.send(config).status(200);
});


/* STATE */
Route.get("/state/get", async (req: Request, res: Response) => {
    if (!req.session.auth) return res.sendStatus(403)

    const auth: string = req.session.auth
    const state: boolean = isRunning(auth)

    res.status(200).json({ state })
})

Route.post("/state/change", async (req: Request, res: Response) => {
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