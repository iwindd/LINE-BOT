import React from 'react';
import { Drawer, Box, Toolbar, IconButton, Typography, List, ListItemButton, ListItemText, ListItemIcon, ListSubheader, Container } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { AppBar } from '../components/3rd-party/navbar';
import { DrawerItems } from '../components/config/navbar';
import { useNavigate } from 'react-router-dom';

function Navbar({children} : {children : React.ReactNode}) {
    const [isDrawer, setDrawer] = React.useState<boolean>(true);
    const [isPage, setPage] = React.useState<string>('main.dashboard');
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <>
            <AppBar position='fixed' open={isDrawer}>
                <Toolbar
                    color="#fffff"
                >
                    <IconButton onClick={() => setDrawer(!isDrawer)}>
                        {isDrawer ? (<KeyboardArrowLeft />) : (<KeyboardArrowRight />)}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                open={isDrawer}
                variant="persistent"
                anchor='left'
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
                }}
            >
                <Box sx={{ padding: 2 }}>
                    <Typography
                        variant='h4'
                        className='text-center'
                    >{t("App")}</Typography>
                </Box>
                <List
                    subheader={<li />}
                >
                    {DrawerItems.map((category, categoryId) => {
                        return (
                            <li key={`category-${categoryId}`}>
                                <ul>
                                    <ListSubheader>{t(`drawer.${category.name}`)}</ListSubheader>
                                    {category.items.map((item, itemId) => (
                                        <ListItemButton
                                            key={`drawer-${categoryId}-${itemId}`}
                                            selected={isPage == `${category.name}.${item.name}`}
                                            onClick={() => {
                                                setPage(`${category.name}.${item.name}`);
                                                navigate(item.route);
                                            }}
                                        >
                                            <ListItemIcon>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={t(`drawer.${category.name}.${item.name}`)} />
                                        </ListItemButton>
                                    ))}
                                </ul>
                            </li>
                        )
                    })}
                </List>
            </Drawer>
            <Container
                sx={{
                    marginTop: 11,
                    marginLeft: isDrawer ? 30: 1,
                    transition: "all 0.25s ease"
                }}
            >
                {children}
            </Container>
        </>
    )
}

export default Navbar