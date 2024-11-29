'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

// Component Imports
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Icon from '@mui/material/Icon';

import { useSession } from 'next-auth/react'

import { Button } from '@mui/material'

import DocumentWrapper from '@/views/apps/document/DocumentWrapper'

// Third-party Imports

// Config Imports
import themeConfig from '@configs/themeConfig'

// Styled Component Imports
import AppDocument from '@/libs/styles/AppDocument'

const axios = require('axios');

const DocumentApp = () => {
  const [doFetch, setDoFetch] = useState(true);
  const [files, setFiles] = useState([]);
  const [checked, setChecked] = useState([]);
  const { data: session, status } = useSession()
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensure client-side rendering
  }, []);

  const getAllFiles = async (id) => {
    const response = await axios.get(`/api/pages/document?userId=${id}`);

    setFiles(response.data);
  }

  const handleToggle = (fileName) => () => {
    const currentIndex = checked.indexOf(fileName);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(fileName);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const downloadFile = async (fileName) => {
    if (!window.confirm(`Do you want to download ${fileName}?`)) {
      return;
    }


    const body = {userId: session.user.id, file: fileName}

    console.log(body)

    try {
      const response = await axios.put(`/api/pages/document`, body);

      console.log(response.data)
      console.log(response)

      // Create a blob from the response
      const blob = new Blob([Buffer.from(await response.data.data, 'base64')], { type: await response.type });

      console.log(blob)
      const link = document.createElement('a');

      link.href = window.URL.createObjectURL(blob);
      link.download = fileName; // multiple files: filename1||filename2
      link.click(); // Trigger download
      link.remove(); // cleanup
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }

  const deleteFiles = async () => {
    if (!window.confirm(`Do you want to delete all checked files?`)) {
      return;
    }

    if (checked.length === 0) {
      alert("No file is selected!");

      return;
    }

    const response = await axios.delete(`/api/pages/document`, {data: {userId: session.user.id, files: checked}});

    if (response.status !== 200) {
      alert(`Fail to delete files`);
    } else {
      // Force refresh the page
      window.location.reload();
    }
  }

  if (status === "authenticated" && doFetch) {
    getAllFiles(session.user.id);
    setDoFetch(false);
  }

  if (!isMounted) {
    return null; // Avoid hydration issues
  }

  return (
    <>
      <Typography fontSize={20}>Your uploaded files : </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <List dense={true} className='overflow-visible' sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
            {
              <>
              {doFetch ? <CircularProgress /> : null }
              {files.length !== 0 ? Array.from(files).map((fileName) => {
                const labelId = `checkbox-list-label-${fileName}`;

                return (
                  <ListItem
                    key={fileName}
                    disablePadding
                  >
                    <ListItemButton dense>
                      <ListItemIcon>
                        <Checkbox
                          onClick={handleToggle(fileName)}
                          edge="start"
                          checked={checked.includes(fileName)}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
                      <ListItemIcon onClick={()=>{downloadFile(fileName)}}>
                        <i className="ri-file-check-line"></i>
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${fileName}`} onClick={()=>{downloadFile(fileName)}} />
                    </ListItemButton>
                  </ListItem>
                );
              }) : <Typography sx={{ ml: 5 }}>No files have been uploaded.</Typography>}
              </>
            }
          </List>
          {files.length !== 0 ?
            <Button variant='outlined' color='error' sx={{mt: 5, ml: 3}} onClick={deleteFiles}>
              <Icon aria-label="delete" className='ri-delete-bin-7-fill'/>
              <Typography sx={{ml: 3}}>Delete</Typography>
            </Button>
          : null}
        </Grid>
      </Grid>
      <Card className='overflow-visible' sx={{ my: themeConfig.layoutPadding }}>
        <AppDocument className='app-document'>
          <DocumentWrapper />
        </AppDocument>
      </Card>
    </>
  )
}

export default DocumentApp
