import React from 'react'
import { Logout as LogoutIcon } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import useAuthContext from '../contexts/AuthContext'
import Confirmation from '../components/dialogs/confirmation'

function Logout() {
    const { t } = useTranslation();
    const { isLogged, methods: { Logout } } = useAuthContext();
    const [isConfirmation, setConfirmation] = React.useState<boolean>(false);

    const Confirmed = () => {
        if (isLogged) Logout();
    }

    if (!isLogged) {
        return null
    }

    return (
        <>
            <Confirmation
                title={t("logout.confirmation.title")}
                text={t("logout.confirmation.text")}
                state={isConfirmation}
                setState={setConfirmation}
                confirm={Confirmed}
            />
            <IconButton onClick={() => setConfirmation(true)}>
                <LogoutIcon />
            </IconButton>
        </>
    )
}

export default Logout