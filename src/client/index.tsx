import React from 'react'
import ReactDOM from 'react-dom'
import { auth } from '@model'
import { App } from './App'
import './index.css'

auth.checkAuth()

ReactDOM.render(<App />, document.getElementById('root'))
