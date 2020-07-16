import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import MusicProvider from './core/musicProvider'

let musicProvider = MusicProvider.createInstance();
musicProvider.configure();
let music = musicProvider.getInstance();

ReactDOM.render(
  <App music={music}/>,
  document.getElementById('root')
)
