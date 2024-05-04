import { useContext, useRef } from 'react'
import './login.css'
import { loginCall } from '../../apiCalls.js'
import { AuthContext } from '../../context/AuthContext'
import { CircularProgress } from '@mui/material'

export default function Login() {
  const email = useRef()
  const password = useRef()
  const {user,isFetching,error,dispatch} = useContext(AuthContext)
  const handleSubmit = (e) => {
    e.preventDefault()
    loginCall({
      email:email.current.value,password:password.current.value
    },dispatch)
    console.log(user,"/====<<<User")
  }

  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">Zamsocial</h3>
            <span className="loginDesc">
                Connect with friends and the world around you on Zamsocial.
            </span>
        </div>
        <div className="loginRight">
            <form className="loginBox" onSubmit={handleSubmit}>
                <input placeholder="Email" type='email' required className='loginInput' ref={email}/>
                <input placeholder="Password" type='password' required minLength={6} className='loginInput' ref={password}/>
                <button className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress color='inherit' size={"20px"} /> :"Log In"}</button>
                <span className="loginForgot">Forgot Password?</span>
                <button className="loginRegisterButton">{isFetching ? <CircularProgress color='inherit' size={"20px"} /> :"Create a New Account"}</button>
            </form>
        </div>
      </div>
    </div>
  )
}
