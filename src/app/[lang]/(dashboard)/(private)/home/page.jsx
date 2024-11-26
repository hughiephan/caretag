// Component Imports
import HomePageWrapper from '@/views/dashboards/home/index'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const HomePage = () => {
  // Vars
  const mode = getServerMode()

  return (
  <>
    <div style={{ 
      backgroundImage: `url(${'/images/pages/backgroundV2.png'})`,
      backgroundRepeat: 'no-repeat',
      width:'100%' ,
    }}>
      <HomePageWrapper mode={mode} />
    </div>
  </>)
}

export default HomePage
