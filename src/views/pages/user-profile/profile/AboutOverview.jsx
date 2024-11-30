// React Imports
import { useState } from 'react'

// MUI Imports
import { 
  Grid,
  Card, 
  Typography, 
  CardContent, 
  Button, 
  Modal, 
  Box, 
  TextField, 
  InputLabel, 
  Select, 
  MenuItem, 
  Tooltip
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';

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

// insert date format YYYY-MM-dd
const formatDate = (date) => {
  const pad = (num) => String(num).padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are zero-based
  const day = pad(date.getDate());

  return `${year}-${month}-${day}`;
}

const AboutOverview = ({ user }) => {
  const [loading, setLoading] = useState(1); // For Generate Token
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession()
  const [attributes, setAttributes] = useState(user[0])
  const [candidate, setCandidate] = useState(JSON.parse(JSON.stringify(attributes)))

  const generateToken = async () => {
    setLoading(2);
    const response = await axios.get(`/api/token`);

    console.log(await response.data);

    await navigator.clipboard.writeText(await response.data.data);

    if (response) {
      setLoading(3);
      setTimeout(() => {
        setLoading(1);
      }, 3000);
    }
  }
  
  const handleSave = async () => {
    if (status != "authenticated") {
      console.log('missing user id to update')

      return;
    }

    candidate.user_id = session.user.id;
    candidate.sex_id = candidate.gender_id;
    delete candidate.gender_name
    delete candidate.sex_name
    delete candidate.blood_type_name
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

  const handleEdit = user => {
    setAttributes(user[0]);
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
              {user ? 
              <>
                <div className='flex items-center gap-2'>
                  <i className={'ri-user-3-line'} />
                  <div className='flex items-center flex-wrap gap-2'>
                    <Typography className='font-medium'>Full name:</Typography>
                    <Typography> 
                      {
                      user[0].first_name.charAt(0).toUpperCase() + user[0].first_name.slice(1) + ' ' +
                      (user[0].middle_names ? user[0].middle_names?.charAt(0).toUpperCase()  + user[0].middle_names?.slice(1) + ' ': '')
                      + user[0].last_name.charAt(0).toUpperCase() + user[0].last_name.slice(1)
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
                <Grid>
                  <Button 
                    fullWidth
                    onClick={() => handleEdit(user)}
                    color='secondary'
                  >
                    <i className='ri-edit-box-line text-textSecondary' />
                    Edit
                  </Button >
                  <Tooltip
                    onClose={loading!==3}
                    open={loading===3}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title="Copyed to clipboard"
                    arrow
                    slotProps={{
                      popper: {
                        disablePortal: true,
                      },
                    }}
                  >
                    <LoadingButton
                      fullWidth
                      onClick={generateToken}
                      endIcon={<i className='ri-key-2-fill'></i>}
                      loading={loading===2}
                      loadingPosition='end'
                      variant='text'
                    >
                      Generate Token
                    </LoadingButton>
                  </Tooltip>
                </Grid>
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
                  label="Date of Birth"
                  id="filled-hidden-label-small"
                  defaultValue={formatDate(new Date(attributes.dob))}
                  onChange={event => candidate.dob = formatDate(new Date(event.target.value))}
                  variant="filled"
                  size="small"
                />
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                  fullWidth
                  labelId="gender-select-label"
                  id="gender-select"
                  defaultValue={attributes.gender_name == 'Male' ? 1 : 2}
                  onChange={event => candidate.gender_id = event.target.value}
                  label="Gender"
                >
                  <MenuItem value={1}>Male</MenuItem>
                  <MenuItem value={2}>Female</MenuItem>
                </Select>
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
                <InputLabel id="blood_type-select-label">Blood Type</InputLabel>
                <Select
                  fullWidth
                  labelId="blood_type-select-label"
                  id="blood_type-select"
                  defaultValue={1}
                  onChange={event => candidate.blood_type_id = event.target.value}
                  label="Blood Type"
                >
                  <MenuItem value={1}>O+</MenuItem>
                  <MenuItem value={2}>O-</MenuItem>
                  <MenuItem value={3}>A+</MenuItem>
                  <MenuItem value={4}>A-</MenuItem>
                  <MenuItem value={5}>B+</MenuItem>
                  <MenuItem value={6}>B-</MenuItem>
                  <MenuItem value={7}>AB+</MenuItem>
                  <MenuItem value={8}>AB-</MenuItem>
                </Select>
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
