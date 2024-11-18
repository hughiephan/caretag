'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));


const HomePageWrapper = () => {

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3000/api/pages/home`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();

        setResult(json);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!result) {
    return <div>Loading...</div>;
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
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <Item elevation={12}>
          <Typography sx={{ pt:5 }} align='center' className='font-medium' color='text.primary'>
            {result.message}
          </Typography>
        </Item>
      </Grid>
      <Grid item xs={4}></Grid>
    </Grid>
    </>
  )
}

export default HomePageWrapper
