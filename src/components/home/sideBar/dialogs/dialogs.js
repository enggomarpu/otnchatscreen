import React, { Component, useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { RecyclerListView, DataProvider } from "recyclerlistview/web"
import { DialogLayoutUtil } from '../../../../helpers/LayoutUtil'
import Loader from '../../../../helpers/loader/loader'
import lastDate from '../../../../helpers/lastDate'
import Avatar from '../../../../helpers/avatar/avatar'
import './dialogs.css'
import { ChatContext } from '../../../../context/chat-context'


const Dialog = (props) => {

  const [allDialogs, setAllDialogs] = useState([])
  const [scrollWidth, setScrollWidth] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(0)
  const [listenerWindowSize, setListenerWindowSize] = useState(null)
  let [timer, setTimer] = useState(null)

  const [isAlredy, setIsAlredy] = useState(false)
  const [isLoader, setIsLoader] = useState(true)
  const [count, setCount] = useState(20)
  const [search, setSearch] = useState('')

  const [dataProvider, setDataProvider] = useState(new DataProvider((r1, r2) => {
    return r1 !== r2 || r1.unread_messages_count !== r2.unread_messages_count;
  }))
  const [layoutProvider, setLayoutProvider] = useState(0)

  const { fetchDialogsFromServer, handleSelectDialog } = useContext(ChatContext)

  // componentDidMount() {
  //   window.addEventListener('resize', this.handleResize)
  //   this.scrollWidth = document.getElementById('dialog-info-container').clientWidth
  //   this.scrollHeight = document.getElementById('dialog-info-container').clientHeight

  //   fetchDialogsFromServer().then((dialogs) => {
  //     this.allDialog = dialogs
  //     this.setState({
  //       isAlredy: true,
  //       isLoader: false,
  //       layoutProvider: DialogLayoutUtil.getDialogLayoutProvider(this.scrollWidth),
  //       dataProvider: this.state.dataProvider.cloneWithRows(dialogs),
  //     })
  //   })
  // }

  const getAllDialogs = () => {
    let isMounted = true; 
    fetchDialogsFromServer().then((dialogs) => {
      //if(isMounted){
      setAllDialogs(dialogs)
      setIsLoader(false)
      setIsAlredy(true)
      let sWidth = document.getElementById('dialog-info-container').clientWidth
      setLayoutProvider(DialogLayoutUtil.getDialogLayoutProvider(sWidth))
      setDataProvider(dataProvider.cloneWithRows(dialogs))
      //}
      //return () => { isMounted = false };
    })
  }

  useEffect(() => {

    // const abortController = new AbortController();
    // const signal = abortController.signal;

    window.addEventListener('resize', handleResize)
    setScrollWidth(document.getElementById('dialog-info-container').clientWidth)
    setScrollHeight(document.getElementById('dialog-info-container').clientHeight)
    getAllDialogs()

    // return () => {
    //   console.log('I am in cleanup function');
    //   //abortController.abort();
    // };

  }, [])

  // componentDidUpdate(prevProps) {
  //   const { dialogs } = this.props
  //   if (this.props.dialogs !== prevProps.dialogs
  //   ) {
  //     this.allDialog = dialogs
  //     this.setState({
  //       layoutProvider: DialogLayoutUtil.getDialogLayoutProvider(this.scrollWidth),
  //       dataProvider: this.state.dataProvider.cloneWithRows(dialogs),
  //     })
  //   }
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.handleResize)
  // }

  const handleResize = () => {

    let sHeight = document.getElementById('dialog-info-container').clientHeight
    setScrollHeight(sHeight)
    let sWidth = document.getElementById('dialog-info-container').clientWidth
    setScrollWidth(sWidth)
    if (!timer) {
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
        // this.setState({
        //   isAlredy: true,
        //   layoutProvider: DialogLayoutUtil.getDialogLayoutProvider(sWidth)
        // })
        setIsAlredy(true)
        setLayoutProvider(DialogLayoutUtil.getDialogLayoutProvider(sWidth))
      }, 500)
    }
  }

  const changeSearch = (event) => {
    let dialogs = []
    if (event.target.value === '') {
      dialogs = allDialogs
    } else {
      dialogs.forEach(elem => {
        const str = elem.name.toUpperCase().includes(event.target.value.toUpperCase())
        str && dialogs.push(elem)
      })
    }
    // this.setState({
    //   search: event.target.value,
    //   dataProvider: this.state.dataProvider.cloneWithRows(dialogs)
    // })
    setSearch(event.target.value)
    setDataProvider(dataProvider.cloneWithRows(dialogs))

  }

  const goToChat = (item) => {
    const { router } = props
    console.log('selected in dialog', item)
    handleSelectDialog(item)
    //ChatService.setSelectDialog(item)
    router('/home/chat')
  }

  const createNewDialog = () => {
    const { router } = props
    router('/home/create-dialog')
  }

  const _renderDialog = (type, item) => {
    return (
      <li onClick={() => goToChat(item)}>
        <div className="dialog-wrap-avatar">
          <Avatar photo={item.photo} name={item.name} size={50} />
        </div>
        <div className="dialog-wrap-block">
          <div className="dialog-wrap-block-left">
            <h5>{item.name}</h5>
            <span>{item.last_message === '' ? "No messages yet" : item.last_message}</span>
          </div>
          <div className="dialog-wrap-block-right">
            <p>{lastDate({
              lastDate: item.last_message_date_sent,
              lastMessage: item.last_message,
              updatedDate: item.updated_date,
            })}</p>
            {item.unread_messages_count > 0 &&
              <span>{item.unread_messages_count}</span>
            }
          </div>
        </div>
      </li>
    )
  }


  return (
    <div className="dialog-container" >
      <button onClick={createNewDialog}>
        <FontAwesomeIcon icon={faUserPlus} color={'#d2d2d2'} />
        <span>New chat</span>
      </button>
      <div className="dialog-input-search">
        <div className="dialog-input-search-icon">
          <FontAwesomeIcon icon={faSearch} color={'#d2d2d2'} />
        </div>
        <input
          className="input-field"
          type="text"
          value={search}
          onChange={changeSearch}
          required
          placeholder="Search chats..."
          name="search" />
      </div>
      <div className="dialog-info-container" id="dialog-info-container">
        {isLoader ?
          (
            <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
              <Loader />
            </div>
          ) : dataProvider.length === 0 ?
            <div className="dialog-no-chats">
              <h3>No chats yet</h3>
            </div> : isAlredy ?
              dataProvider._data.length > 0 ?
                <ul>
                  {
                    <RecyclerListView
                      style={{ width: scrollWidth, height: scrollHeight }}
                      dataProvider={dataProvider}
                      layoutProvider={layoutProvider}
                      rowRenderer={_renderDialog}
                    />
                  }
                </ul> : <div className="dialog-no-chats">
                  <h3>No results</h3>
                </div> : null
        }
      </div>
    </div>
  )
}


// const mapStateToProps = ({ dialogs }) => ({
//   dialogs
// })

// export default connect(mapStateToProps)(Dialog)
export default Dialog