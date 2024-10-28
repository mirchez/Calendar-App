import { fireEvent, render, screen } from "@testing-library/react"
import { FabDelete } from "../../../src/calendar/components/FabDelete"
import { useCalendarStore } from "../../../src/hooks/useCalendarStore"

jest.mock('../../../src/hooks/useCalendarStore')

describe('test in <FabDelete />', () => { 

    const mockStartDeletingEvent = jest.fn()
    beforeEach(() => jest.clearAllMocks())

    test('should show the component', () => { 
        useCalendarStore.mockReturnValue({
            hasEventSelected : false,
        })

        render(<FabDelete/>)

        const btn = screen.getByLabelText('btn-delete')

        expect( btn.classList ).toContain('btn')
        expect( btn.classList ).toContain('btn-danger')
        expect( btn.classList ).toContain('fab-danger')
        expect( btn.style.display ).toBe('none')
    })

    test('should call startDeletingEvent if there\'s an active event', () => { 
        useCalendarStore.mockReturnValue({
            hasEventSelected : true,
            startDeletingEvent: mockStartDeletingEvent,
        })

        render(<FabDelete/>)

        const btn = screen.getByLabelText('btn-delete')
        expect( btn.style.display ).toBe('')

        fireEvent.click(btn)

        expect( mockStartDeletingEvent ).toHaveBeenCalled()
    })

    

})