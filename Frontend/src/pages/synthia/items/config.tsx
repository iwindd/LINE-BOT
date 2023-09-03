import React from 'react'
import { TextField, FormControl, Typography, Box, Button, Divider } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Close, Edit, Save } from '@mui/icons-material';
import { useMutation, useQuery } from 'react-query';
import Confirmation from '../../../components/dialogs/confirmation';
import axios from '../../../components/Axios';


function Config() {
    const { t } = useTranslation();

    const [channel_secret, setChannelSecret] = React.useState<string>("");
    const [channel_access_token, setChannelAccessToken] = React.useState<string>("");
    const [isEdit, setEdit] = React.useState<boolean>(false);
    const [isConfirmation, setConfirmation] = React.useState<boolean>(false);

    const { isLoading, data } = useQuery('channel_secret', async () => {
        return await axios.get('/app/config/get', {
            params: {
                key: [
                    "channel_secret",
                    "channel_access_token"
                ]
            }
        })
    }, { 
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false
    })

    const { mutate, isLoading: isMutate } = useMutation(async () => {
        return await axios.post('/app/config/set', {
            value : [
                {key: "channel_secret", value: channel_secret},
                {key: "channel_access_token", value: channel_access_token}
            ]
        })
    })

    React.useEffect(() => {
        if (data?.data){
            setChannelSecret(data.data.find((data : {key: string}) => data.key == "channel_secret").value || "")
            setChannelAccessToken(data.data.find((data : {key: string}) => data.key == "channel_access_token").value || "")
        }
    }, [data])

    return (
        <FormControl fullWidth className='h-full p-0' sx={{
            opacity: (isLoading || isMutate) ? "30%" : "100%"
        }} >
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
                    value={channel_secret}
                    onChange={(e) => setChannelSecret(e.target.value)} 
                    disabled={!isEdit || isLoading || isMutate}
                    focused={!isEdit}
                />

                <TextField
                    fullWidth
                    margin={'normal'}
                    placeholder={t("line.channel_access_token")}
                    label={t("line.channel_access_token")}
                    type='password'
                    value={channel_access_token}
                    onChange={(e) => setChannelAccessToken(e.target.value)} 
                    disabled={!isEdit || isLoading || isMutate}
                    focused={!isEdit}
                />
            </Box>

            <Box className="mt-auto ">
                <Divider />
                <div className='flex justify-between m-2 flex-row-reverse '>
                    <Button
                        startIcon={<Edit />}
                        onClick={() => setEdit(true)}
                        disabled={isLoading || isMutate}
                        sx={{
                            display: isEdit ? "none" : undefined
                        }}
                    >
                        {t("text.edit")}
                    </Button>

                    <Confirmation
                        title={t("config.synthia.confirmation.title")}
                        text={t("config.synthia.confirmation.text")}
                        state={isConfirmation}
                        setState={setConfirmation}
                        confirm={() => {
                            setConfirmation(false)
                            setEdit(false)
                            mutate()
                        }}
                    />

                    <Button
                        startIcon={<Close />}
                        onClick={() => setEdit(false)}
                        disabled={isLoading || isMutate}
                        sx={{
                            display: !isEdit ? "none" : undefined
                        }}
                    >
                        {t("text.cancel")}
                    </Button>

                    <Button
                        startIcon={<Save />}
                        onClick={() => setConfirmation(true)}
                        disabled={isLoading || isMutate}
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