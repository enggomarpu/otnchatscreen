import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import './userProfile.css'
import Modal from 'react-modal'
import { Link } from "react-router-dom"
import Avatar from '../../../../helpers/avatar/avatar'
import { ChatContext } from '../../../../context/chat-context';
import { ChatLayoutUtil, DialogLayoutUtil, getChatLayoutProvider } from '../../../../helpers/LayoutUtil';


const UserProfile = () => {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     isModal: false
  //   }
  // }

  const [isModal, setIsModal] = useState(false)
  const { loggedInUser, logOut } = useContext(ChatContext)
  const  user  = loggedInUser
  console.log('loggedinuser', loggedInUser)


  let customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      padding: 0,
    }
  }

  const showMoreInformation = () => {
    setIsModal(!isModal)
  }

  const handleCloseModal = () => (setIsModal(false))

  const logOutFun = () => {
    logOut()
  }

  const settings = () => {
    alert("Coming soon")
    handleCloseModal()
  }

  if (!loggedInUser) {
    return <></>
  }

  return (
    <div className="user-rofile-container">
      <div className="user-profile-wrapper">
        <div className="user-profile-user-info">
          <div className="online">
            <Avatar photo={user.avatar} name={user.full_name} size={50} />
          </div>
          <span>{user.full_name}</span>
        </div>
        <div className="user-profile-icon" id="user-profile-icon" onClick={showMoreInformation}>
          {isModal ?
            <FontAwesomeIcon icon={faChevronUp} color={'white'} /> :
            <FontAwesomeIcon icon={faChevronDown} color={'#435f7a'} />
          }
        </div>
      </div>
      {isModal &&
        <>
          <Modal
            isOpen={isModal}
            onRequestClose={handleCloseModal}
            ariaHideApp={false}
            style={customStyles}
            overlayClassName="Overlay-user-profile"
          />
          <div className="user-profile-modal">
            <ul>
              <li className="user-profile-user-more-info">
                <Link
                  to="/auth"
                  onClick={logOutFun}
                  className="reset-user-profile">Logout</Link>
              </li>
              <li className="user-profile-user-more-info">
                <Link
                  to="/home"
                  onClick={settings}
                  className="reset-user-profile">Settings</Link>
              </li>
            </ul>
          </div>
        </>
      }
    </div>
  )
}



// const mapStateToProps = ({ currentUser }) => ({
//   currentUser
// })

// export default connect(mapStateToProps)(UserProfile)
export default UserProfile
