import { useRef } from "react";
import "./register.css";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function Register() {
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const username = useRef();
  const navigate = useNavigate()

  const handleClick = async(e) => {
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords Don't Match")
    } else {
      const user = {
        username:username.current.value,
        email:email.current.value,
        password:password.current.value
      }
      try {
        await axios.post("/auth/register",user)
        navigate("/login")

      } catch (error) {
        console.log(error)
      }
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Zamsocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Zamsocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              ref={username}
              required
              type="text"
              className="loginInput"
            />
            <input
              placeholder="Email"
              ref={email}
              required
              type="email"
              className="loginInput"
            />
            <input
              placeholder="Password"
              ref={password}
              required
              type="password"
              minLength={"6"}
              className="loginInput"
            />
            <input
              placeholder="Password Again"
              ref={passwordAgain}
              required
              type="password"
              className="loginInput"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
