import './App.css';
import {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route, useSearchParams} from 'react-router-dom';
import MenuBar from './components/menu'
import HomePage from './pages/home'
import About from './pages/about'
import ContactEmails from './pages/contactEmails'
import UploadFiles from './pages/uploadFiles'
import Contact from './pages/contact'
import {config} from "./Config";
import {PublicClientApplication} from "@azure/msal-browser";
import {Avatar, Button, Link, Box, CssBaseline, Container, Typography, Paper} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Profile from './pages/profile'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="http://cloud-project.azurewebsites.net/">
                cloud-project
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

function App(props) {
    const [state, setState] = useState({
        error: null,
        isAuthenticated: false,
        user: {
            name: '',
            username: ''
        }
    })
    const [quest, setQuest] = useState(null)
    const publicClientApplicationConf = new PublicClientApplication({
        auth: {
            clientId: config.appId,
            redirectUri: config.redirect_uri,
            authority: config.authority
        },
        cache: {
            cacheLocation: "sessionStorage",
            storeAuthStateInCookie: true
        }
    })
    const loginApp = async () => {
        try {
            const userData = await publicClientApplicationConf.loginPopup({
                scopes: config.scopes,
                prompt: "select_account"
            })
            setState({
                isAuthenticated: true,
                user: {
                    name: userData.account.name,
                    username: userData.account.username
                }
            })
        } catch (e) {
            setState({
                isAuthenticated: false,
                user: {
                    name: '',
                    username: ''
                },
                error: e
            })
        }
    }
    const loginAppGuest = () => {
        setState({
            isAuthenticated: true,
            user: {
                name: "Guest",
                username: "Guest"
            }
        })
    }
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        setQuest(queryParams.get('guest'))
    })
    return (
        <div>
            {(state.isAuthenticated) ?
                <Router>
                    <div style={{marginBottom: "140px"}}>
                        <MenuBar publicClientApplicationConf={publicClientApplicationConf} setState={setState}
                                 userInfo={state.user}/>
                        <Routes>
                            <Route exact path='/' element={<HomePage userInfo={state.user}/>}/>
                            <Route path='/about' element={<About/>}/>
                            <Route path='/email' element={<ContactEmails/>}/>
                            <Route path='/uploadfile' element={<UploadFiles/>}/>
                            <Route path='/contact' element={<Contact/>}/>
                            <Route path='/profile' element={<Profile userInfo={state.user}/>}/>
                        </Routes>
                    </div>
                    <footer style={{
                        color: "gray",
                        position: "fixed",
                        bottom: 0,
                        width: "100%",
                        height: "100px",
                        marginBottom: "0px"
                    }}>
                        <Paper style={{
                            width: "100%",
                            height: "100px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }} elevation={1}>
                            <Typography variant="h5" component="h3">
                                Cloud Project
                            </Typography>
                            <Typography component="p">
                                @2022 All right reserved
                            </Typography>
                        </Paper>
                    </footer>
                </Router> : <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline/>
                        <Box
                            sx={{
                                marginTop: 30,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{m: 2, bgcolor: 'secondary.main'}}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in into our Cloud Project
                            </Typography>
                            <Box noValidate sx={{mt: 1}}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    onClick={loginApp}
                                    variant="contained"
                                    sx={{mt: 4, mb: 2}}
                                >
                                    Sign In
                                </Button>
                                {quest === 'ok' ?
                                    <Button
                                        type="submit"
                                        fullWidth
                                        onClick={loginAppGuest}
                                        variant="contained"
                                        sx={{mt: 4, mb: 2}}
                                    >
                                        Guest
                                    </Button> : <></>}
                            </Box>
                        </Box>
                        <Copyright sx={{mt: 8, mb: 4}}/>
                    </Container>
                </ThemeProvider>}
        </div>
    );
}

export default App;
