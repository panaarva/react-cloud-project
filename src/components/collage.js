import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {Box, Paper, Table, tableCellClasses, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import TableBody from "@mui/material/TableBody/TableBody";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import {useState} from "react";
import * as PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import TableCell from "@mui/material/TableCell/TableCell";
import {experimentalStyled as styled} from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';

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

const BootstrapDialogTitle = (props) => {
    const {children, onClose, query, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {(onClose && query === 'success') ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    style={{position: "absolute", right: 8, top: 8}}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
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


export default function Collage({itemData}) {
    const matches = useMediaQuery('(min-width:600px)');
    const [openDialog, setOpenDialog] = React.useState(false);
    const handleCloseDialog = () => setOpenDialog(false);
    // Api endpoint https://northeurope.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236/console
    const URLAPI = `https://northeurope.api.cognitive.microsoft.com/face/v1.0`;
    const ApiKey = '<apiKey>';
    // hook state to get the data from the API
    const [data, setData] = useState([]);
    const [query, setQuery] = React.useState('idle');

    const handleOpenDialog = async (url) => {
        try {
            setOpenDialog(true);
            setQuery('progress');
            const fetchOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key': ApiKey
                },
                body: JSON.stringify({
                    "url": url
                })
            };

            // Fetch the data
            const resp = await fetch(`${URLAPI}/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_01&returnRecognitionModel=false&detectionModel=detection_01&returnFaceAttributes=age,gender,smile,facialHair,emotion,hair`, fetchOptions)
            const people = await resp.json();
            // Set the state of the data
            let personData = [];
            people.map((person) => {
                personData.push({
                    "faceId": person.faceId,
                    "age": person.faceAttributes.age,
                    "gender": person.faceAttributes.gender,
                    "emotion": emotionAttribute(person.faceAttributes.emotion),
                    "hair": hairAttribute(person.faceAttributes.hair)
                });
            });
            setData(personData);
            setQuery('success');
        } catch (err) {
            console.error(err)
        }
    };

    function hairAttribute(hair) {
        let hairAttr;
        let max = 0;

        if (hair.bald >= 0.95) {
            hairAttr = 'bald'
        } else {
            hair.hairColor.map((hair) => {
                if (hair.confidence > max) {
                    max = hair.confidence;
                    hairAttr = hair.color
                }
            });
        }

        return hairAttr
    }

    function emotionAttribute(emotion) {
        let emotionAttr;
        let max = 0;

        Object.keys(emotion).map((em) => {
            if (emotion[em] > max) {
                max = emotion[em];
                emotionAttr = em
            }
        });

        return emotionAttr
    }

    return (
        <ImageList sx={{height: 250}} cols={((matches) ? 6 : 2)} rowHeight={164}>
            {itemData.map((item) => (
                <ImageListItem key={item.url}>
                    <img
                        src={`${item.url}?w=164&h=144&fit=crop&auto=format`}
                        srcSet={`${item.url}?w=164&h=144&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.name}
                        style={{height: "160px"}}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.name}
                        subtitle={""}
                        actionIcon={
                            <IconButton
                                sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                aria-label={`info about ${item.name}`}
                                onClick={() => handleOpenDialog(item.url)}
                            >
                                <InfoIcon/>
                            </IconButton>
                        }
                    />
                </ImageListItem>
            ))}
            <Dialog
                maxWidth='lg'
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <BootstrapDialogTitle id="alert-dialog-title" onClose={handleCloseDialog} query={query}>
                    Image attributes:
                </BootstrapDialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description"
                                       style={{display: 'flex', justifyContent: 'center'}}>
                        {query === 'success' ?
                            <TableContainer component={Paper}>
                                <Table sx={{minWidth: 700}} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Age</StyledTableCell>
                                            <StyledTableCell align="center">Gender</StyledTableCell>
                                            <StyledTableCell align="center">Hair</StyledTableCell>
                                            <StyledTableCell align="center">Emotion</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map(item => (
                                            <StyledTableRow key={item.faceId}>
                                                <StyledTableCell align="center">
                                                    {item.age}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    align="center">{item.gender}</StyledTableCell>
                                                <StyledTableCell
                                                    align="center">{item.hair}</StyledTableCell>
                                                <StyledTableCell
                                                    align="center">{item.emotion}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            :
                            <Fade
                                in={query === 'progress'}
                                unmountOnExit
                                id="alignCircularProgress"
                            >
                                <CircularProgress/>
                            </Fade>}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </ImageList>
    );
}