'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// Third-party Imports
import { useSession } from 'next-auth/react'

import AboutOverview from './AboutOverview'
import BMIForm from './bmiForm'
import AllergyForm from './allergyForm'
import VitalSignForm from './vitalSignForm'
import BMI from './dashboard/bmi'
import AllergyTable from './dashboard/allergy' 
import VitalSign from './dashboard/vital-sign'

const ProfileTab = () => {
  const [doFetch, setDoFetch] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // https://next-auth.js.org/getting-started/client#usesession
  const { data: session, status } = useSession()

  const getAboutData = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/pages/profile?userId=${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();

      setResult(json);
    } catch (err) {
      setError(err.message);
    }
  }

  if (status === "authenticated" && doFetch) {
    getAboutData(session.user.id);
    setDoFetch(false);
  }

  if (error) {
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">Error: {error}</Alert>
      </Stack>);
  }

  if (!result) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={6}>
      <Grid item lg={4} md={5} xs={12}>
        <Grid item xs={12}>
          <AboutOverview user={result.user} />
        </Grid>
        <Grid item xs={12} pt={6}>
          <BMIForm BMIResponseData={result.BMI} />
        </Grid>
        <Grid item xs={12} pt={6}>
          <AllergyForm allergies={result.allergies} />
        </Grid>
        <Grid item xs={12} pt={6}>
          <VitalSignForm VitalSignResponseData={result.vitalSigns} />
        </Grid>
      </Grid>
      <Grid item lg={8} md={7} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <BMI BMIResponseData={result.BMI} />
          </Grid>
          <Grid item xs={12}>
            <AllergyTable allergies={result.allergies} userId={result.user.id} />
          </Grid>
          <Grid item xs={12}>
            <VitalSign VitalSignResponseData={result.vitalSigns} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProfileTab
