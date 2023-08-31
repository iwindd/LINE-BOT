import { Drawer, AppBar, Box, Toolbar, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { useTranslation } from 'react-i18next';

function Navbar() {
    const { t } = useTranslation();

    return (
        <>
            <AppBar position="fixed" >
                <Toolbar>

                </Toolbar>
            </AppBar>
            <Drawer
                open={true}
                variant="permanent"
                anchor='left'
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
                }}
            >
                <Box sx={{padding: 2}}>
                    <Typography
                        variant='h4'
                        className='text-center'
                    >{t("App")}</Typography>
                </Box>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary="Inbox" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary="Drafts" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </>
    )
}

export default Navbar