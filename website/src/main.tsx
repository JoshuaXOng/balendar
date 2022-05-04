import { NotificationsProvider } from '@mantine/notifications'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './app'
import { appStore } from './app-store'
import './index.css'

ReactGA.initialize("UA-228034549-1");

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
