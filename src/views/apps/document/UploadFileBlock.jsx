// React Imports
import { useState } from 'react'

// MUI Imports
import List from '@mui/material/List'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// Third-party Imports
import { toast } from 'react-toastify'

// Icon Imports
import { useDropzone } from 'react-dropzone'

const FileUploaderRestrictions = () => {
  // States
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])

  // Hooks
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 2,
    maxSize: 2000000,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    },
    onDropRejected: () => {
      toast.error('You can only upload 2 files & maximum size of 2 MB.', {
        autoClose: 3000
      })
    }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
    } else {
      return <i className='ri-file-text-line' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)

    setFiles([...filtered])
  }

  const fileList = files.map(file => (
    <ListItem key={file.name}>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <i className='ri-close-line text-xl' />
      </IconButton>
    </ListItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  const handleUploadAllFiles = async () => {
    const uploadedFiles = files

    console.log(uploadedFiles)

    if (uploadedFiles.length === 0) {
      return
    }

    setUploading(true)

    const uploadedFilesList = []

    for (let file of files) {
      try {
        // upload file to cloud storage
        uploadedFilesList.push(file)
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error)
      }
    }

    setUploadedFiles(uploadedFilesList)
    setUploading(false)
    handleRemoveAllFiles()
  }

  return (
    <>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <div className='flex items-center flex-col'>
          <Avatar variant='rounded' className='bs-12 is-12 mbe-9'>
            <i className='ri-upload-2-line' />
          </Avatar>
          <Typography variant='h4' className='mbe-2.5'>
            Drop files here or click to upload.
          </Typography>
          <Typography color='text.secondary'>Allowed *.jpeg, *.jpg, *.png, *.gif</Typography>
          <Typography color='text.secondary'>Max 2 files and max size of 2 MB</Typography>
        </div>
      </div>
      {files.length ? (
        <>
          <List>{fileList}</List>
          <div className='buttons'>
            <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
              Remove All
            </Button>
            <Button variant='contained' onClick={handleUploadAllFiles}>
              {uploading ? 'Uploading...' : 'Upload Files'}
            </Button>
          </div>
        </>
      ) : null}

      {uploadedFiles.length ? (
        <>
          <div>
            <h3>Uploaded Files:</h3>
            <List>
              {uploadedFiles.map(file => (
                <ListItem key={file.name}>
                  <div className='file-details'>
                    <div className='file-preview'>
                      {renderFilePreview(file)}
                      <Typography className='file-name'>{file.name}</Typography>
                      <Typography className='file-size' variant='body2'>
                        {Math.round(file.size / 100) / 10 > 1000
                          ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                          : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
                      </Typography>
                    </div>
                  </div>
                </ListItem>
              ))}
            </List>
          </div>
        </>
      ) : null}
    </>
  )
}

export default FileUploaderRestrictions
