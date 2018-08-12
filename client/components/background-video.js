import React from 'react'
import YouTube from 'react-youtube'

// videoId: 0HJdT7aNVgI
export class BackgroundVideo extends React.Component {
  videoOnReady(event) {
    // access to player in all event handlers via event.target
    console.log('event.target', event.target)
    event.target.playVideo()
  }

  videoOnEnd(event) {
    event.target.playVideo()
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }

    return (
      <div className='video-background'> 
        <div className='video-foreground'>
          <YouTube 
            videoId="0HJdT7aNVgI" 
            opts={opts} 
            onReady={this.videoOnReady}
            onEnd={this.videoOnEnd} 
          />
        </div>
      </div>    
    )
  }
}
