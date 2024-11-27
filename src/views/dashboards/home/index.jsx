'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

// Third-party Imports
import { useSession } from 'next-auth/react'


const HomePageWrapper = () => {
  const [doFetch, setDoFetch] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession()

  
  async function fetchData(id) {
    try {
      const response = await fetch(`/api/pages/home?userId=${id}`);

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
    fetchData(session.user.id);
    setDoFetch(false);
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!result) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }
  

  return (
    <>
    <Grid container spacing={3}>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <Typography align='center' className='font-extrabold text-primary sm:text-[38px] text-3xl mbe-4 leading-[44px]'>
          AI Summary
        </Typography>
      </Grid>
      <Grid item xs={4}></Grid>
    </Grid>
    <Grid container spacing={3}>
      <Grid item xs={3}></Grid>
      <Grid item xs={7}>
        <Typography sx={{ pt:5 }} className='font-medium' color='text.primary'>
          <div dangerouslySetInnerHTML={{ __html: result.message }} />
        </Typography>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
    </>
  )
}

export default HomePageWrapper
