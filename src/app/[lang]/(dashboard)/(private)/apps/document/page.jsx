// MUI Imports
import Card from '@mui/material/Card'

// Component Imports
import List from '@mui/material/List'

import DocumentWrapper from '@/views/apps/document/DocumentWrapper'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Styled Component Imports
import AppDocument from '@/libs/styles/AppDocument'

const DocumentApp = () => {
  return (
    <>
      <p>Your uploaded files</p>
      <List className='overflow-visible'>
        {'Listing exist files...'}
      </List>
      <Card className='overflow-visible' sx={{ my: themeConfig.layoutPadding }}>
        <AppDocument className='app-document'>
          <DocumentWrapper />
        </AppDocument>
      </Card>
    </>
  )
}

export default DocumentApp
