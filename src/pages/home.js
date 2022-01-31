import * as React from 'react';
import {Grid, Typography, Box} from "@mui/material";
import * as PropTypes from "prop-types";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea} from '@mui/material';
import {Link} from "react-router-dom";

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

export default function HomePage() {
    return (
        <div>
            <Box>
                <Grid container>
                    <Grid item xs={0} sm={3} md={2}>
                    </Grid>
                    <Grid item xs={12} sm={9} md={8}>
                        <div>
                            <br/><br/><br/>
                            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                                <Grid item xs={2} sm={2} md={4} key={1}>
                                    <Card style={{height: "290px"}}>
                                        <CardActionArea component={Link} to="/profile">
                                            <CardMedia
                                                component="img"
                                                height="220"
                                                image="/profile.jpg"
                                                alt="green iguana"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Profile
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item xs={2} sm={2} md={4} key={2}><Card style={{height: "290px"}}>
                                    <CardActionArea component={Link} to="/about">
                                        <CardMedia
                                            component="img"
                                            height="220"
                                            image="/about.jpg"
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                About
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card></Grid>
                                <Grid item xs={2} sm={2} md={4} key={3}><Card style={{height: "290px"}}>
                                    <CardActionArea component={Link} to="/uploadfile">
                                        <CardMedia
                                            component="img"
                                            height="220"
                                            image="/uploadfiles.jpg"
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Upload Files
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card></Grid>
                                <Grid item xs={2} sm={3} md={6} key={4}><Card style={{height: "290px"}}>
                                    <CardActionArea component={Link} to="/email">
                                        <CardMedia
                                            component="img"
                                            height="220"
                                            image="/email.jpg"
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Email
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card></Grid>
                                <Grid item xs={2} sm={3} md={6} key={5}><Card style={{height: "290px"}}>
                                    <CardActionArea component={Link} to="/contact">
                                        <CardMedia
                                            component="img"
                                            height="220"
                                            image="/contact.jpg"
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Contact
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card></Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={0} sm={0} md={2}>
                    </Grid>
                </Grid>
            </Box>

        </div>
    );
}