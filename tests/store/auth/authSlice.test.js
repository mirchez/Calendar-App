import { authSlice, clearErrorMessage, onChecking, onLogin, onLogout } from "../../../src/store/auth/authSlice"
import { authenticatedState, initialState, notAuthenticatedState } from "../../fixtures/authStates"
import { testUserCredentials } from "../../fixtures/testUser"

describe('test in authSlice', () => {

    test('should return initail state', () => { 
        expect( authSlice.getInitialState()).toEqual(initialState)
    })

    test('state should be checking ', () => {
        const state = authSlice.reducer( notAuthenticatedState, onChecking())
        expect(state.status).toBe('checking')
    })

    test('should login', () => {

        const state = authSlice.reducer( initialState, onLogin( testUserCredentials ))
        expect(state).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined,
        })
    })

    test('should logout', () => {
        const state = authSlice.reducer( authenticatedState, onLogout())
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined,
        })
    })

    test('should logout', () => {
        const errorMessage = 'Not valid Credentials'
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage))
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage,
        })
    })

    test('should clear errorMessage', () => {
        const errorMessage = 'Not valid Credentials'
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage))
        const newState = authSlice.reducer(state, clearErrorMessage() )
        expect(newState.errorMessage).toBe(undefined)
    })
})
