import { Button, Divider, FormControl, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Detail() {
    const { t } = useTranslation();

    return (
        <FormControl fullWidth>
            <div className='flex justify-between p-4'>
                <Typography variant='h5'>
                    {t("rooms.detail.header")}
                </Typography>
            </div>
            <Divider />
            <div className='flex flex-col gap-2 p-2 px-6'>
                <TextField label={t("rooms.detail.name")}></TextField>
                <TextField label={t("rooms.detail.description")}></TextField>
                <input type="file" name="images" id="images" multiple accept="image/jpeg, image/png"/>
            </div>
        </FormControl>
    )
}

export default Detail