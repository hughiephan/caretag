'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

const AllergyForm = ({ allergies }) => {

    return (
        <>  
        <Card>
            <CardHeader title='Allergy History' subheader='' />
            <CardContent>
            <Box>
                <div>
                <TextField
                fullWidth
                label="Name"
                id="filled-hidden-label-small"
                defaultValue={allergies[0].name}
                variant="filled"
                />
                <TextField
                fullWidth
                label="Category"
                id="filled-hidden-label-small"
                defaultValue={allergies[0].category}
                variant="filled"
                />
                <TextField
                fullWidth
                label="Common Symptoms"
                id="filled-hidden-label-small"
                defaultValue={allergies[0].commonSymptoms}
                variant="filled"
                />
                <TextField
                fullWidth
                label="Description"
                id="filled-hidden-label-small"
                defaultValue={allergies[0].description}
                variant="filled"
                />
                <TextField
                fullWidth
                label="Serverity"
                id="filled-hidden-label-small"
                defaultValue={allergies[0].serverity}
                variant="filled"
                />
                <TextField
                fullWidth
                label="Notes"
                id="filled-hidden-label-small"
                defaultValue={allergies[0].notes}
                variant="filled"
                />
                <TextField
                fullWidth
                disabled
                label="Date Diagnosed"
                id="filled-hidden-label-small"
                defaultValue={allergies[0].dateDiagnosed}
                variant="filled"
                />
                </div>
                <Button onClick={()=>{}}>Save</Button>
                <Button onClick={()=>{}}>Canel</Button>
            </Box>
            </CardContent>
        </Card>
        </>
    );
}

export default AllergyForm
