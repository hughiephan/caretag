// Component Imports
import HomePageWrapper from '@/views/dashboards/home/index'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const HomePage = () => {
  // Vars
  const mode = getServerMode()

  return <HomePageWrapper mode={mode} />
}

export default HomePage
