import React from 'react';
import './App.css';
import MicRecorder from 'mic-recorder-to-mp3';
import AudioPlayer from "./AudioPlayer";

const Mp3Recorder = new MicRecorder({ bitRate: 64 });

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
    };
  }

  start = () => {
    if (this.state.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
        }).catch((e) => console.error(e));
    }
  };

  stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        this.setState({ blobURL, isRecording: false });
      }).catch((e) => console.log(e));
  };

  componentDidMount() {
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        this.setState({ isBlocked: false });
      },
      () => {
        console.log('Permission Denied');
        this.setState({ isBlocked: true })
      },
    );
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">

        {this.state.isRecording ?
        null

       : <div>
        {this.state.blobURL === "" ?
        null
        : <AudioPlayer audio={this.state.blobURL}/> }
        </div> }

          {!this.state.isRecording ? <button className="Button" onClick={this.start} disabled={this.state.isRecording}>Record</button> : null }
          {this.state.isRecording ? <button className="Button" onClick={this.stop} disabled={!this.state.isRecording}>Stop</button> : null }

          {this.state.isRecording ? null :
          <button className="Button">Send</button> }

          


          
        </header>
      </div>
    );
  }
}

export default App;
