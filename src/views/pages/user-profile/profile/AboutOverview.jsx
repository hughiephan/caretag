// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const renderList = list => {
  return (
    list.length > 0 &&
    list.map((item, index) => {
      return (
        <div key={index} className='flex items-center gap-2'>
          <i className={item.icon} />
          <div className='flex items-center flex-wrap gap-2'>
            <Typography className='font-medium'>
              {`${item.property.charAt(0).toUpperCase() + item.property.slice(1)}:`}
            </Typography>
            <Typography> {item.value.charAt(0).toUpperCase() + item.value.slice(1)}</Typography>
          </div>
        </div>
      )
    })
  )
}

const AboutOverview = ({ user }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [attributes, setAttributes] = useState(user)

  const handleEdit = user => {
    setAttributes(user);
    setOpen(true);
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <Typography className='uppercase' variant='body2' color='text.disabled'>
                About
              </Typography>
              {/* {data?.about && renderList(data?.about)} */}
              {user ? 
              <>
                <div className='flex items-center gap-2'>
                  <i className={'ri-user-3-line'} />
                  <div className='flex items-center flex-wrap gap-2'>
                    <Typography className='font-medium'>Full name:</Typography>
                    <Typography> 
                      {
                      user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1) + ' ' +
                      user.middleNames.charAt(0).toUpperCase()  + user.middleNames.slice(1) + ' ' +
                      user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)
                      } 
                    </Typography>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <i className={'ri-home-3-line'} />
                  <div className='flex items-center flex-wrap gap-2'>
                    <Typography className='font-medium'>Address:</Typography>
                    <Typography> {user.address} </Typography>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <i className={'ri-map-pin-3-line'} />
                  <div className='flex items-center flex-wrap gap-2'>
                    <Typography className='font-medium'>City:</Typography>
                    <Typography> {user.city} </Typography>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <i className={'ri-flag-line'} />
                  <div className='flex items-center flex-wrap gap-2'>
                    <Typography className='font-medium'>Country:</Typography>
                    <Typography> {user.country} </Typography>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <i className={'ri-user-3-line'} />
                  <div className='flex items-center flex-wrap gap-2'>
                    <Typography className='font-medium'>DOB:</Typography>
                    <Typography> {user.dob} </Typography>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <i className={'ri-user-3-line'} />
                  <div className='flex items-center flex-wrap gap-2'>
                    <Typography className='font-medium'>Sex:</Typography>
                    <Typography> {user.sex} </Typography>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <i className={'ri-user-3-line'} />
                  <div className='flex items-center flex-wrap gap-2'>
                    <Typography className='font-medium'>Gender:</Typography>
                    <Typography> {user.gender} </Typography>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <i className={'ri-user-3-line'} />
                  <div className='flex items-center flex-wrap gap-2'>
                    <Typography className='font-medium'>Blood Type:</Typography>
                    <Typography> {user.bloodType} </Typography>
                  </div>
                </div>
                <Button  size='small' onClick={() => handleEdit(user)}>
                  <i className='ri-edit-box-line text-textSecondary' />
                </Button >
              </>
              : null}
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div>
                <TextField
                  fullWidth
                  label="First name"
                  id="filled-hidden-label-small"
                  defaultValue={attributes.firstName}
                  variant="filled"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="middles name"
                  id="filled-hidden-label-small"
                  defaultValue={attributes.middleNames}
                  variant="filled"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Last name"
                  id="filled-hidden-label-small"
                  defaultValue={attributes.lastName}
                  variant="filled"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Address"
                  id="filled-hidden-label-small"
                  defaultValue={attributes.address}
                  variant="filled"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="City"
                  id="filled-hidden-label-small"
                  defaultValue={attributes.city}
                  variant="filled"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Country"
                  id="filled-hidden-label-small"
                  defaultValue={attributes.country}
                  variant="filled"
                  size="small"
                />
                </div>
                <Button onClick={handleClose}>Save</Button>
                <Button onClick={handleClose}>Canel</Button>
              </Box>
            </Modal>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AboutOverview
