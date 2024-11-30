// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import UserListTable from './UserListTable'

const UserList = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserListTable />
      </Grid>
    </Grid>
  )
}

export default UserList
