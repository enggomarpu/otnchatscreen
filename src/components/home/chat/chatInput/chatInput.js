import React, { PureComponent, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import ImagePicker from '../../../../helpers/imagePicker/imagePicker'
import './chatInput.css'

const ChatInput = (props) => {
  
  // const [messageText, setMessageText] = useState('')

  // const changeMessage = event => (setMessageText(event.target.value))

  // const sendMessage = (e) => {

  //   e.preventDefault()
  //   props.sendMessageCallback(messageText)
  //     .then(() => (setMessageText('')))
  //     .catch(() => (setMessageText('')))
  // }

  // const getImage = (image) => {
  //   props.sendMessageCallback(this.state.messageText, image)
  //     .then(() => (this.setState({ messageText: '' })))
  //     .catch(() => (this.setState({ messageText: '' })))
  // }


    
    return (
      <footer>
        {/* <form onSubmit={sendMessageCallback}>
          <input
            type="text"
            value={messageText}
            onChange={changeMessage}
            placeholder="Write your message..."
            name="search" />
          <div className="chat-attachment">
            <ImagePicker pickAsAttachment getImage={getImage} />
          </div>
          <button onClick={sendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} color={'white'} />
          </button>
        </form> */}
      </footer>
    );
  }

  export default ChatInput
