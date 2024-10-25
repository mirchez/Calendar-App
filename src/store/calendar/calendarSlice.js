import { createSlice } from '@reduxjs/toolkit';

const tempEvent = {
  _id: new Date().getTime(),
    title: 'Boss Birthday',
    notes: 'Must buy a cake',
    start: new Date(2024, 9, 20, 10, 30),
    end: new Date(2024, 9, 20, 12, 0),
    bgColor: '#48e',
    user: {
      _id: '123',
      name: 'John Doe',
    },
  }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: { 
        events: [
            tempEvent
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
          if ( event._id === payload._id) {
            return payload
          }
          return event
        })
      },
      onDeleteEvent: (state) => {
        if ( state.activeEvent ){
          state.events = state.events.filter( event => event._id !== state.activeEvent._id)
          state.activeEvent = null
        }

      }

    },
});

export const {onSetActiveEvent, onAddNewEvent, onUploadNewEvent, onDeleteEvent  } = calendarSlice.actions;