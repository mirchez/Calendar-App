import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "../../src/store"
import { initialState, notAuthenticatedState } from "../fixtures/authStates"
import { act, renderHook, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { useAuthStore } from "../../src/hooks/useAuthStore"
import { testUserCredentials } from "../fixtures/testUser"
import calendarApi from "../../src/api/calendarApi"

describe(' test in useAuthStore', () => {

    beforeEach(() => localStorage.clear())
    
    const getMockStore = (mockInitialState) =>{
        return configureStore({
            reducer: {  
                auth: authSlice.reducer
            },
            preloadedState: {
                auth: { ...mockInitialState}
            },
        })
    }

    test('should return default values', () =>{
        const mockStore = getMockStore({...initialState})
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store = { mockStore }>{children}</Provider>
        })

        expect(result.current).toEqual({
            status: initialState.status,
            user: initialState.user,
            errorMessage: initialState.errorMessage,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function),
        })

    })

    test('startLogin should login successfully', async() => { 
        const mockStore = getMockStore({...notAuthenticatedState})
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store = { mockStore }>{children}</Provider>
        })

        await act( async() => {
            await result.current.startLogin( testUserCredentials )
        })
        const {status, user, errorMessage } = result.current
        expect( {status, user, errorMessage } ).toEqual({
            status: 'authenticated',
            user:{
                name: "Test User",
                uid: '671ecab77edce995cc9d2cce'
            },
            errorMessage: undefined,
        })
        expect( localStorage.getItem('token')).toEqual( expect.any(String))
        expect( localStorage.getItem('token-init-date')).toEqual( expect.any(String))
    })

    test('startLogin should fail in authentication', async() => { 
    
        const mockStore = getMockStore({...notAuthenticatedState})
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store = { mockStore }>{children}</Provider>
        })

        await act( async() => {
            await result.current.startLogin( { email:'fakegoogle@gmail.com', password: '12341212'} )
        })

        const {status, user, errorMessage } = result.current
        expect( localStorage.getItem('token')).toBe(null)

        expect({status, user, errorMessage }).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: "Not valid Credentials",
        })

        waitFor( () => expect( result.current.errorMessage ).toBe(undefined) ) 

    })

    test('start register should create an user ', async() => { 
        const newUser =  { email:'fakegoogle@gmail.com', password: '12341212', name: 'Test User 2'}
        const mockStore = getMockStore({...notAuthenticatedState})
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store = { mockStore }>{children}</Provider>
        })

        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
            data: {
                ok: true,
                uid: "123445667",
                name: "Test User",
                token: "some token"
            }
        })

        await act( async() => {
            await result.current.startRegister( newUser )
        })
        const {status, user, errorMessage } = result.current
        expect( {status, user, errorMessage }).toEqual({
            status: 'authenticated',
            user: { name: 'Test User', uid: '123445667' },
            errorMessage: undefined
        })
        spy.mockRestore()//memorial : always do this
    })

    test('startRegister should fail user creation ', async() => { 
        const mockStore = getMockStore({...notAuthenticatedState})
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store = { mockStore }>{children}</Provider>
        })

        await act( async() => {
            await result.current.startRegister( testUserCredentials )
        })
        const {status, user, errorMessage } = result.current
        
        expect( {status, user, errorMessage }).toEqual({
            errorMessage: "Email already exists",
            status: "not-authenticated",
            user: {},
        })
    })

    test('checkAuthToken should fail if there is no token', async() => { 

        const mockStore = getMockStore({...initialState})
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store = { mockStore }>{children}</Provider>
        })

        await act( async() => {
            await result.current.checkAuthToken()
        })
        const {status, user, errorMessage } = result.current
        expect( {status, user, errorMessage } ).toEqual({
            errorMessage: undefined,
            status: "not-authenticated",
            user:{},
        })
    })

    test('checkAuthToken should authenticate if there is token', async() => { 

        const { data } = await calendarApi.post('/auth', testUserCredentials)
        localStorage.setItem('token', data.token)

        const mockStore = getMockStore({...notAuthenticatedState})
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store = { mockStore }>{children}</Provider>
        })

        await act( async() => {
            await result.current.checkAuthToken()
        })
        const {status, user, errorMessage } = result.current
        
        expect( {status, user, errorMessage }).toEqual({
            errorMessage: undefined,
            status: "authenticated",
            user:{
                name: "Test User",
                uid: "671ecab77edce995cc9d2cce",
            },
        })
    })

    

})
