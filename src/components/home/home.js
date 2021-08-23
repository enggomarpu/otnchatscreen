import React, { Component, useContext, useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Route, Redirect, BrowserRouter as Router } from "react-router-dom"
import SideBar from './sideBar/sideBar'
//import Chat from './chat/chat'
import SplashPage from './splashPage/splashPage'
//import CreateDialog from './createDialog/createDialog'
import './home.css'
import { ChatContext } from '../../context/chat-context'
import Chat from './chat/chat'
import Auth from '../auth/auth'


const Home = (props) => {
  
  const [routerUrl, setRouteURL] = useState('')
  const [routeName, setRouteName] = useState(false)
  //console.log('match', match)
  let { match } = props
  const [windowWidth, setWindowWidth] = useState()
  
  

  const { setUpListeners } = useContext(ChatContext)

  useEffect(()=>{

    setUpListeners()
    //props.history.replace("/home")
    console.log('useEffect', window.innerWidth)
    let isMounted = true; 
    if(isMounted){
      setWindowWidth(window.innerWidth)
      setRouteURL(props.match.url)
    }
    
   
      return () => { isMounted = false }
  }, [])
  
  const changeRouter = (router) => {
    setRouteURL(router)
  }

  
    

    return (
      <div className="home-frame">
        {console.log('window', windowWidth )}
        <div className="home-active-container">
          {windowWidth >= 768 ?
            <Row className="default-row">
              <Col sm={12} md={5} lg={5} xl={3} className="default-grid">
                <SideBar router={changeRouter} />
              </Col>
              <Col sm={12} md={7} lg={7} xl={9} className="default-grid">
                <Router>
                  <Route
                    exact
                    path={`${match.url}`}
                    component={SplashPage}
                  />
                  <Route
                    path={`${match.url}/create-dialog`}
                    //component={() => <CreateDialog router={this.changeRouter} />}
                  />
                  <Route
                    path={`${match.url}/chat`}
                    component={() => <Chat router={changeRouter} />}
                  />
                  <Redirect to={routerUrl} />
                </Router>
              </Col>
            </Row> :

            <Row>
              <Col sm={12} md={5} lg={5} xl={3} className="default-grid">
                <Router>
                  <Route
                    exact
                    path={`${match.url}`}
                    component={() => <SideBar router={changeRouter} />}
                  />
                  <Route
                    path={`${match.url}/create-dialog`}
                    //component={() => <CreateDialog router={this.changeRouter} />}
                  />
                  <Route
                    path={`${match.url}/chat`}
                    component={() => <Chat router={changeRouter} />}
                  />
                  <Route
                    path={`/auth`}
                    component={() => <Auth isSmallDevice />}
                  />
                  <Redirect to={routerUrl} />
                </Router>
              </Col>
            </Row>
          }
          {console.log('match', match)}
        </div>
      </div>
    )
  }

  export default Home