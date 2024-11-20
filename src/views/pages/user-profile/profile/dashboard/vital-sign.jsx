'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'

// Styled Component Imports
import AppReactApexCharts from '@/libs/styles/AppReactApexCharts'

const VitalSign = ({ VitalSignResponseData }) => {
  
  // Hooks
  const theme = useTheme()

  const dates = []
  let series = []

  const historyList = {
    takenBy: [],
    temperature: [],
    heartRate: [],
    bloodPressure: [],
    glucoseLevels: []
  }

  // split each attributes into datasets
  VitalSignResponseData.forEach(item => {
    dates.push(item.dateTake)
    historyList.takenBy.push(item.takenBy)
    historyList.temperature.push(item.temperature)
    historyList.heartRate.push(item.heartRate)
    historyList.bloodPressure.push(item.bloodPressure)
    historyList.glucoseLevels.push(item.glucoseLevels)
  })
  
  
  Object.keys(historyList).forEach(key => {
    console.log(key)
    console.log(historyList[key])
    series.push({
      name: key,
      data: historyList[key]
    })
  })


  const options = {
    chart: {
      type: 'line',
      stacked: false,
      parentHeightOffset: 0,
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    markers: {
      size: 5,
      colors: ['#fff'],
      strokeColors: 'var(--mui-palette-primary-main)',
      hover: { size: 6 },
      radius: 4
    },
    stroke: {
      curve: 'smooth',
      width: [0, 3],
      lineCap: 'round'
    },
    legend: {
      show: true,
      position: 'bottom',
      markers: {
        width: 8,
        height: 8,
        offsetY: 1,
        offsetX: theme.direction === 'rtl' ? 8 : -4
      },
      height: 40,
      itemMargin: {
        horizontal: 10,
        vertical: 0
      },
      fontSize: '15px',
      fontFamily: 'Open Sans',
      fontWeight: 400,
      labels: { colors: 'var(--mui-palette-text-primary)' },
      offsetY: 10
    },
    grid: {
      strokeDashArray: 8,
      borderColor: ['var(--mui-palette-divider)']
    },
    colors: ['var(--mui-palette-warning-main)', 'var(--mui-palette-primary-main)'],
    fill: { opacity: [1, 1] },
    plotOptions: {
      bar: {
        columnWidth: '30%',
        borderRadius: 4,
        borderRadiusApplication: 'end'
      }
    },
    dataLabels: { enabled: false },
    xaxis: {
      tickAmount: 10,
      categories: dates,
      labels: {
        style: {
          colors: '#fff',
          fontSize: '13px',
          fontWeight: 400
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        style: {
          colors: '#fff',
          fontSize: '13px',
          fontWeight: 400
        }
      },
      min: 0,
      max: 300
    }
  }

  return (
    <>
      <Card>
        <CardHeader title='Vital sign History' subheader=''/>
        <CardContent>
          <AppReactApexCharts
            id='vital-sign-history'
            type='line'
            height={313}
            width='100%'
            series={series}
            options={options}
          />
        </CardContent>
      </Card>
      
    </>
  )
}

export default VitalSign
