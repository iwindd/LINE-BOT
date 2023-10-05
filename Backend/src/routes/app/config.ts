import express, {Request, Response} from 'express';
import { LoadConfig, SetConfig } from '../../controllers/ConfigController';
import { ConfigKey, ConfigReturn } from '../../typings/config';

const Route = express.Router();

Route.post("/set", async (req: Request, res: Response) => {
    await SetConfig(req.session.auth as string, req.body.value as ConfigReturn | ConfigReturn[])
    res.sendStatus(200)
});

Route.get("/get", async (req: Request, res: Response) => {
    const config = await LoadConfig(req.session.auth as string, req.query.key as ConfigKey | ConfigKey[])
    res.send(config).status(200);
});

export default Route