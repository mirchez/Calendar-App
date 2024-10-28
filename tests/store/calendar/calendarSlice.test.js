import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUploadNewEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventsState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarState"

describe('test in calendarSlices', () => {

    test('should return default satate', () => { 

        const state = calendarSlice.getInitialState()
        expect( state ).toEqual( initialState )

    })

    test('onSetActiveEvent should activate event', () => { 
        
        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0]) )
        expect( state.activeEvent ).toEqual( events[0] )
    })

    test('onAddNewEvent should add an event ', () => { 

        const newEvent =     {
            id: '3',
            start: new Date('2024-01-01T10:00:00'),
            end: new Date('2024-01-01T11:30:00'),
            title: 'Meeting 2',
            note: 'Some notes of meeting 2',
        }

        const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent))

        expect( state.events ).toEqual([...events, newEvent])
    })

    test('onUpdateEvent should update an event ', () => { 

        const newEvent =     {
            id: '1',
            start: new Date('2024-11-01T11:00:00'),
            end: new Date('2024-12-01T11:30:00'),
            title: 'Fernando Brithday',
            note: 'Go out with friends',
        }

        const state = calendarSlice.reducer( calendarWithEventsState, onUploadNewEvent( newEvent ))
        expect( state.events ).toContain( newEvent)
    })

    test('onDeleteEvent should delete an event', () => { 

        const state =  calendarSlice.reducer(calendarWithActiveEventsState, onDeleteEvent())

        expect( state.events ).not.toContain(events[0])
        expect( state.activeEvent ).toBe(null)

    })

    test('onLoadEvents should set events', () => { 

        const state = calendarSlice.reducer( initialState, onLoadEvents(events))
        
        expect(  state.isLoadingEvents ).toBeFalsy()
        expect( state.events ).toEqual( events )

        const newState = calendarSlice.reducer( state, onLoadEvents(events))
        expect( state.events.length ).toBe( events.length ) 

    })

    test('onLogoutCalendar should clear state', () => { 

        const state = calendarSlice.reducer( calendarWithActiveEventsState, onLogoutCalendar())
        expect( state ).toEqual( initialState )
    })

})
