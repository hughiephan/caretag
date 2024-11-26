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

const AllergyForm = ({ allergies }) => {
    const { data: session, status } = useSession()
    const [attributes, setAttributes] = useState(JSON.parse(JSON.stringify(allergies[0])))
    const [candidate, setCandidate] = useState(JSON.parse(JSON.stringify(attributes)));
    
    const handleAdd = async () => {
        const res = await axios.get(`/api/pages/profile/allergy`);
        const allergyList = res.data;
        console.log(attributes.allergy_name);
        console.log(candidate.allergy_name)
        let doInsert = false;
        allergyList.forEach((allergy)=>{ 
            if (allergy.allergy_name===candidate.allergy_name) {
                doInsert = true;
                candidate.allergy_id = allergy.allergy_id;
                delete candidate.allergy_name
            }
        })

        if (!doInsert) {
            alert("Allergy name does not match to database, please change Allergy name.");
            return;
        }
        if (status != "authenticated") {
            console.log('missing user id to update bmi')
            return;
        }

        candidate.user_id = session.user.id;
        candidate.date_diagnosed = formatDate(new Date());
        delete candidate.category_name;
        delete candidate.common_symptoms
        delete candidate.description
        console.log(candidate)
        const response = await axios.post(`/api/pages/profile/allergy`, candidate);
        
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
            <CardHeader title='Allergy History' subheader='' />
            <CardContent>
            <Box>
                <TextField
                fullWidth
                label="Name"
                id="filled-hidden-label-small"
                defaultValue={attributes.allergy_name}
                onChange={event => candidate.allergy_name = event.target.value}
                variant="filled"
                />
                <TextField
                fullWidth
                label="Symptoms"
                id="filled-hidden-label-small"
                defaultValue={attributes.symptoms}
                onChange={event => candidate.symptoms = event.target.value}
                variant="filled"
                />
                <TextField
                fullWidth
                label="Notes"
                id="filled-hidden-label-small"
                defaultValue={attributes.notes}
                onChange={event => candidate.notes = event.target.value}
                variant="filled"
                />
                <TextField
                fullWidth
                disabled
                label="Category"
                id="filled-hidden-label-small"
                defaultValue={attributes.category_name}
                onChange={event => candidate.category_name = event.target.value}
                variant="filled"
                />
                <TextField
                fullWidth
                disabled
                label="Common Symptoms"
                id="filled-hidden-label-small"
                defaultValue={attributes.common_symptoms}
                onChange={event => candidate.common_symptoms = event.target.value}
                variant="filled"
                />
                <TextField
                fullWidth
                disabled
                label="Description"
                id="filled-hidden-label-small"
                defaultValue={attributes.description}
                onChange={event => candidate.description = event.target.value}
                variant="filled"
                />
                <TextField
                fullWidth
                disabled
                label="Serverity"
                id="filled-hidden-label-small"
                defaultValue={attributes.severity_name}
                onChange={event => candidate.severity_name = event.target.value}
                variant="filled"
                />
                <TextField
                fullWidth
                disabled
                label="Date Diagnosed"
                id="filled-hidden-label-small"
                defaultValue={formattedDate(new Date(attributes.date_diagnosed))}
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

export default AllergyForm
