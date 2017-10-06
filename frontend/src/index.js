import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store, { history } from './store'
import { ConnectedRouter } from 'react-router-redux'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'




const mountPoint = document.getElementById('root')
ReactDOM.render(
    <Provider store={ store }>
        <ConnectedRouter history={ history }>
            <App />
        </ConnectedRouter>
    </Provider>,
    mountPoint
)

registerServiceWorker()
