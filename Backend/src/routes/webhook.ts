import express, {Request, Response} from 'express'

const Route = express.Router();

Route.post("/line", (req : Request, res : Response) => {
    console.log("WEBHOOK >>");
})

export default Route