import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/main'
import ChatContextProvider from './context/chat-context'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<ChatContextProvider><Main /></ChatContextProvider>, document.getElementById('root'))

serviceWorker.unregister()
