import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUploadNewEvent } from "../store/calendar/calendarSlice"
import calendarApi from "../api/calendarApi"
import { convertEventDate } from "../helpers"
import Swal from "sweetalert2"


export const useCalendarStore = () => {
    const dispatch = useDispatch()
    const {events, activeEvent} = useSelector( state => state.calendar)
    const {user} = useSelector( state => state.auth)

    const setActiveEvent = ( calendarEvent) =>{
        dispatch(onSetActiveEvent(calendarEvent)) 
    }

    const startSavingEvent = async ( calendarEvent ) =>{
        
        try {
            if ( calendarEvent.id){
                //update active event
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                dispatch( onUploadNewEvent({...calendarEvent, user}))
                return
            }
            //create
                const { data } = await calendarApi.post('/events/create', calendarEvent)
                dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }))
        } catch (error) {
            console.log(error)
            Swal.fire("Error saving event", error.response.data.msg,'error')
        }
    }
//solo edite algo de aca y funciono
    const startDeletingEvent = () =>{
        dispatch(onDeleteEvent())
    }

    const startLoadingEvents = async() =>{
        try {
            const { data } = await calendarApi.get('/events/get')
            
            const events = convertEventDate( data.event)
            dispatch( onLoadEvents(events) )

        } catch (error) {
            console.log("There was an error loading events")
            console.log(error)
        }
    }
    
    return {
        //properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        //methods
        setActiveEvent,
        startDeletingEvent,
        startLoadingEvents,
        startSavingEvent,
    }
}