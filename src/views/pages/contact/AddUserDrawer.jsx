// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { useSession } from 'next-auth/react'


const axios = require('axios');

// Vars
const initialData = { firstName: '', middleNames: '', lastname: '', phone: '', email: '', relationship: '' }

const AddUserDrawer = props => {
  // Props
  const { open, handleClose, userData, setData } = props

  // States
  const { data: session, status } = useSession()
  const [candidate, setCandidate] = useState(initialData);

  const addNewContact = async () => {
    if (status === "authenticated") {
      candidate.user_id = session.user.id;
    }

    delete candidate.firstName
    delete candidate.lastname
    delete candidate.middleNames
    let response = await axios.post('/api/pages/contact', candidate);

    handleClose()
    resetForm({ firstName: '', middleNames: '', lastname: '', phone: '', email: '', relationship: '' })
  };

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { firstName: '', middleNames: '', lastname: '', phone: '', email: '', relationship: '' }
  })

  const handleReset = () => {
    handleClose()
    setCandidate(initialData)
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between pli-5 plb-4'>
        <Typography variant='h5'>Add New Contact</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='ri-close-line text-2xl' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-5'>
        <form onSubmit={addNewContact} className='flex flex-col gap-5'>
          <TextField
            fullWidth
            label='First name'
            placeholder='example: John Doe'
            onChange={event => candidate.firstName = event.target.value}
            {...(errors.firstName && { error: true, helperText: 'This field is required.' })}
          />
          <TextField
            fullWidth
            label='Middle names'
            placeholder=''
            onChange={event => candidate.middleNames = event.target.value}
            {...(errors.middleNames && { error: true, helperText: 'This field is required.' })}
          />
          <TextField
            fullWidth
            label='Last name'
            placeholder='johndoe'
            onChange={event => candidate.lastname = event.target.value}
            {...(errors.lastname && { error: true, helperText: 'This field is required.' })}
          />
          <TextField
            fullWidth
            type='email'
            label='Email'
            placeholder='johndoe@gmail.com'
            onChange={event => candidate.email = event.target.value}
            {...(errors.email && { error: true, helperText: 'This field is required.' })}
          />
          <TextField
            fullWidth
            label='Phone'
            placeholder=''
            onChange={event => candidate.phone = event.target.value}
            {...(errors.phone && { error: true, helperText: 'This field is required.' })}
          />
          <TextField
            fullWidth
            label='Relationship'
            placeholder=''
            onChange={event => candidate.relationship = event.target.value}
            {...(errors.relationship && { error: true, helperText: 'This field is required.' })}
          />
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
            <Button variant='outlined' color='error' type='reset' onClick={() => handleReset()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddUserDrawer
