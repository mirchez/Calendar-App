import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../"
import { localizer } from '../../helpers'
import { useState } from 'react'
import { useUiStore, useCalendarStore } from '../../hooks'


export  const CalendarPage = () => {
  const { openDateModal } = useUiStore()
  const {events, setActiveEvent} = useCalendarStore() 
  
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
      openDateModal()

  }
  
  const onSelect = (e) =>{
    setActiveEvent(e)
  }
  
  const onViewChanged = (e) =>{
    localStorage.setItem('lastView', e)
    setLastView(e)
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
          onDoubleClickEvent={ onDoubleClick }
          onSelectEvent={ onSelect }
          onView={ onViewChanged }
        />

        <CalendarModal/>
        <FabAddNew/>
        <FabDelete/>
    </>
  )
}


