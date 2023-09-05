import express, { Request, Response } from 'express'
import { onEvent } from '../api/line';
import { WebhookEvent } from '@line/bot-sdk'
import { isRunning } from '../api/main';

const Route = express.Router();

Route.post("/line/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!isRunning(id)) return res.status(500).end();

    try {
        const events = req.body.events;

        return events.length > 0 ? (
            await (events.map((event: WebhookEvent) => {
                onEvent(event, id)
            }))
        ) : (
            res.sendStatus(200)
        )
    } catch (e) {
        console.log("ERROR => ", e);
        res.status(500).end()
    }
})

export default Route