import React, { useState, useRef, useEffect } from 'react'
import styles from "./AudioPlayer.module.css";
import Play from "./Play";
import Pause from "./Pause";

const AudioPlayer = ({ timeJump, audio }) => {
    // state
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
  
    // references
    const audioPlayer = useRef();   // reference our audio component
    const progressBar = useRef();   // reference our progress bar
    const animationRef = useRef();  // reference the animation
  
    useEffect(() => {
      if (timeJump) {
        timeTravel(timeJump);
        setIsPlaying(true);
        play();
      } else {
        timeTravel(0);
      }
    }, [timeJump])
  
    useEffect(() => {
      const seconds = Math.floor(audioPlayer.current.duration);
      setDuration(seconds);
      progressBar.current.max = seconds;
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);
  
    useEffect(() => {
      if (currentTime == duration) {
        togglePlayPause();
        timeTravel(0);
      }
    }, [currentTime]);
  
    const calculateTime = (secs) => {
      const minutes = Math.floor(secs / 60);
      const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(secs % 60);
      const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${returnedMinutes}:${returnedSeconds}`;
    }
  
    const play = () => {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    }
  
    const togglePlayPause = () => {
      const prevValue = isPlaying;
      setIsPlaying(!prevValue);
      if (!prevValue) {
        play();
      } else {
        audioPlayer.current.pause();
        cancelAnimationFrame(animationRef.current);
      }
    }
  
    const whilePlaying = () => {
      progressBar.current.value = audioPlayer.current.currentTime;
      changePlayerCurrentTime();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  
    const changeRange = () => {
      audioPlayer.current.currentTime = progressBar.current.value;
      changePlayerCurrentTime();
    }
  
    const changePlayerCurrentTime = () => {
      progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
      setCurrentTime(progressBar.current.value);
    }
  
    const timeTravel = (newTime) => {
      progressBar.current.value = newTime;
      changeRange();
    }
  
    return (
      <div className={styles.audioPlayer}>
        <audio ref={audioPlayer} src={audio} preload="metadata"></audio>
       
        <button onClick={togglePlayPause} className={styles.playPause}>
          {isPlaying ? <Pause /> : <Play className={styles.play} />}
        </button>
       
  
        {/* current time */}
        <div className={styles.currentTime}>{calculateTime(currentTime)}</div>
  
        {/* progress bar */}
        <div className={styles.progressBarWrapper}>
          <input type="range" className={styles.progressBar} defaultValue="0" ref={progressBar} onChange={changeRange} />
          
        </div>
  
        {/* duration */}
        <div className={styles.duration}>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
      </div>
    )
  }
  
  export default AudioPlayer