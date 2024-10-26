import { parseISO } from "date-fns"

export const convertEventDate = ( events = []) =>{

    return (
        events.map( event => {

            event.start = parseISO( event.start)
            event.end = parseISO( event.end)

            return event
        })
    )
}

//This function might be useful, but I decided not to use it because something went wrong