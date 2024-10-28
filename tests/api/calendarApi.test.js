
import  CalendarApi  from '../../src/api/calendarApi'

describe('Test in CalendarApi', () => {

    test('should be configured', () => { 
        expect( CalendarApi.defaults.baseURL).toBe( process.env.VITE_API_URL )
    })

    test('x-token should be in every req', async () => {
        const token =  '123-ABC-XYZ'
        localStorage.setItem('token', token)
        const res = await CalendarApi.get('/auth')

        expect(res.config.headers['x-token']).toBe(token)
    })
})
