'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

// Third-party Imports
import { useSession } from 'next-auth/react'
import axios from 'axios';

// Format the date into 'MM/DD/YYYY HH:mm:ss'
const formattedDate = (date) => {return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`};

// insert date format
const formatDate = (date) => {
    const pad = (num) => String(num).padStart(2, '0');
  
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Months are zero-based
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const VitalSignForm = ({ VitalSignResponseData }) => {
    const { data: session, status } = useSession()
    const [attributes, setAttributes] = useState(JSON.parse(JSON.stringify(VitalSignResponseData[0])))
    const [candidate, setCandidate] = useState(JSON.parse(JSON.stringify(attributes)));
    
    const handleAdd = async () => {
        if (status != "authenticated") {
            console.log('missing user id to update bmi')
            return;
        }

        candidate.user_id = session.user.id;
        candidate.date_taken = formatDate(new Date());

        console.log(candidate)
        const response = await axios.post(`/api/pages/profile/vitalsign`, candidate);
        
        if (response.status != 200) {
            alert(`Can't update user information, please contact administrator.`);
        }

        setAttributes(candidate);
        
        // Force refresh the page
        window.location.reload();
    };

    return (
        <>  
        <Card>
            <CardHeader title='Vital sign History' subheader='' />
            <CardContent>
            <Box>
                <TextField
                fullWidth
                label="Taken By"
                id="filled-hidden-label-small"
                defaultValue={attributes.taken_by}
                onChange={event => candidate.taken_by = event.target.value}
                variant="filled"
                />
                <TextField
                fullWidth
                label="Temperature"
                id="filled-hidden-label-small"
                defaultValue={attributes.temperature}
                onChange={event => candidate.temperature = event.target.value}
                variant="filled"
                />
                <TextField
                fullWidth
                label="Heart Rate"
                id="filled-hidden-label-small"
                defaultValue={attributes.heart_rate}
                onChange={event => candidate.heart_rate = event.target.value}
                variant="filled"
                />
                <TextField
                fullWidth
                label="Blood Pressure"
                id="filled-hidden-label-small"
                defaultValue={attributes.blood_pressure}
                onChange={event => candidate.blood_pressure = event.target.value}
                variant="filled"
                />
                <TextField
                fullWidth
                label="Glucose Levels"
                id="filled-hidden-label-small"
                defaultValue={attributes.glucose_levels}
                onChange={event => candidate.glucose_levels = event.target.value}
                variant="filled"
                />
                <TextField
                fullWidth
                disabled
                label="Date take"
                id="filled-hidden-label-small"
                defaultValue={formattedDate(new Date(attributes.date_taken))}
                variant="filled"
                />
                <Button onClick={handleAdd}>Save</Button>
                <Button onClick={()=>{}}>Cancel</Button>
            </Box>
            </CardContent>
        </Card>
        </>
    );
}

export default VitalSignForm
