import React, { Component, useContext, useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  BrowserRouter
} from "react-router-dom"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Auth from './auth/auth'
import Home from './home/home'
import { ChatContext } from '../context/chat-context'
import { CircularProgress } from '@material-ui/core'
import Loader from '../helpers/loader/loader'
import './main.css'
import ChatOTN from './otnscreen/otcnscreen'

const Main = () => {

  const [isLoader, setIsLoader] = useState(true);
  const [routeName, setRouteName] = useState('');
  const { init } = useContext(ChatContext)

  useEffect(() => {
    initUser()
  }, [])

  const initUser = async () => {
    const routLink = await init()
    console.log('route', routLink)
    setIsLoader(false)
    setRouteName(routLink)
  }
 
  return (
    <BrowserRouter>
      {isLoader ?
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
          <div className="container-loader">
            <CircularProgress />
          </div>
        </div>
        : <>
          <Route path="/home" component={Home} />
          <Route path="/otn"  component={ChatOTN} />
          <Route path="/auth" component={Auth} />
          

          <Redirect to={routeName} />
        </>
      }      
    </BrowserRouter>
  )
}


export default Main