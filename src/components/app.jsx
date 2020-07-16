import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      album: null,
      queueInitiated: false,
      isPlaying: false
    }
    this.getAlbum = this.getAlbum.bind(this)
    this.setQueue = this.setQueue.bind(this)
    this.action = this.action.bind(this)
    this.changeSong = this.changeSong.bind(this)
  }

  getAlbum() {
    const album = this.props.music.api.album(1178259978)
    console.log(album)
    album.then(data => {
      console.log(data)
      this.setState({
        album: data
      })
    })
  }

  setQueue(action) {
    if (this.state.queueInitiated) {
      this.action('play')
    } else {

      this.props.music.setQueue({ album: this.state.album.attributes.playParams.id })
        .then(queue => {
          console.log(queue)
          this.setState({
            queueInitiated: true,
            queue: queue
          }, () => this.action('play'))
        })
    }
  }

  action(action) {
    if (action === 'play') {
      console.log('play')
      this.props.music.play()
          .then(() => {
            console.log('actually playing')
            this.setState({
              isPlaying: true
            })
          })
    } else if (action === 'next') {
      console.log('next')
      this.props.music.player.skipToNextItem()
    } else if (action === 'previous') {
      console.log('previous')
      this.props.music.player.skipToPreviousItem()
    } else if (action === 'pause' && this.state.isPlaying) {
      this.props.music.pause()
      this.setState({
        isPlaying: false
      })
    }
  }

  changeSong(index) {
    this.props.music.player.changeToMediaAtIndex(index)
  }

  render() {
    if (this.state.album) {
      const artworkUrl = this.state.album.attributes.artwork.url.replace("{w}", 300).replace("{h}", 300);
      const playPauseButton = this.state.isPlaying
        ? <i className="fas fa-pause fa-2x" onClick={() => this.action('pause')}></i>
        : <i className="fas fa-play fa-2x" onClick={this.setQueue}></i>
      return (
        <div>
          <div className="album-info">
            <div className="album-image">
              <img src={artworkUrl} alt="" />
            </div>
            <div className="album-text">
              <div className="album-header">
                <h1>{this.state.album.attributes.name}</h1>
                <h3>{this.state.album.attributes.artistName}</h3>
              </div>
              <div className="album-controls">
                <i className="fas fa-fast-backward fa-2x" onClick={() => this.action('previous')}></i>
                {playPauseButton}
                <i className="fas fa-fast-forward fa-2x" onClick={() => this.action('next')} ></i>
              </div>
            </div>
          </div>
          <ul>
            {
              this.state.album.relationships.tracks.data.map((track, i) => {
              return <li key={i} onClick={() => this.changeSong(i)}>{`${i + 1} ${track.attributes.name}`}</li>
              })
            }
          </ul>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Hello</h1>
          <button onClick={this.getAlbum}>Get album</button>
        </div>
      )
    }
  }
}
