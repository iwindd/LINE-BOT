import express, { Request, Response } from 'express'
import Config from '../models/ConfigModel'
const Route = express.Router()

Route.post("/set", async (req: Request, res: Response) => {
    try {
        const { key, value } = req.body;
        const userId = req.session.auth;

        if (!userId || !key || !value) {
            return res.sendStatus(400).json({ error: "UserId, 'key', and 'value' are required." });
        }

        const existingConfig = await Config.findOne({ userId, key });

        if (existingConfig) {
            existingConfig.value = value;
            await existingConfig.save();
        } else {
            await Config.create({ userId, key, value });
        }

        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500).json({ error });
    }
});

Route.get("/get", async (req: Request, res: Response) => {
    try {
        const { key } = req.query; // Use req.query to get the 'key' from the query parameters
        const userId = req.session.auth; // Retrieve userId from the session

        if (!key) {
            return res.sendStatus(400).json({ error: "'key' parameter is required in the query." });
        }

        const config = await Config.findOne({ userId, key });

        if (!config) {
            return res.json({ key: key, value: ""});
        }

        return res.json({ key: config.key, value: config.value });
    } catch (error) {
        return res.sendStatus(500).json({ error });
    }
});


export default Route