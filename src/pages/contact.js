import * as React from 'react';
import {Grid, Typography, Box} from "@mui/material";
import * as PropTypes from "prop-types";
import AzureMap from '../components/map';

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


export default function ProgramPage() {
    return (
        <Box sx={{flexGrow: 1, paddingTop: 4}}>
            <Grid container columns={{xs: 4, sm: 8, md: 12}}>
                <Grid item xs={1} sm={1} md={2}>
                </Grid>
                <Grid item xs={10} sm={10} md={8}>
                    <br/><br/><br/>
                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                        <AzureMap/>
                    </div>
                </Grid>
                <Grid item xs={1} sm={1} md={2}>
                </Grid>
            </Grid>
        </Box>
    );
}