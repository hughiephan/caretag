// Component Imports
import UserList from '@views/pages/team'

// Data Imports
import { getUserData } from '@/app/server/actions'

const UserListApp = async () => {

  const data = await getUserData()

  return <UserList userData={data} />
}

export default UserListApp
