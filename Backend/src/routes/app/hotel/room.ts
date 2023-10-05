import express from 'express';
import { upload } from '../../../components/multer';
import { Create } from '../../../controllers/Hotel/RoomController';
const Route = express.Router();

Route.post("/create", upload.array("image", 5), (req, res) => {
    const { name, description } = req.body;
    const images: string[] = [];

    (req.files as any).map((file: any) => {
        images.push(file.filename);
    })

    const payload = {
        appId: req.session.auth as string,
        images: images,
        title: name as string,
        description: description as string,
    }

    Create(payload).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(500)
    })
})

export default Route