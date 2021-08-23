import React, { useEffect, useState } from 'react'
import ConnectyCube from 'connectycube'
import appConfig from '../appConfig.json'
import UserModel from '../models/user'
import { getImageLinkFromUID } from '../helpers/file'
import ChatModel from '../models/dialogs';
import { FakeMessage, Message } from '../models/message';
import Dialog from '../models/dialogs'



export const ChatContext = React.createContext()

const ChatContextProvider = ({ children }) => {


  const [chatSession, setChatSession] = useState({})
  const [loggedInUser, setLoggedInUser] = useState({})
  const [chatMessages, setChatMessages] = useState({'hello' : 'pakistan'})
  const [chatDialogs, setChatDialogs] = useState([])
  const [chatUsers, setChatUsers] = useState({})
  const [selectedDialog, setSelectedDialog] = useState()
  
  const CURRENT_USER_SESSION_KEY = 'CURRENT_USER_SESSION_KEY'
  const DEVICE_TOKEN_KEY = 'DEVICE_TOKEN_KEY'

  useEffect(() => {
   
  }, [])

  const setUpListeners = () => {
    //ConnectyCube.chat.onMessageListener = onMessageListener
    //ConnectyCube.chat.onSentMessageCallback = this.onSentMessageListener.bind(this)
    //ConnectyCube.chat.onDeliveredStatusListener = this.onDeliveredStatus.bind(this)
    //ConnectyCube.chat.onReadStatusListener = this.onReadStatus.bind(this)
  }

  const onMessageListener = async (senderId, msg) => {
    const message = new Message(msg)
    const user = loggedInUser
    console.log('dialoglistener', selectedDialog)
    const dialog = selectedDialog.id

    // If group chat alet
    if (msg.extension.group_chat_alert_type) {
      const dialogsFromServer = await ConnectyCube.chat.dialog.list()
      const dialogs = dialogsFromServer.items.map(elem => {
        return new Dialog(elem)
      })
      setChatDialogs(dialogs)
      //store.dispatch(fetchDialogs(dialogs))

      return
    }

    if (senderId !== user.id) {
      if (dialog === message.dialog_id) {
        //store.dispatch(sortDialogs(message))
        //this.readMessage(message.id, message.dialog_id)
        //this.sendReadStatus(msg.extension.message_id, msg.extension.sender_id, msg.dialog_id)
      } else {
        //this.sendDeliveredStatus(msg.extension.message_id, msg.extension.sender_id, msg.dialog_id)
        //store.dispatch(sortDialogs(message, true))
      }
      setChatMessages({[message.dialog_id]: [...chatMessages[message.dialog_id] || [], message]})
      // store.dispatch(pushMessage(message, message.dialog_id))
    }
  }

  const init = async () => {
    ConnectyCube.init(...appConfig.connectyCubeConfig)
    return autologin()
  }

   const autologin = async () => {
    const checkUserSessionFromStore = getUserSession()
    if (checkUserSessionFromStore) {
      const data = JSON.parse(checkUserSessionFromStore)
      await signIn({ login: data.login, password: data.password })
      return 'otn'
    } else { return 'auth' }
  }

  const signIn = async (params) => {
    const session = await ConnectyCube.createSession(params)
    const currentUser = new UserModel(session.user)
    session.user.avatar = getImageLinkFromUID(session.user.avatar)
    // work around
    session.user.full_name = session.user.login
    //store.dispatch(setCurrentUser(session))
    
    setLoggedInUser(session.user)
    console.log('user', currentUser)
    const customSession = Object.assign({}, currentUser, { password: params.password })
    {/* Local Storage Set */}

    setChatSession(customSession)
    setUserSession(customSession)
    connect(customSession.id, customSession.password)
  }

  const signUp = async (params) => {
    await ConnectyCube.createSession()
    await ConnectyCube.users.signup(params)
    return signIn(params)
  }

  const connect = async (userId, password) => {
    await ConnectyCube.chat.connect({ userId, password })
  }

  const setUserSession = (userSession) => {
    return localStorage.setItem(CURRENT_USER_SESSION_KEY, JSON.stringify(userSession))
  }

  const getUserSession = () => {
    return localStorage.getItem(CURRENT_USER_SESSION_KEY)
  }

  const logOut = async () => {
    localStorage.clear()
    await ConnectyCube.logout()
    //store.dispatch(LogOut())
  }

  //Get Dialogs
  
  const fetchDialogsFromServer = async () => {
    if (chatDialogs.length !== 0) {
      return chatDialogs
    }
    const dialogsFromServer = await ConnectyCube.chat.dialog.list()
    const currentUserId = loggedInUser
    let privatChatIdsUser = []
    let dialogs = []

    dialogs = dialogsFromServer.items.map(elem => {
      if (elem.type === 3) {
        elem.occupants_ids.forEach(elem => {
          elem !== currentUserId.id && privatChatIdsUser.push(elem)
        })
      }
      return new ChatModel(elem)
    })

    if (privatChatIdsUser.length !== 0) {
      const usersInfo = await getUsersList(privatChatIdsUser)
      console.log('user chat', usersInfo)
      fetchUsers(usersInfo)
    }
    
    console.log('dialogs', dialogs)
    setChatDialogs(dialogs)
    return dialogs
  }

  const getUsersList = async (ids) => {
    const usersList = await ConnectyCube.users.get({
      per_page: 100,
      filter: {
        field: 'id', param: 'in', value: ids,
      },
    })
    return usersList.items.map(elem => {
      console.log('hellouser', elem)
      return new UserModel(elem.user)
    })
  }
  const fetchUsers = (action) => {
    const newObjUsers = {}
    console.log('action', action)
    action.forEach(elem => {
      newObjUsers[elem.id] = elem
    })
    console.log('occupant', {...chatUsers, ...newObjUsers })
    setChatUsers({...chatUsers, ...newObjUsers })
  }
  const getDialogById = (dialogId) => {
    return chatDialogs.find(elem => elem.id === dialogId)
  }
  const handleSelectDialog = (selectDia) => {
    setSelectedDialog(getDialogById(selectDia.id))
  }

  //getting chat messages
  const getOccupants = async(ids) => {
    const users = chatUsers
    const currentUser = loggedInUser
    let idsForFetch = []
    console.log('ids', ids)

    // 140 system ID when a group is created through the admin panel
    ids.forEach(elem => {
      if (elem !== currentUser.id && !users[elem] && elem !== 140) {
        idsForFetch.push(elem)
      }
    })
    if (idsForFetch.length === 0) { return }
    const usersFromServer = await ConnectyCube.users.get({
      per_page: 100,
      filter: {
        field: 'id',
        param: 'in',
        value: idsForFetch,
      },
    })
    const newUsers = usersFromServer.items.map(elem => {
      return new UserModel(elem.user)
    })
    fetchUsers(newUsers)
  }

  const getMessages = async (dialog) => {

    const isAlredyUpdate = getMessagesByDialogId(dialog.id)
    let amountMessages = null
    let messagesIn = []

    // If the first entry into the chat
    if (!dialog.isAlreadyMessageFetch || dialog.unread_messages_count > 0 && !dialog.isAlreadyMessageFetch) {
      const historyFromServer = await ConnectyCube.chat.message.list({
        chat_dialog_id: dialog.id,
        sort_desc: 'date_sent'
      })

     
      historyFromServer.items.forEach(elem => {
        if (!elem.group_chat_alert_type) {
          messagesIn.push(new Message(elem, loggedInUser.id))
        }
      })

      const newObj = Object.assign(dialog, { isAlreadyMessageFetch: true })
      //this.updateDialogsUnreadMessagesCount(newObj)
      //store.dispatch(fetchMessages(dialog.id, messages))
      console.log('message history', messagesIn )
      const reverted = messagesIn
      setChatMessages({[dialog.id]: reverted.reverse()})
      amountMessages = messagesIn.length
     } 
    //  else {
    //   // If the second entry into the chat
    //   if (dialog.unread_messages_count > 0) {
    //     const messagesIn = messagesIn[dialog.id]
    //     const firstUnreadMsg = messagesIn[dialog.unread_messages_count - 1]
    //     //this.readAllMessages(dialog.id)
    //     //await this.sendReadStatus(firstUnreadMsg.id, firstUnreadMsg.sender_id, firstUnreadMsg.dialog_id)
    //     //this.updateDialogsUnreadMessagesCount(dialog)
    //   }
    // //   amountMessages = isAlredyUpdate.length
    // }
    
    return chatMessages
  }
  const getMessagesByDialogId = (dialogId) => {
    //const result = store.getState().messages
    const result = chatMessages
    return result[dialogId]
  }

  const sendMessage = (dialog, messageText, attachments = false, scrollToBottom) => {
    const user = loggedInUser
    const text = messageText.trim()
    const date = Math.floor(Date.now() / 1000)
    const recipient_id = dialog.type === 3 ? dialog.occupants_ids.find(elem => elem != user.id)
      : dialog.xmpp_room_jid

    let msg = {
      type: dialog.xmpp_type,
      body: text,
      extension: {
        save_to_history: 1,
        dialog_id: dialog.id,
        sender_id: user.id,
        date_sent: date,
      },
      // markable: 1
    }

    msg.id = messageUniqueId()

    // If send message as Attachment
    if (attachments) {
      return this.sendMessageAsAttachment(dialog, recipient_id, msg, attachments, scrollToBottom)
    }

    const message = new FakeMessage(msg)

    const newObjFreez = Object.freeze(message)

    setChatMessages({[dialog.id]: [...chatMessages[dialog.id] || [], newObjFreez]})
    //await store.dispatch(pushMessage(newObjFreez, dialog.id))
    //scrollToBottom()
    ConnectyCube.chat.send(recipient_id, msg)
    //store.dispatch(sortDialogs(newObjFreez))
  }
  const messageUniqueId = () => {
    return ConnectyCube.chat.helpers.getBsonObjectId()
  }
  return (
    <ChatContext.Provider value={{init, signIn, signUp, logOut, loggedInUser, getDialogById, getMessages,
      fetchDialogsFromServer, setUpListeners, sendMessage, chatUsers, getOccupants, chatMessages, handleSelectDialog, selectedDialog}}>
      {children}
    </ChatContext.Provider>
  )
}
export default ChatContextProvider