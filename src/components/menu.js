import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import {deepOrange} from '@mui/material/colors';
import {Drawer, experimentalStyled as styled,} from "@mui/material";
import {Hidden} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {useTheme} from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import DraftsIcon from '@mui/icons-material/Drafts';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ContactMailIcom from '@mui/icons-material/ContactMail';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const pages = [{
    name: 'Home',
    dropdown: false,
    pageLink: '/',
    icon: <HomeIcon style={{padding: 5}}/>
}, {
    name: 'About us',
    dropdown: false,
    pageLink: '/about',
    icon: <InfoIcon style={{padding: 5}}/>
}, {
    name: 'Email',
    dropdown: false,
    pageLink: '/email',
    icon: <DraftsIcon style={{padding: 5}}/>
}, {
    name: 'Files',
    dropdown: false,
    pageLink: '/uploadfile',
    icon: <FileCopyIcon style={{padding: 5}}/>
}, {
    name: 'Contact',
    dropdown: false,
    pageLink: '/contact',
    icon: <ContactMailIcom style={{padding: 5}}/>
}];
const settings = [{
    name: 'Profile',
    pageLink: '/profile',
    icon: <AccountCircleIcon style={{padding: 5}}/>
}, {
    name: 'Logout',
    pageLink: '/',
    icon: <ExitToAppIcon style={{padding: 5}}/>
}];

const drawerWidth = 245;

const useStyles = styled((theme) => ({
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }
}));

const AppBarMenu = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [anchorDrawerNav, setAnchorDrawerNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    let navigate = useNavigate();

    const handleOpenDrawerMenu = (event) => {
        setAnchorDrawerNav(event.currentTarget);
    };

    const handleCloseDrawerMenu = () => {
        setAnchorDrawerNav(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const submenufunc = async (settingBut) => {
        if (settingBut.name === 'Logout') {
            props.publicClientApplicationConf.logout();
            props.setState({isAuthenticated: false})
        } else {
            navigate(settingBut.pageLink)
        }
    };


    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
                        >
                            <img src="/fav.png" alt="cloudlogo" width="55" height="55"/>
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>

                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenDrawerMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
                        >
                            <img src="/fav.png" width="55" alt="cloudproject" height="50"/>
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page) => (
                                <>
                                    <Button
                                        component={Link} to={page.pageLink}
                                        key={page.name}
                                        sx={{my: 2, color: 'white', display: 'block'}}
                                    >
                                        {page.name}
                                    </Button>
                                </>
                            ))}
                        </Box>
                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar sx={{bgcolor: deepOrange[500]}}>{props.userInfo.name[0]}</Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting.name} onClick={() => submenufunc(setting)}>
                                        <Typography textAlign="center">{setting.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Hidden mdUp implementation="css">
                <Drawer
                    variant="persistent"
                    anchor={'left'}
                    open={anchorDrawerNav}
                    onClose={handleOpenDrawerMenu}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    onClick={handleCloseDrawerMenu}
                    onKeyDown={handleCloseDrawerMenu}
                >
                    <div>
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={handleCloseDrawerMenu}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                            </IconButton>
                        </div>
                        {pages.map((page) => (
                            <MenuItem key={page.name} component={Link} to={page.pageLink}>
                                {page.icon}<Typography textAlign="center">{page.name}</Typography>
                            </MenuItem>
                        ))}
                    </div>

                </Drawer>
            </Hidden>
        </>
    );
};
export default AppBarMenu;