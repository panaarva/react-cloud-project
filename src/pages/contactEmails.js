import * as React from 'react';
import {experimentalStyled as styled} from '@mui/material/styles';
import {
    Grid,
    Typography,
    Paper,
    Box,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    LinearProgress
} from "@mui/material";
import * as PropTypes from "prop-types";
import {useEffect, useState} from "react";
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import axios from "axios";

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
const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function ContactEmails() {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const getUsersFromBd = async () => {
        // const usersdb = await getAllMessages()
        setLoading(true)
        const dataFromAzureFunction = await axios.get('https://name.azurewebsites.net/api/dataCloudProject?code=code')
        // setMessages(usersdb)
        setMessages(dataFromAzureFunction.data)
        setLoading(false)
    }
    useEffect(() => {
        getUsersFromBd()
    }, []);
    return (
        <Box>
            <Grid container>
                <Grid item xs={1} sm={1} md={2}>
                </Grid>
                <Grid item xs={10} sm={10} md={8}>
                    <h1>Contact Emails</h1>
                    {loading ?
                        <Box sx={{width: '100%'}}>
                            <LinearProgress/>
                        </Box> : <>
                            <TableContainer component={Paper}>
                                <Table sx={{minWidth: 700}} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Email</StyledTableCell>
                                            <StyledTableCell align="center">Name</StyledTableCell>
                                            <StyledTableCell align="center">Surname</StyledTableCell>
                                            <StyledTableCell align="center">Message</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {messages.map((row) => (
                                            <StyledTableRow key={row.email}>
                                                <StyledTableCell align="center">
                                                    {row.email}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{row.name}</StyledTableCell>
                                                <StyledTableCell align="center">{row.surname}</StyledTableCell>
                                                <StyledTableCell align="center">{row.message}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            *Data comes from azure function</>}
                </Grid>
                <Grid item xs={1} sm={1} md={2}>
                </Grid>
            </Grid>
        </Box>
    );
}