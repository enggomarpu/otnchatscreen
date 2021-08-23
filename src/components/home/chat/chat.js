import React, { PureComponent, useContext, useEffect, useState } from 'react'
import Avatar from '../../../helpers/avatar/avatar'
import ChatInput from './chatInput/chatInput'
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview/web"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from '../../../helpers/loader/loader'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Message from './message/message'
import './chat.css'
import { ChatContext } from '../../../context/chat-context'

const Chat = (props) => {


  const [scrollWidth, setScrollWidth] = useState()
  const [scrollHeight, setScrollHeight] = useState()
  const [dataProvider, setDataProvider] = useState(new DataProvider((r1, r2) => {
    return r1 !== r2 || r1.send_state !== r2.send_state
  }))

  const [layoutProvider, setLayoutProvider] = useState([])

  const { loggedInUser, selectedDialog, chatUsers, chatMessages, sendMessage,
    getDialogById, getOccupants, getMessages } = useContext(ChatContext)

    //const [currentDialog, setCurrentDialog] = useState({})

  const currentDialog = selectedDialog

  useEffect(() => {

    let scrollW = document.getElementById('chat-body').clientWidth
    setScrollWidth(scrollW)
    let scrollH = document.getElementById('chat-body').clientHeight
    setScrollHeight(scrollH)

    getDialogInfo()

  }, [])

  const goToSplashPage = () => {
    const { router } = props
    router('/home')
  }
  const getDialogInfo = () => {
    const dialog = selectedDialog
    getOccupants(dialog.occupants_ids).then(() => {

    }).catch()

    getMessages(dialog)
      .catch(e => alert(`Error.\n\n${JSON.stringify(e)}`))
      .then((amountMessages) => {
        console.log('allchatmessages', amountMessages)


        //setLayoutProvider(DialogLayoutUtil.getDialogLayoutProvider(930))
        if (amountMessages[dialog.id] !== undefined && Object.keys(amountMessages[dialog.id]).length !== 0) {
          
          setLayoutProvider(getChatLayoutProvider({
            width: 930,
            dialogId: dialog.id,
            currentUserId: loggedInUser.id
          }))
          setDataProvider(dataProvider.cloneWithRows(amountMessages[dialog.id]))
          
        }


      })


  }
  

  const renderMessage = (type, item) => {
    const users = chatUsers
    // 1 - current sender & 2 - other sender
    console.log('item', item)
    const whoIsSender = loggedInUser.id === item.sender_id ? 1 : 2
    const participantInfo = whoIsSender === 2 ? users[item.sender_id] : null
    let notRenderAvatar = null

    if (type > 0 && whoIsSender !== 1 &&
      +dataProvider._data[type - 1].sender_id !== +item.sender_id) {
      notRenderAvatar = true
    }

    return (
      <Message
        whoIsSender={whoIsSender}
        message={item}
        participantInfo={participantInfo}
        notRenderAvatar={notRenderAvatar}
        widthScroll={930}
      />
    )
  }

  class GetMaxWidthMsg {
    constructor(maxScrollWidth) {
      if (maxScrollWidth < 550) {
        this.currentSender = 300
        this.otherSender = 250
      }
      if (maxScrollWidth > 550 && maxScrollWidth < 768) {
        this.currentSender = 420
        this.otherSender = 470
      }
      if (maxScrollWidth > 768 && maxScrollWidth < 960) {
        this.currentSender = 450
        this.otherSender = 500
      }
      if (maxScrollWidth > 960) {
        this.currentSender = 650
        this.otherSender = 600
      }
    }
  }
  const getChatLayoutProvider = ({ width, dialogId, currentUserId }) => {
    const fontSize = 16
    const lineHeight = 1.5
    const delta = 20
    const margin = 30
    const maxWidth = new GetMaxWidthMsg(width)
    let footer = 15

    return new LayoutProvider(
      (arr) => {
        return arr;
      },
      (type, dim, index) => {
        if (chatMessages[dialogId][index].attachment) {
          // if send messages as attachment
          dim.width = width
          dim.height = 300
          return
        } else {
          // if send messages as string
          let maxWidthMsg
          if (chatMessages[dialogId][index].sender_id === currentUserId) {
            maxWidthMsg = maxWidth.currentSender
          } else {
            maxWidthMsg = maxWidth.otherSender
          }

          var fakeElem = document.createElement("canvas")
          var ctx = fakeElem.getContext("2d")
          ctx.font = `${fontSize}px 'Open Sans', sans-serif`
          var txt = chatMessages[dialogId][index].body

          const calcWidth = ctx.measureText(txt).width
          const lines = Math.ceil(calcWidth / (maxWidthMsg - delta))

          dim.width = width
          dim.height = lines * lineHeight * fontSize + margin + footer
        }
      }
    )
  }

  const scrollToBottom = () => {
    // if (messagesListRef) {
    //   messagesListRef.scrollToIndex(dataProvider._data.length - 1, false)
    // }
  }
  const sendMessageCallback = async (messageText, img) => {
    const dialog = selectedDialog
    if (messageText.length <= 0 && !img) return
    await sendMessage(dialog, messageText, img, scrollToBottom)
  }
  return (
    <div className="chat-container" >
      <header>
        {window.innerWidth < 768 &&
          <button onClick={goToSplashPage}>
            <FontAwesomeIcon icon={faChevronLeft} color={'#212529'} />
            Back
          </button>
        }
        <Avatar photo={currentDialog.photo} name={currentDialog.name} size={50} />
        <h3>{currentDialog.name}</h3>
      </header>
      <div className="chat-body" id="chat-body">
        {true ?
          dataProvider._data.length > 0 &&
          <>
            <RecyclerListView
              style={{
                width: scrollWidth,
                height: scrollHeight,
              }}
              //ref={ref => this.messagesListRef = ref}
              dataProvider={dataProvider}
              layoutProvider={layoutProvider}
              rowRenderer={renderMessage}
            //  onScroll={(elem, x, y) => {
            //    this.lazyLoadMessages(elem, y)
            //  }}
            />
          </> : <Loader />
        }

      </div>
      <ChatInput sendMessageCallback={sendMessageCallback} />
    </div>
  )
}
export default Chat