import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CalendarEvent, Navbar } from "../"
import { localizer } from '../../helpers'
import { useState } from 'react'


export  const CalendarPage = () => {

  const events = [{
    title: 'Boss Birthday',
    notes: 'Must buy a cake',
    start: new Date(2024, 9, 20, 10, 30),
    end: new Date(2024, 9, 20, 12, 0),
    bgColor: '#48e',
    user: {
      _id: '123',
      name: 'John Doe',
    },
  }]
  
  const [lastView, setLastView] = useState( localStorage.getItem( 'lastView' ) || 'week' );

  const eventStyleGetter = (event, start, end, isSelectec) =>{
    return {
      style: {
        backgroundColor:"#347cf7",
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white',
      },
    };
  }
  
  const onDoubleClick = (e) =>{
  
  }
  
  const onSelect = (e) =>{
  
  }
  
  const onViewChanged = (e) =>{
    localStorage.setItem('lastView', e)
    setLastView(e)
    console.log(e)
  }
  return (
    <>
        <Navbar/>

        <Calendar
          culture='en-US' //should take the location of where the consumer is from and set respectively, in this case I'll use english
          localizer={localizer}
          events={ events }
          defaultView={lastView}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100dvh' }}
          eventPropGetter={ eventStyleGetter }
          components={{
            event: CalendarEvent
          }}
          onDoubleClick={onDoubleClick}
          onSelectEvent={onSelect}
          onView={onViewChanged}
        />
    </>
  )
}


