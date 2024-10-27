import { createSlice } from '@reduxjs/toolkit';

// const tempEvent = {
//   id: "12342323",
//     title: 'Boss Birthday',
//     notes: 'Must buy a cake',
//     start: new Date(2024, 9, 20, 10, 30),
//     end: new Date(2024, 9, 20, 12, 0),
//     bgColor: '#48e',
//     user: {
//       id: '123',
//       name: 'John Doe',
//     },
//   }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: { 
        isLoadingEvents: true,
        events: [
            //tempEvent
        ],
        activeEvent: null,
    },
    reducers: { 
      onSetActiveEvent: (state, {payload}) =>{
        state.activeEvent = payload
      },
      onAddNewEvent: (state, {payload}) => {
        state.events.push(payload)
        state.activeEvent = null
      },
      onUploadNewEvent: (state, {payload}) => {
        state.events = state.events.map( event =>{
          if ( event.id === payload.id) {
            return payload
          }
          return event
        })
      },
      onDeleteEvent: (state) => {
        if ( state.activeEvent ){
          state.events = state.events.filter( event => event.id !== state.activeEvent.id)
          state.activeEvent = null
        }
      },
      onLoadEvents: (state, {payload = []}) => {
        state.isLoadingEvents = false

        payload.forEach( event => {
          const exist = state.events.some( (dbEvent) => dbEvent.id === event.id)
          if (!exist) {
            state.events.push(event)
          }
        })
      },
      onLogoutCalendar: (state) => {
        state.isLoadingEvents = true,
        state.events = [],
        state.activeEvent = null
      }

    },
});

export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUploadNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar } = calendarSlice.actions;