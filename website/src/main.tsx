import { NotificationsProvider } from '@mantine/notifications'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './app'
import { appStore } from './app-store'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <NotificationsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NotificationsProvider>
    </Provider> 
  </React.StrictMode>, document.getElementById('root')
)
