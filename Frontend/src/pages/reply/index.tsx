import { Add } from '@mui/icons-material';
import { Box, Divider, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next';
import Table from './table';

function Reply() {
    const { t } = useTranslation();

    return (
        <Paper className='p-4 space-y-4' elevation={0}>
            <Box className="flex justify-between items-center">
                <Typography variant='h4'>{t('reply.heading')}</Typography>
                <Box>
                    <Tooltip title={t("tooltip.reply.add")}><IconButton><Add /></IconButton></Tooltip>
                </Box>
            </Box>
            <Divider></Divider>
            <Table />
        </Paper>
    )
}

export default Reply