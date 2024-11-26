'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

// Component Imports
import Grid from '@mui/material/Grid';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DocumentWrapper from '@/views/apps/document/DocumentWrapper'

// Third-party Imports
import { useSession } from 'next-auth/react'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Styled Component Imports
import AppDocument from '@/libs/styles/AppDocument'

const axios = require('axios');

const DocumentApp = () => {
  const [doFetch, setDoFetch] = useState(true);
  const [files, setFiles] = useState([]);
  const { data: session, status } = useSession()

  const getAllFiles = async (id) => {
    const response = await axios.get(`/api/pages/document?userId=${id}`);
    setFiles(response.data);
  }

  console.log(status)

  if (status === "authenticated" && doFetch) {
    getAllFiles(session.user.id);
    setDoFetch(false);
  }

  return (
    <>
      <p>Your uploaded files : </p>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <List dense={true} className='overflow-visible'>
            {
              <>
              {doFetch ? <CircularProgress /> : null }
              {files ? Array.from(files).map((fileName) => (
                <ListItem>
                  <ListItemIcon>
                    <i class="ri-file-fill"></i>
                  </ListItemIcon>
                  <ListItemText primary={fileName}/>
                </ListItem>
              )) : <Typography>No files have been uploaded.</Typography>}
              </>
            }
          </List>
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
