import React from 'react';
import { FormControl, TextField, Button, Container, Typography, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useAuthContext from '../../contexts/AuthContext';

function SignIn() {
    const { t } = useTranslation();

    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const { isLoading, methods: { Login } } = useAuthContext()
    const Submit = () => Login({ email, password })

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    fullWidth
                />

                {/* PASSWORD FIELD */}
                <TextField
                    label={t('field.password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    variant="outlined"
                    fullWidth
                />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isLoading}
                    onClick={() => Submit()}
                >
                    {t('auth.signin.button.login')}
                </Button>
            </FormControl>
        </Container>
    )
}

export default SignIn