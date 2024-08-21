import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
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
import { formatString } from './../../formattingUtils';
import IconResolver from './AdminEvents/IconResolver';

import events from './AdminEvents/events.json';
import GetMany from './AdminEvents/GetMany';
import GetOne from './AdminEvents/GetOne';

const drawerWidth = 240;

export default function ResponsiveDrawer() {

    const [currentEvent, setCurrentEvent] = useState<any>('MAIN');

    async function handleClick(e: any) {
        setCurrentEvent(e);
    }




    const drawer = (
        <div>
            <Toolbar />

            <Divider />

            <List>
                {events.map(({ text, operation, iconName }: any) => (
                    <ListItem key={text} disablePadding onClick={() => handleClick(operation)}>
                        <ListItemButton>
                            <ListItemIcon>
                                <IconResolver iconName={iconName} />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );



    const event = () => {
        switch (currentEvent) {
            case "GET_USER":
                return <GetOne type="users" />
            case "GET_USERS":
                return <GetMany type="users" />
            case "GET_BALANCE":
                return <GetOne type="balance" />
            case "GET_BALANCES":
                return <GetMany type="balance" />
            case "GET_TRANSACTION":
                return <GetOne type="transactions" />
            case "GET_TRANSACTIONS":
                return <GetMany type="transactions" />
            case "MAIN":
            default:
                return <MainEvent />;
        }
    };



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
                        edge="start"
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {formatString(currentEvent)}
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

                {/* Event Page */}
                {event()}

            </Box>
        </Box>
    );
}


