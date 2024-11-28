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

const BMIForm = ({ BMIResponseData }) => {
    const { data: session, status } = useSession()
    const [attributes, setAttributes] = useState(JSON.parse(JSON.stringify(BMIResponseData[0])))
    const [candidate, setCandidate] = useState(JSON.parse(JSON.stringify(attributes)));

    const handleAdd = async () => {
        if (status != "authenticated") {
            console.log('missing user id to update bmi')
            
            return;
        }

        candidate.user_id = session.user.id;
        candidate.date = formatDate(new Date());

        const response = await axios.post(`/api/pages/profile/bmi`, candidate);
        
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
            <CardHeader title='BMI History' subheader='' />
            <CardContent>
            <Box>
                <TextField
                fullWidth
                label="BMI"
                id="filled-hidden-label-small"
                defaultValue={attributes.BMI}
                onChange={event => candidate.BMI = event.target.value}
                variant="filled"
                />
                <TextField
                fullWidth
                label="Weight"
                id="filled-hidden-label-small"
                defaultValue={attributes.weight}
                onChange={event => candidate.weight = event.target.value}
                variant="filled"
                />
                <TextField
                fullWidth
                label="Height"
                id="filled-hidden-label-small"
                defaultValue={attributes.height}
                onChange={event => candidate.height = event.target.value}
                variant="filled"
                />
                <TextField
                fullWidth
                disabled
                label="Last update date"
                id="filled-hidden-label-small"
                defaultValue={formattedDate(new Date(attributes.date))}
                variant="filled"
                />
                <Button onClick={handleAdd}>Add</Button>
                {/* <Button onClick={()=>{}}>Cancel</Button> */}
            </Box>
            </CardContent>
        </Card>
        </>
    );
}

export default BMIForm
