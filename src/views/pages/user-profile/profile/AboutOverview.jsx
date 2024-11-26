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

// Third-party Imports
import { useSession } from 'next-auth/react'
import axios from 'axios';

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

// Format the date into 'MM/DD/YYYY'
const formattedDate = (date) => {return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`};

const AboutOverview = ({ user }) => {
  const [open, setOpen] = useState(false);

  const { data: session, status } = useSession()
  
  const handleSave = async () => {
    if (status != "authenticated") {
      console.log('missing user id to update bmi')
      return;
    }

    candidate.user_id = session.user.id;

    console.log(candidate)
    const response = await axios.put(`/api/pages/profile`,candidate);
    
    if (response.status != 200) {
      alert(`Can't update user information, please contact administrator.`);
    }

    setAttributes(candidate);
    setOpen(false);
    
    // Force refresh the page
    window.location.reload();
  };

  const handleClose = () => {
    // reset user data
    setCandidate(JSON.parse(JSON.stringify(attributes)))
    setOpen(false);
  };

  const [attributes, setAttributes] = useState(user[0])
  const [candidate, setCandidate] = useState(JSON.parse(JSON.stringify(attributes)))

  const handleEdit = user => {
    setAttributes(user[0]);
    setOpen(true);
  }


  console.log("user");
  console.log(user)
  
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <Typography className='uppercase' variant='body2' color='text.disabled'>
                About
              </Typography>
              {user ? 
              <>
                <div className='flex items-center gap-2'>
                  <i className={'ri-user-3-line'} />
                  <div className='flex items-center flex-wrap gap-2'>
                    <Typography className='font-medium'>Full name:</Typography>
                    <Typography> 
                      {
                      user[0].first_name.charAt(0).toUpperCase() + user[0].first_name.slice(1) + ' ' +
                      user[0].middle_names.charAt(0).toUpperCase()  + user[0].middle_names.slice(1) + ' ' +
                      user[0].last_name.charAt(0).toUpperCase() + user[0].last_name.slice(1)
                      }
                    </Typography>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <i className={'ri-home-3-line'} />
                  <div className='flex items-center flex-wrap gap-2'>
                    <Typography className='font-medium inline'>Address:</Typography>
                    <Typography> {user[0].address} </Typography>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <i className={'ri-map-pin-3-line'} />
                  <div className='flex items-center flex-wrap gap-2'>
                    <Typography className='font-medium'>City:</Typography>
                    <Typography> {user[0].city} </Typography>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <i className={'ri-flag-line'} />
                  <div className='flex items-center flex-wrap gap-2'>
                    <Typography className='font-medium'>Country:</Typography>
                    <Typography> {user[0].country} </Typography>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <i className={'ri-calendar-event-line'} />
                  <div className='flex items-center flex-wrap gap-2'>
                    <Typography className='font-medium'>DOB:</Typography>
                    <Typography> {formattedDate(new Date(user[0].dob))} </Typography>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <i className={'ri-user-3-line'} />
                  <div className='flex items-center flex-wrap gap-2'>
                    <Typography className='font-medium'>Gender:</Typography>
                    <Typography> {user[0].gender_name} </Typography>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <i className={'ri-drop-line'} />
                  <div className='flex items-center flex-wrap gap-2'>
                    <Typography className='font-medium'>Blood Type:</Typography>
                    <Typography> {user[0].blood_type_name} </Typography>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <i className={'ri-smartphone-line'} />
                  <div className='flex items-center flex-wrap gap-2'>
                    <Typography className='font-medium'>Phone:</Typography>
                    <Typography> {user[0].phone} </Typography>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <i className={'ri-mail-line'} />
                  <div className='flex items-center flex-wrap gap-2'>
                    <Typography className='font-medium'>Email:</Typography>
                    <Typography> {user[0].email} </Typography>
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
                  defaultValue={attributes.first_name}
                  onChange={event => candidate.first_name = event.target.value}
                  variant="filled"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="middles name"
                  id="filled-hidden-label-small"
                  defaultValue={attributes.middle_names}
                  onChange={event => candidate.middle_names = event.target.value}
                  variant="filled"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Last name"
                  id="filled-hidden-label-small"
                  defaultValue={attributes.last_name}
                  onChange={event => candidate.last_name = event.target.value}
                  variant="filled"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Phone"
                  id="filled-hidden-label-small"
                  defaultValue={attributes.phone}
                  onChange={event => candidate.phone = event.target.value}
                  variant="filled"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Email"
                  id="filled-hidden-label-small"
                  defaultValue={attributes.email}
                  onChange={event => candidate.email = event.target.value}
                  variant="filled"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Address"
                  id="filled-hidden-label-small"
                  defaultValue={attributes.address}
                  onChange={event => candidate.address = event.target.value}
                  variant="filled"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="City"
                  id="filled-hidden-label-small"
                  defaultValue={attributes.city}
                  onChange={event => candidate.city = event.target.value}
                  variant="filled"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Country"
                  id="filled-hidden-label-small"
                  defaultValue={attributes.country}
                  onChange={event => candidate.country = event.target.value}
                  variant="filled"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Blood Type"
                  id="filled-hidden-label-small"
                  defaultValue={attributes.blood_type_name}
                  onChange={event => candidate.blood_type_name = event.target.value}
                  variant="filled"
                  size="small"
                />
                </div>
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleClose}>Cancel</Button>
              </Box>
            </Modal>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AboutOverview
