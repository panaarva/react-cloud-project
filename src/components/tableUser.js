import * as React from 'react';
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid";
import {Avatar, ListItem, ListItemAvatar, Typography} from "@mui/material";
import {deepOrange} from "@mui/material/colors";
import PersonIcon from '@mui/icons-material/Person';


export default function TableUser({data}) {
    const Item = styled(Paper)(({theme}) => ({
        ...theme.typography.body2,
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    }));
    return (
        <div>
            <Grid container spacing={2}>
                {data.map((row) => (
                    <Grid item xs={6} md={6}>
                        <Item>
                            <ListItem button key={row.name} style={{display: "flex", justifyContent: "space-around"}}>
                                <ListItemAvatar>
                                    <Avatar sx={{
                                        width: 200,
                                        height: 200,
                                        marginLeft: "15px",
                                        bgcolor: deepOrange[300],
                                        fontSize: "80px"
                                    }}><PersonIcon sx={{fontSize: 100}}/></Avatar>
                                    <br/>
                                    <Typography variant="h4" style={{textAlign: "center"}} gutterBottom component="div">
                                        {row.name}
                                    </Typography>
                                    <Typography variant="h5" style={{textAlign: "center"}} gutterBottom component="div">
                                        {row.surname}
                                    </Typography>
                                </ListItemAvatar>
                            </ListItem>
                        </Item>
                    </Grid>
                ))}
            </Grid>
            *Data comes from firebase
        </div>
    );
}