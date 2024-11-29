'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';

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

    return `${year}-${month}-${day}`;
}

const AllergyForm = ({ allergies }) => {
    const { data: session, status } = useSession()
    const [attributes, setAttributes] = useState(JSON.parse(JSON.stringify(allergies[0])))
    const [candidate, setCandidate] = useState(JSON.parse(JSON.stringify(attributes)));
    const [loading, setLoading] = useState(false);

    const handleAdd = async () => {
        if (status != "authenticated") {
            console.log('missing user id to update bmi')

            return;
        }

        setLoading(true);

        candidate.user_id = session.user.id;
        candidate.date_diagnosed = formatDate(new Date());
        delete candidate.allergy_name
        delete candidate.category_name;
        delete candidate.common_symptoms
        delete candidate.description
        delete candidate.severity_name
        console.log(candidate)
        const response = await axios.post(`/api/pages/profile/allergy`, candidate);

        if (response.status !== 200) {
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
            <InputLabel id="name-select-label">Name</InputLabel>
            <Select
                fullWidth
                labelId="name-select-label"
                id="name-select"
                defaultValue={1}
                onChange={event => candidate.allergy_id = event.target.value}
                label="Name"
            >
                <MenuItem value={1}>Peanut Allergy</MenuItem>
                <MenuItem value={2}>Shellfish Allergy</MenuItem>
                <MenuItem value={3}>Pollen Allergy</MenuItem>
                <MenuItem value={4}>Dust Mite Allergy</MenuItem>
                <MenuItem value={5}>Egg Allergy</MenuItem>
                <MenuItem value={6}>Milk Allergy</MenuItem>
                <MenuItem value={7}>Pet Dander Allergy</MenuItem>
                <MenuItem value={8}>Insect Sting Allergy</MenuItem>
                <MenuItem value={9}>Wheat Allergy</MenuItem>
                <MenuItem value={10}>Soy Allergy</MenuItem>
                <MenuItem value={11}>Mold Allergy</MenuItem>
                <MenuItem value={12}>Tree Nut Allergy</MenuItem>
                <MenuItem value={13}>Latex Allergy</MenuItem>
                <MenuItem value={14}>Penicillin Allergy</MenuItem>
                <MenuItem value={15}>Fragrance Allergy</MenuItem>
                <MenuItem value={16}>Sun Allergy</MenuItem>
                <MenuItem value={17}>Avocado Allergy</MenuItem>
                <MenuItem value={18}>Banana Allergy</MenuItem>
                <MenuItem value={19}>Garlic Allergy</MenuItem>
                <MenuItem value={20}>Nickel Allergy</MenuItem>
                <MenuItem value={21}>Apple Allergy</MenuItem>
                <MenuItem value={22}>Strawberry Allergy</MenuItem>
                <MenuItem value={23}>Sesame Allergy</MenuItem>
                <MenuItem value={24}>Bee Pollen Allergy</MenuItem>
                <MenuItem value={25}>Chocolate Allergy</MenuItem>
                <MenuItem value={26}>Chicken Allergy</MenuItem>
                <MenuItem value={27}>Oat Allergy</MenuItem>
                <MenuItem value={28}>Perfume Allergy</MenuItem>
                <MenuItem value={29}>Coconut Allergy</MenuItem>
                <MenuItem value={30}>Fish Allergy</MenuItem>
                <MenuItem value={31}>Mustard Allergy</MenuItem>
                <MenuItem value={32}>Meat Allergy</MenuItem>
                <MenuItem value={33}>Sunflower Seed Allergy</MenuItem>
                <MenuItem value={34}>Tomato Allergy</MenuItem>
                <MenuItem value={35}>Sulphite Allergy</MenuItem>
                <MenuItem value={36}>Carrot Allergy</MenuItem>
                <MenuItem value={37}>Yeast Allergy</MenuItem>
                <MenuItem value={38}>Pepper Allergy</MenuItem>
            </Select>
            <TextField
                fullWidth
                label="Symptoms"
                id="filled-hidden-label-small"
                defaultValue={attributes.symptoms}
                onChange={event => candidate.symptoms = event.target.value}
                variant="filled"
                size="small"
            />
            <InputLabel id="demo-simple-select-label">Severity</InputLabel>
            <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={1}
                onChange={event => candidate.severity_id = event.target.value}
                label="Severity"
            >
                <MenuItem value={1}>Low</MenuItem>
                <MenuItem value={2}>Medium</MenuItem>
                <MenuItem value={3}>High</MenuItem>
            </Select>
            <TextField
                fullWidth
                disabled
                label="Last time diagnosed date"
                id="filled-hidden-label-small"
                defaultValue={formatDate(new Date(attributes.date_diagnosed))}
                variant="filled"
                size="small"
            />
            <TextField
                fullWidth
                label="Notes"
                id="filled-hidden-label-small"
                defaultValue={attributes.notes}
                onChange={event => candidate.notes = event.target.value}
                variant="filled"
                size="small"
            />
            <LoadingButton
              onClick={handleAdd}
              endIcon={<i className='ri-sticky-note-add-fill'></i>}
              loading={loading}
              loadingPosition='end'
              variant='contained'
              sx={{ mt: 5, mb: 3 }}
            >
              Add
            </LoadingButton>
            </Box>
            </CardContent>
        </Card>
        </>
    );
}

export default AllergyForm
