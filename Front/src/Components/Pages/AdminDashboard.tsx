import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import MainEvent from './AdminEvents/MainEvent';
import GetUsers from './AdminEvents/GetUsersEvent';
import GetUser from './AdminEvents/GetUserEvent';
import format from './../../formattingUtils' ;


const drawerWidth = 240;

export default function ResponsiveDrawer() {

    const [currentEvent, setCurrentEvent] = useState<any>('MAIN');

    async function handleClick(e: any) {
        setCurrentEvent(e);
    }

    let events: any =
        [
            {
                text: "Main Menu",
                operation: "MAIN"
            },
            {
                text: "Get Users",
                operation: "GET_USERS"
            },
            {
                text: "Get User",
                operation: "GET_USER"
            }
        ]

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {events.map(({ text, operation }: any) => (
                    <ListItem key={text} disablePadding onClick={() => handleClick(operation)}>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );



    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {format(currentEvent)}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >

                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />

                {currentEvent === "MAIN" && <MainEvent />}
                {currentEvent === "GET_USERS" && <GetUsers />}
                {currentEvent === "GET_USER" && <GetUser />}
            </Box>
        </Box>
    );
}


