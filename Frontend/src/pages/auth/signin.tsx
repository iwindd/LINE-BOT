import { FormControl, TextField, Button, Container, Typography, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

function SignIn() {
    const { t } = useTranslation();

    return (
        <Container maxWidth="xs" className="mx-auto mt-10">
            <FormControl className='space-y-4' fullWidth>
                <header>
                    <Typography
                        variant='h2'
                        className='text-center'
                        marginBottom={2}
                    >
                        {t('auth.signin.header')}
                    </Typography>
                    <Divider></Divider>
                </header>
                <TextField label={t('field.username')} variant="outlined" fullWidth />
                <TextField label={t('field.password')} type="password" variant="outlined" fullWidth />
                <Button variant="contained" color="primary" fullWidth>
                    {t('auth.signin.button.login')}
                </Button>
            </FormControl>
        </Container>
    )
}

export default SignIn