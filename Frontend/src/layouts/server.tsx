import React from 'react'
import { PauseCircle, Pending, NotStarted } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'
import { useQuery, useMutation } from 'react-query';
import { useTranslation } from 'react-i18next'
import axios from '../components/Axios';

function NavbarServer() {
    const [state, setState] = React.useState<boolean>(false);
    const { t } = useTranslation();

    const { isLoading: FetchingState, data: FetchingResult } = useQuery("ServState", async () => {
        return await axios.get("/app/state/get")
    })

    const { isLoading: isChangeState, mutate: ChangeState } = useMutation(async (state: boolean) => {
        return await axios.post("/app/state/change", { state }).then(() => setState(state))
    })

    const isLoading = FetchingState || isChangeState
    React.useEffect(() => {
        if (FetchingResult?.data) {
            setState(FetchingResult.data.state)
        }
    }, [FetchingResult])

    return (
        <>
            <Box sx={{
                color: "black"
            }}>
                {
                    isLoading ? (
                        <IconButton >
                            <Pending />
                        </IconButton >
                    ) :
                        state ? (
                            <Tooltip title={t("tooltip.pause.server")}>
                                <IconButton onClick={() => ChangeState(false)}>
                                    <PauseCircle />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip title={t("tooltip.start.server")}>
                                <IconButton onClick={() => ChangeState(true)}>
                                    <NotStarted />
                                </IconButton>
                            </Tooltip>
                        )
                }
            </Box>
        </>
    )
}

export default NavbarServer