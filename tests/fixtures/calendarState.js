
export const events = [
    {
        id: '1',
        start: new Date('2022-01-01T10:00:00'),
        end: new Date('2022-01-01T11:30:00'),
        title: 'Meeting',
        note: 'Some notes',
    },
    {
        id: '2',
        start: new Date('2022-11-01T10:00:00'),
        end: new Date('2022-11-01T11:30:00'),
        title: 'Boss Birthday',
        note: 'Buy Cake',
    }
]

export const initialState = { 
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
}

export const calendarWithEventsState = { 
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null,
}

export const calendarWithActiveEventsState = { 
    isLoadingEvents: false,
    events: [...events],
    activeEvent: { ...events[0]},
}
