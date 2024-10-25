import { useDispatch, useSelector } from "react-redux"
import calendarApi from '../api/calendarApi'
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice"

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth )
    const dispatch = useDispatch()

    const startLogin = async({ email, password }) => {
        dispatch( onChecking() ) 
        try {
            const { data } = await calendarApi.post('/auth/', { email, password })
            console.log({ data })

            // Guardar el token en localStorage
            localStorage.setItem('data', data.token)
            localStorage.setItem('data-init-date', new Date().getTime())

            dispatch(onLogin({
                name: data.name,
                uid: data.uid,
            }))
        } catch (err) {
            dispatch( onLogout("Not valid Credentials"))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            },3000)
        }
    }

    const startRegister = async({ email, password, name }) => {
        dispatch( onChecking() ) 
        try {
            const { data } = await calendarApi.post('/auth/new', { email, password, name })
            console.log({ data })

            localStorage.setItem('data', data.token)
            localStorage.setItem('data-init-date', new Date().getTime())

            dispatch(onLogin({
                name: data.name,
                uid: data.uid,
            }))
        } catch (err) {
            dispatch( onLogout(err.response.data?.msg || 'There was an error'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            },3000)
        }
    }

    const checkAuthToken = async() => {

        const token = localStorage.getItem('token')
        if(!token) return dispatch( onLogout())
        
        try {
            const { data } = await calendarApi.post('/auth/renew')

            localStorage.setItem('data', data.token)
            localStorage.setItem('data-init-date', new Date().getTime())

            dispatch(onLogin({
                name: data.name,
                uid: data.uid,
            }))

        } catch (error) {
            localStorage.clear()
            dispatch( onLogout())
        }

    }

    const startLogout = () => {
        localStorage.clear()
        dispatch(onLogout())
    }

    return {
        // Propiedades
        status,
        user,
        errorMessage,

        // Métodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    }
}
