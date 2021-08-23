import React, { Component, useContext, useState } from 'react'
//import AuthService from '../../services/auth-service'
import logo from '../../assets/logo_with_text.png'
import swal from 'sweetalert'
import './auth.css'
import { Redirect } from "react-router-dom"
import { CircularProgress } from '@material-ui/core'
import { ChatContext } from '../../context/chat-context'
import Loader from '../../helpers/loader/loader'


const Auth = (props) => {

  const [isLogin, setIsLogin] = useState(true)
  const [isLoader, setIsLoader] = useState(false)
  const [isAuthorization, setIsAuthorization] = useState(false)

  const [full_name, setFullName] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const authText = isLogin ? "Don't have an account?" : 'Already have an account?'
  const authLink = isLogin ? 'Sign up' : 'Sign in'
  
  const { signIn, signUp } = useContext(ChatContext)

  const handleStateModal = () => {
    setIsLogin(!isLogin) 
  }

  const changeName = (event) => (setFullName(event.target.value))

  const changeLogin = (event) => (setLogin(event.target.value))

  const changePassword = (event) => (setPassword(event.target.value))

  const loginFunc = (e) => {

    e.preventDefault()
    const dataUser = { login, password }

    if (!login.trim() || !password.trim() || !isLogin && !full_name.trim()) {
      const endMessage = isLogin ? 'login.' : 'sign up'
      swal('Warning', `Fill the fields to ${endMessage}`)
      return
    }

    setIsLoader(true)

    if (isLogin) {
      signIn(dataUser)
        .then(() => {
          setIsLoader(false)
          setIsAuthorization(true)
          //this.setState({ isLoader: false, isAuthorization: true })
        })
        .catch(error => {
          setIsLoader(false)
          //this.setState({ isLoader: false })
          swal(`Error.\n\n${JSON.stringify(error)}`, "", "error")
        })
    } else {
      dataUser.full_name = full_name
      signUp(dataUser)
        .then(() => {
          setIsLoader(false)
          setIsAuthorization(true)
          //this.setState({ isLoader: false, isAuthorization: true })
          swal("Account successfully registered!", "", "success")
        })
        .catch(error => {
          setIsLoader(false)
          //this.setState({ isLoader: false })
          swal(`Error.\n\n${JSON.stringify(error)}`, "", "error")
        }
        )
    }

  }

    

    return (
      <div className="auth-main-сontainer">
        <div className="auth-modal-container" style={isLogin ? { height: '500px' } : { height: '570px' }}>
          {isLoader &&
            <div className="auth-wrapp-loader">
             <Loader />
            </div>
          }
          {isAuthorization &&
            <Redirect to="/otn" />
          }
          <div className="auth-logo">
            <img src={logo} alt="Logo" />
          </div>
          <form onSubmit={loginFunc} className="auth-form auth-wrapper">
            {!isLogin &&
              <input
                type="text"
                value={full_name}
                onChange={changeName}
                required
                placeholder="Name"
                name="Name"
              />
            }
            <input
              type="text"
              value={login}
              onChange={changeLogin}
              required
              placeholder="Login"
              name="login" />
            <input
              type="password"
              value={password}
              onChange={changePassword}
              required
              placeholder="Password"
              name="Password" />
            <button type="submit" value="Submit">{isLogin ? 'Log in' : 'Sign up'}</button>
          </form>
          <div className="auth-footer">
            <span>{authText}</span>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a onClick={handleStateModal}>{authLink}</a>
          </div>
        </div>
      </div >
    )
  }

  export default Auth

