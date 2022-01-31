import * as React from 'react';
import {Grid, Typography, Box, Stack, Chip, LinearProgress} from "@mui/material";
import {BlobServiceClient} from '@azure/storage-blob'
import * as PropTypes from "prop-types";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Collage from "../components/collage";
import useMediaQuery from '@mui/material/useMediaQuery';

const sasToken = "<sasToken>";
const containerName = `<containerName>`;
const storageAccountName = "<storageAccountName>";

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

export default function UploadFiles() {
    const matches = useMediaQuery('(min-width:600px)');
    const [allFiles, setAllFiles] = useState([])
    const [fileSelected, setFileSelected] = useState(null);
    const [fileName, setFileName] = useState("No file choosen");
    const [fileImage, setFileImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const onFileChange = (event) => {
        const file = event.target.files[0]
        setFileImage(file.type.indexOf('image') !== -1)
        setFileName(file.name)
        setFileSelected(file);
    };
    const uploadFileToBlob = async (file) => {
        if (!file) return [];

        const blobService = new BlobServiceClient(
            `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
        );
        const containerClient = blobService.getContainerClient(containerName);
        await containerClient.createIfNotExists({
            access: 'container',
        });
        await uploadNow(containerClient, file);
        setFileName("No file choosen")
        setFileImage(false)
        setFileSelected(null)
        await getBlobsInContainer()
        return [];
    };
    const uploadNow = async (containerClient, file) => {
        const blobClient = containerClient.getBlockBlobClient(file.name);
        const options = {blobHTTPHeaders: {blobContentType: file.type}};
        await blobClient.uploadData(file, options);
    }
    const getBlobsInContainer = async () => {
        setLoading(true)
        const returnedBlobUrls = [];
        const blobService = new BlobServiceClient(
            `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
        );
        const containerClient = blobService.getContainerClient(containerName);
        // get list of blobs in container
        // eslint-disable-next-line
        for await (const blob of containerClient.listBlobsFlat()) {
            // if image is public, just construct URL
            returnedBlobUrls.push({
                    url:
                        `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`,
                    type: blob.properties.contentType,
                    name: blob.name
                }
            );
        }
        setAllFiles(returnedBlobUrls)
        setLoading(false)
    };
    useEffect(() => {
        getBlobsInContainer()
    }, [])
    return (
        <Box>
            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                <Grid item xs={1} sm={1} md={2}>
                </Grid>
                <Grid item xs={10} sm={10} md={8}>
                    <h1>Files</h1>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Button
                            variant="outlined"
                            component="label"
                        >
                            Choose File
                            <input
                                type="file"
                                onChange={onFileChange}
                                hidden
                            />
                        </Button> {fileName}
                        <br/><br/>
                        <Button variant="contained"
                                component="label"
                                type="submit" onClick={() => uploadFileToBlob(fileSelected)}>
                            Upload
                        </Button>
                        <br/><br/>
                        {fileSelected && fileImage ?
                            <img src={URL.createObjectURL(fileSelected)} alt={"uploadFile"}
                                 style={{width: "200px", border: "solid"}}/> : <></>}
                        {loading ? <Box sx={{width: '100%'}}>
                                <LinearProgress/>
                            </Box> :
                            <>
                                <Typography variant="h5" component="div" gutterBottom>Images</Typography>
                                <hr/>
                                <Collage itemData={allFiles.filter((file) => file.type.indexOf('image') !== -1)}/>
                                <Typography variant="h5" component="div" gutterBottom>Files</Typography>
                                <hr/>
                                <div style={{display:((!matches)?"grid":"block")}}>
                                {allFiles.filter((file) => file.type.indexOf('image') === -1).map((file) =>

                                    <Chip label={file.name}  style={{marginRight: "10px", marginBottom: "10px"}} color="primary" variant="outlined"
                                          onClick={() => window.open(file.url, "_blank")}/>
                                )}
                                </div>
                            </>}
                    </div>
                </Grid>
                <Grid item xs={1} sm={1} md={2}>
                </Grid>
            </Grid>
        </Box>
    );
}