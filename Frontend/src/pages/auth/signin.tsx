import React from 'react';
import { FormControl, TextField, Button, Container, Typography, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

function SignIn() {
    const { t } = useTranslation();

    const [Email, setEmail] = React.useState<string>("");
    const [Password, setPassword] = React.useState<string>("");

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

                {/* EMAIL FIELD */}
                <TextField
                    label={t('field.email')}
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    fullWidth
                />

                {/* PASSWORD FIELD */}
                <TextField
                    label={t('field.password')}
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    variant="outlined"
                    fullWidth
                />

                <Button variant="contained" color="primary" fullWidth>
                    {t('auth.signin.button.login')}
                </Button>
            </FormControl>
        </Container>
    )
}

export default SignIn