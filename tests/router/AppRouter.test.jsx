import { render, screen } from "@testing-library/react"
import { AppRouter } from "../../src/router/AppRouter"
import { useAuthStore } from "../../src/hooks/useAuthStore"
import { MemoryRouter } from "react-router"
import { CalendarPage } from "../../src/calendar"


jest.mock('../../src/hooks/useAuthStore')
jest.mock('../../src/calendar', () =>({ //I did thios mock so I don't need to mock all the reducers in the calendar page.
    CalendarPage: () => <h1>CalendarPage</h1>
}))

describe('test in <AppRouter/>', () => { 

    const mockCheckAuthToken = jest.fn()
    beforeEach( () => jest.clearAllMocks())
    
    test('should show loading page and have called checkAuthToken', () => { 
        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken,
        })
        render( <AppRouter/>)

        expect(screen.getByText('Loading...')).toBeTruthy()
        expect(mockCheckAuthToken).toHaveBeenCalled()
    })

    test('should login page if user is not authenticated', () => { 
        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken,
        })
        
        const { container } = render( 
            <MemoryRouter initialEntries={['/auth2/something/some']}>
                <AppRouter/>
            </MemoryRouter>
        )

        expect( screen.getByText('SignIn')).toBeTruthy()
        expect(container).toMatchSnapshot()

    })

    test('should calendar page if user is authenticated', () => { 
        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken,
        })
        
        render( 
            <MemoryRouter>
                <AppRouter/>
            </MemoryRouter>
        )

        expect( screen.getByText('CalendarPage')).toBeTruthy()


    })


})