import React from 'react'
import { TextField, FormControl, Typography, Box, Button, Divider } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Close, Edit, Save } from '@mui/icons-material';
import Confirmation from '../../../components/dialogs/confirmation';

function Config() {
    const { t } = useTranslation();

    const [isEdit, setEdit] = React.useState<boolean>(false);
    const [isConfirmation, setConfirmation] = React.useState<boolean>(false);

    return (
        <FormControl fullWidth className='h-full p-0'>
            <header className='w-full my-2'>
                <Typography variant='h5' className='mb-5'>
                    {t("config.synthia.title")}
                </Typography>
            </header>

            <Box className="px-6 py-4">
                <TextField
                    fullWidth
                    placeholder={t("line.channel_secret")}
                    label={t("line.channel_secret")}
                    type='password'
                    disabled={!isEdit}
                    focused={!isEdit}
                />
            </Box>

            <Box className="mt-auto ">
                <Divider />
                <div className='flex justify-between m-2 flex-row-reverse '>
                    <Button
                        startIcon={<Edit />}
                        onClick={() => setEdit(true)}
                        sx={{
                            display: isEdit ? "none" : undefined
                        }}
                    >
                        {t("text.edit")}
                    </Button>

                    {/*  */}
                    <Confirmation
                        title={t("config.synthia.confirmation.title")}
                        text={t("config.synthia.confirmation.text")}
                        state={isConfirmation}
                        setState={setConfirmation}
                        confirm={() => {

                        }}
                    />

                    <Button
                        startIcon={<Close />}
                        onClick={() => setEdit(false)}
                        sx={{
                            display: !isEdit ? "none" : undefined
                        }}
                    >
                        {t("text.cancel")}
                    </Button>

                    <Button
                        startIcon={<Save />}
                        onClick={() => setConfirmation(true)}
                        sx={{
                            display: !isEdit ? "none" : undefined
                        }}
                    >
                        {t("text.save")}
                    </Button>
                </div>
            </Box>
        </FormControl>
    )
}

export default Config