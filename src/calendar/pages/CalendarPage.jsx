import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../"
import { localizer } from '../../helpers'
import { useEffect, useState } from 'react'
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks'


export  const CalendarPage = () => {

  const { user } = useAuthStore()
  const { openDateModal } = useUiStore()
  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore() 
  
  const [lastView, setLastView] = useState( localStorage.getItem( 'lastView' ) || 'month' );

  const eventStyleGetter = (event, start, end, isSelectec) =>{

    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid)

    const style = {
      backgroundColor: isMyEvent ? "#347cf7" : "#9b9b9b",
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }

    return {
      style
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

  useEffect(() => {
    startLoadingEvents() 
  }, [])
  
  return (
    <>
        <Navbar/>

        <Calendar
          culture='en-US' //should take the location of where the consumer is from and set respectively, in this case I'll use english
          localizer={localizer}
          events={ events }
          view={lastView}
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


