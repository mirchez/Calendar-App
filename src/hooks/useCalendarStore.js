import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUploadNewEvent } from "../store/calendar/calendarSlice"


export const useCalendarStore = () => {
    const dispatch = useDispatch()
    const {events, activeEvent} = useSelector( state => state.calendar)

    const setActiveEvent = ( calendarEvent) =>{
        dispatch(onSetActiveEvent(calendarEvent)) 
    }

    const startSavingEvent = async ( calendarEvent ) =>{
        //TODO: LLEGAR AL BACKEND

        //TODO bien

        if ( calendarEvent._id){
            //actualizando
            dispatch( onUploadNewEvent({...calendarEvent}))
        }else{
            //creando
            dispatch( onAddNewEvent({...calendarEvent, _id: new Date().getTime()}))
        }
    }

    const startDeletingEvent = () =>{
        dispatch(onDeleteEvent())
    }
    
    return {
        //properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        //methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
    }
}