import React from 'react';
import { Divider, FormControl, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import axios from '../../../components/Axios';

function Detail() {
    const { t } = useTranslation();

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [images, setImages] = React.useState<any>(null);

    const onSubmit = () => {
        console.log('submit');

        const fd = new FormData();
        fd.append("name", name);
        fd.append("description", description);
        for (let i = 0; i < images.length; i++) {
            fd.append('image', images[i]);
        }

        axios.post("/app/hotel/room/create", fd, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }

    return (
        <FormControl fullWidth >
            <div className='flex justify-between p-4'>
                <Typography variant='h5'>
                    {t("rooms.detail.header")}
                </Typography>
            </div>
            <Divider />
            <div className='flex flex-col gap-2 p-2 px-6'>
                <TextField label={t("rooms.detail.name")} onChange={e => setName(e.target.value)}></TextField>
                <TextField label={t("rooms.detail.description")} onChange={e => setDescription(e.target.value)}></TextField>
                <input type="file" name="images" id="images" onChange={(e) => setImages(e.target.files)} multiple accept="image/jpeg, image/png" />
            </div>

            <button type="submit" onClick={onSubmit}>SUBMIT</button>
        </FormControl>
    )
}

export default Detail