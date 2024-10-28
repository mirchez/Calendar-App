import { renderHook, act  } from "@testing-library/react"
import { useUiStore } from "../../src/hooks/useUiStore"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { uiSlice } from "../../src/store"


const getMockStore = ( initialState ) => {
    return configureStore( {
        reducer:{
            ui: uiSlice.reducer,
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}

describe('Test in useUiStore', () => {

    test('should return default values', () => { 
        const mockStore = getMockStore(  {isDateModalOpen : false} )
        const {result} = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        })

        expect(result.current).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
        })
    })

    test('openDateModal should set true isDateModalOpen', () => { 
        const mockStore = getMockStore(  {isDateModalOpen : false} )
        const {result} = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        })
        const { openDateModal } = result.current //MEMORIAL FOR ME: PRIMITIVE VALUES IN JEST DOESN NOT CHANGE AUTOMATICALLY, ONLY OBJECTS, DO NOT DESESCTRUCTURE PRIMITIVE VALUES AND THEN EXPECT TO CHANGE ALONG THE TEST
        act(() => {
            openDateModal()
        })

        expect(result.current.isDateModalOpen).toBeTruthy()
    })

    test('onCloaseDateModal should set false isDateModalOpen', () => { 
        const mockStore = getMockStore( { isDateModalOpen : true } )
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({children}) => <Provider store = {mockStore}>{children}</Provider>
        })
        const { closeDateModal } = result.current 
        act( () => {
            closeDateModal()
        })

        expect( result.current.isDateModalOpen ).toBeFalsy()

    })

})
