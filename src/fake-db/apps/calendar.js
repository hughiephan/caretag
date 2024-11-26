// Vars
const date = new Date()
const nextDay = new Date(date.getTime() + 24 * 60 * 60 * 1000)

const nextMonth =
  date.getMonth() === 11 ? new Date(date.getFullYear() + 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() + 1, 1)

const prevMonth =
  date.getMonth() === 11 ? new Date(date.getFullYear() - 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() - 1, 1)

export const events = [
  {
    id: '1',
    url: '',
    title: 'Counselling',
    start: date,
    end: nextDay,
    allDay: false,
    extendedProps: {
      calendar: 'Appointment'
    }
  },
  {
    id: '2',
    url: '',
    title: 'Specialist appointments',
    start: new Date(date.getFullYear(), date.getMonth() + 1, -11),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -10),
    allDay: true,
    extendedProps: {
      calendar: 'Appointment'
    }
  },
  {
    id: '3',
    url: '',
    title: 'Imaging/Radiography',
    allDay: true,
    start: new Date(date.getFullYear(), date.getMonth() + 1, -9),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -7),
    extendedProps: {
      calendar: 'Private'
    }
  },
  {
    id: '4',
    url: '',
    title: "Doctor's Appointment",
    start: new Date(date.getFullYear(), date.getMonth() + 1, -11),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -10),
    allDay: true,
    extendedProps: {
      calendar: 'Appointment'
    }
  },
  {
    id: '5',
    url: '',
    title: 'GP appointment,',
    start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
    allDay: true,
    extendedProps: {
      calendar: 'Appointment'
    }
  },
  {
    id: '6',
    url: '',
    title: 'Dietitian',
    start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
    allDay: true,
    extendedProps: {
      calendar: 'Personal'
    }
  },
  {
    id: '7',
    url: '',
    title: 'Pathology',
    start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
    allDay: true,
    extendedProps: {
      calendar: 'Private'
    }
  },
  {
    id: '8',
    url: '',
    title: 'Surgery',
    start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
    allDay: true,
    extendedProps: {
      calendar: 'Private'
    }
  },
  {
    id: '9',
    url: '',
    title: 'Rehabilitation',
    start: nextMonth,
    end: nextMonth,
    allDay: true,
    extendedProps: {
      calendar: 'Personal'
    }
  },
  {
    id: '10',
    url: '',
    title: 'Hospital admission',
    start: prevMonth,
    end: prevMonth,
    allDay: true,
    extendedProps: {
      calendar: 'Private'
    }
  }
]
