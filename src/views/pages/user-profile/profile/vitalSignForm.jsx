'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

const VitalSignForm = ({ VitalSignResponseData }) => {

    return (
        <>  
        <Card>
            <CardHeader title='Vital sign History' subheader='' />
            <CardContent>
            <Box>
                <div>
                <TextField
                fullWidth
                label="Taken By"
                id="filled-hidden-label-small"
                defaultValue={VitalSignResponseData[0].takenBy}
                variant="filled"
                />
                <TextField
                fullWidth
                label="Temperature"
                id="filled-hidden-label-small"
                defaultValue={VitalSignResponseData[0].temperature}
                variant="filled"
                />
                <TextField
                fullWidth
                label="HeartRate"
                id="filled-hidden-label-small"
                defaultValue={VitalSignResponseData[0].heartRate}
                variant="filled"
                />
                <TextField
                fullWidth
                label="Blood Pressure"
                id="filled-hidden-label-small"
                defaultValue={VitalSignResponseData[0].bloodPressure}
                variant="filled"
                />
                <TextField
                fullWidth
                label="Glucose Levels"
                id="filled-hidden-label-small"
                defaultValue={VitalSignResponseData[0].glucoseLevels}
                variant="filled"
                />
                <TextField
                fullWidth
                disabled
                label="Date take"
                id="filled-hidden-label-small"
                defaultValue={VitalSignResponseData[0].dateTake}
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

export default VitalSignForm
