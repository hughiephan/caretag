'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

const BMIForm = ({ BMIResponseData }) => {

    return (
        <>  
        <Card>
            <CardHeader title='BMI History' subheader='' />
            <CardContent>
            <Box>
                <div>
                <TextField
                fullWidth
                label="BMI"
                id="filled-hidden-label-small"
                defaultValue={BMIResponseData[0].bmi}
                variant="filled"
                />
                <TextField
                fullWidth
                label="Weight"
                id="filled-hidden-label-small"
                defaultValue={BMIResponseData[0].weight}
                variant="filled"
                />
                <TextField
                fullWidth
                label="Height"
                id="filled-hidden-label-small"
                defaultValue={BMIResponseData[0].height}
                variant="filled"
                />
                <TextField
                fullWidth
                disabled
                label="Last update date"
                id="filled-hidden-label-small"
                defaultValue={BMIResponseData[0].date}
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

export default BMIForm
