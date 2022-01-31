import {Grid, Typography, Box, ListItem, ListItemAvatar, Avatar} from "@mui/material";
import * as PropTypes from "prop-types";
import {deepOrange} from "@mui/material/colors";

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


export default function Profile({userInfo}) {
    return (
        <Box sx={{flexGrow: 1, paddingTop: 4}}>
            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                <Grid item xs={1} sm={1} md={2}>
                </Grid>
                <Grid item xs={10} sm={10} md={8}>
                    <ListItem button key={userInfo.username}
                              style={{display: "flex", justifyContent: "space-around"}}>
                        <ListItemAvatar style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
                            <Avatar sx={{
                                width: 200,
                                height: 200,
                                bgcolor: deepOrange[500],
                                fontSize: "80px"
                            }}>{userInfo.name[0]}</Avatar>
                            <br/>
                            <Typography variant="h4" style={{textAlign: "center"}} gutterBottom component="div">
                                {userInfo.name}
                            </Typography>
                            <Typography variant="h5" style={{textAlign: "center"}} gutterBottom component="div">
                                {userInfo.username}
                            </Typography>
                        </ListItemAvatar>
                    </ListItem>
                </Grid>
                <Grid item xs={1} sm={1} md={2}>
                </Grid>
            </Grid>
        </Box>
    );
}