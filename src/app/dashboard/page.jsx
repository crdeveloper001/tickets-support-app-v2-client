'use client';
import React,{useEffect} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    CssBaseline,
    Box,
    Divider,
    Collapse,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

//components
import Page from './profile/page';
import ProfilePage from './profile/page';
import AccountsManagementPage from './accountManagement/page';
import WelcomePage from './welcomePage/page';
// Tickets components
import ViewCurrentTickets from './tickets/viewCurrentTickets/page';
import CreateTicket from './tickets/createNewTicket/page';
import HistoryTickets from './tickets/historyTickets/page';
// Settings component
import SettingsPage from './settings/page';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 240;

const menuItems = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'Profile', icon: <AccountCircleIcon /> },
    { text: 'Accounts Management', icon: <ManageAccountsIcon /> },
    {
        text: 'Tickets',
        icon: <AssignmentIcon />,
        dropdown: true,
        children: [
            { text: 'View All Tickets' },
            { text: 'Create New Ticket' },
            { text: 'Closed Tickets' },
        ],
    },
    { text: 'Settings', icon: <SettingsIcon /> },
    { text: 'Logout', icon: <LogoutIcon /> },
];

export default function Dashboard() {
    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
            sessionStorage.clear();
            localStorage.clear();
            window.location.href = '/login';
        }
    }, []);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [openDropdown, setOpenDropdown] = React.useState({});

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleDropdownClick = (text) => {
        setOpenDropdown((prev) => ({
            ...prev,
            [text]: !prev[text],
        }));
    };

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = '/';
    };

    // Import your page components here

    // Map menu items to components
    const pageComponents = {
        Home: <WelcomePage />,
        Profile: <ProfilePage />,
        'Accounts Management': <AccountsManagementPage />,
        'View All Tickets': <ViewCurrentTickets />,
        'Create New Ticket': <CreateTicket />,
        'Closed Tickets': <HistoryTickets />,
        Settings: <SettingsPage />,
    };

    // Render the selected page component
    const renderPage = () => {
        return pageComponents[selectedPage] || (
            <Typography variant="h6">Page not found</Typography>
        );
    };

    // State to track selected menu/page
    const [selectedPage, setSelectedPage] = React.useState('Home');

    const handleMenuClick = (text) => {
        if (text !== 'Logout') {
            setSelectedPage(text);
            if (isMobile) setMobileOpen(false);
        }
    };

    const handleDropdownChildClick = (childText) => {
        setSelectedPage(childText);
        if (isMobile) setMobileOpen(false);
    };

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant="h6" noWrap>
                    Tickets Support App
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {menuItems.map(({ text, icon, dropdown, children }) => (
                    <React.Fragment key={text}>
                        <ListItem disablePadding>
                            <ListItemButton
                                selected={selectedPage === text}
                                onClick={
                                    text === 'Logout'
                                        ? handleLogout
                                        : dropdown
                                            ? () => handleDropdownClick(text)
                                            : () => handleMenuClick(text)
                                }
                                aria-controls={dropdown ? `${text}-dropdown` : undefined}
                                aria-expanded={dropdown ? !!openDropdown[text] : undefined}
                            >
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={text} />
                                {dropdown ? (
                                    openDropdown[text] ? <ExpandLessIcon /> : <ExpandMoreIcon />
                                ) : null}
                            </ListItemButton>
                        </ListItem>
                        {dropdown && (
                            <Collapse in={!!openDropdown[text]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {children.map((child) => (
                                        <ListItemButton
                                            key={child.text}
                                            sx={{ pl: 4 }}
                                            selected={selectedPage === child.text}
                                            onClick={() => handleDropdownChildClick(child.text)}
                                        >
                                            <ListItemText primary={child.text} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </React.Fragment>
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
                    width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h6" noWrap component="div">
                        Tickets Support App
                    </Typography>
                </Toolbar>
            </AppBar>
            {/* Sidebar Drawer */}
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="sidebar menu"
            >
                {/* Mobile Drawer */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                {/* Desktop Drawer */}
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
            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                {renderPage()}
            </Box>
        </Box>
    );
}