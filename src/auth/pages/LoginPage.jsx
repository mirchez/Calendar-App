import { useEffect } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';
import './LoginPage.css';
import Swal from 'sweetalert2';


const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}

export const LoginPage = () => {

    const { startLogin, errorMessage, startRegister } = useAuthStore()

    const {loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm(loginFormFields)
    const { registerName, registerEmail, onInputChange:onRegisterInputChange, registerPassword, registerPassword2 } = useForm(registerFormFields)
    
    const loginSubmit = (event) =>{
        event.preventDefault()
        startLogin({email: loginEmail,  password:loginPassword})
    }

    const registerSubmit = (event) => {
        event.preventDefault()
        if( registerPassword !== registerPassword2 ){
            Swal.fire('Error', 'Passwords do not match', "error")
            return
        }   
        startRegister({name: registerName, email: registerEmail, password: registerPassword})
    }

    useEffect( () =>{
        if( errorMessage !== undefined){
            Swal.fire('Error on dependencies', errorMessage, "error")
        }
    },[errorMessage])

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1 animate__animated animate__bounceInLeft">
                    <h3>SignIn</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="Password"
                                className="form-control"
                                placeholder="Password"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2 animate__animated animate__bounceInRight ">
                    <h3>Register</h3>
                    <form onSubmit={ registerSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name='registerName'
                                value={registerName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="Email"
                                className="form-control"
                                placeholder="Email"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="Password"
                                className="form-control"
                                placeholder="Password" 
                                name='registerPassword'
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="Password"
                                className="form-control"
                                placeholder="Confirm your Password" 
                                name='registerPassword2'
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Create Account" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

