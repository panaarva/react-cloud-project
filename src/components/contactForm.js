import React, {useState} from "react";
import {insertMessage} from "../utils/firebaseData";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import {Alert, Snackbar, Typography} from "@mui/material";

export default function ContactForm() {
    const [contactData, setContactData] = useState({
        name: '',
        surname: '',
        email: '',
        message: ''
    })
    const [message, setMessage] = useState({
        value: '',
        type: ''
    })
    const [open, setOpen] = React.useState(false);

    const submitForm = async () => {
        const keys = Object.keys(contactData)
        let err = false
        keys.map((key) => {
            if (!contactData[key]) {
                err = true
            }
            document.getElementById(key).value = ''
            return "ok"
        })
        if (err) {
            setMessage({
                value: "Fill all Fields",
                type: "error"
            })
        } else {
            const resp = await insertMessage(contactData)
            setMessage(resp)
        }
        setOpen(true);
    }
    const changeTextField = (id) => {
        setContactData({
            ...contactData, [id]: document.getElementById(id).value
        })
    }
    return (
        <div>
            <Typography variant="h4" component="div" gutterBottom>Contact Form</Typography>
            <FormGroup>
                <TextField id="name" label="Name" variant="outlined" onChange={() => changeTextField("name")}/>
                <br/>
                <TextField id="surname" label="Surname" variant="outlined" onChange={() => changeTextField("surname")}/>
                <br/>
                <TextField id="email" label="Email" variant="outlined" onChange={() => changeTextField("email")}/>
                <br/>
                <TextField
                    id="message"
                    label="Message"
                    multiline
                    rows={4}
                    defaultValue=""
                    onChange={() => changeTextField("message")}
                />
                <br/>
                <Button className='button' onClick={submitForm} variant="contained">Send</Button>
            </FormGroup>
            <Snackbar open={open} autoHideDuration={100}>
                <Alert severity={message.type} sx={{width: '100%'}}>
                    {message.value}
                </Alert>
            </Snackbar>
        </div>
    )
}