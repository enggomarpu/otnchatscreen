import React, { Component } from 'react'
import UserProfile from './userProfile/userProfile'
import Dialogs from './dialogs/dialogs'
import './sideBar.css'

const SideBar = (props) =>  {
  
    const { router } = props
    return (
      <div className="sidebar-container">
        <UserProfile />
        <Dialogs router={router} />
      </div>
    )
  }

export default SideBar

