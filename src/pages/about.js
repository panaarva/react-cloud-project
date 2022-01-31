import * as React from 'react';
import {Grid, Typography, Box, LinearProgress} from "@mui/material";
import * as PropTypes from "prop-types";
import TableUser from "../components/tableUser";
import {useEffect, useState} from "react";
import {getAllUsers} from "../utils/firebaseData";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


export default function About() {
    const [users, setUsers] = useState([])
    const [loading, setloading] = useState(false)
    const getUsersFromBd = async () => {
        setloading(true)
        const usersdb = await getAllUsers()
        setUsers(usersdb)
        setloading(false)
    }
    useEffect(() => {
        getUsersFromBd()
    }, []);
    return (
        <Box sx={{flexGrow: 1, paddingTop: 4}}>
            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                <Grid item xs={1} sm={1} md={2}>
                </Grid>
                <Grid item xs={10} sm={10} md={8}>
                    <br/><br/><br/>
                    {!loading ?
                        <TableUser data={users}/> : <LinearProgress/>}
                </Grid>
                <Grid item xs={1} sm={1} md={2}>
                </Grid>
            </Grid>
        </Box>
    );
}