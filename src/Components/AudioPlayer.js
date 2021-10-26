 import song from "../assets/song2.mp3"
 import "react-router-dom";
 import React, { useState, useRef, useEffect } from "react";

 import SkipNextIcon from '@mui/icons-material/SkipNext';
 import PlayArrowIcon from '@mui/icons-material/PlayArrow';
 import PauseIcon from '@mui/icons-material/Pause';
 import Forward30Icon from '@mui/icons-material/Forward30';
 import Replay30Icon from '@mui/icons-material/Replay30';
 import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
 import "../styles/AudioPlayer.css";
 
 function AudioPlayer() 
 {
    const [playPause, setPlayPause] = useState(false);
    const [duration, setDuration] = useState(0); 
    const [currentTime, setCurrent] = useState(0);


    // references
    const audioPlay = useRef(); //ref audio comp
    const progBar = useRef(); //ref progression bar
    const animationRef = useRef(); // ref animaiton of progression bar

    useEffect( () => 
    {
        const sec = Math.floor(audioPlay.current.duration);
        setDuration(sec);
        progBar.current.max = sec; 

    }, [audioPlay?.current?.loadmetadata, audioPlay?.current?.readyState])

    // function to caLculate the time of the song
    const timeCalculation = (secs) =>
    {
        const minute = Math.floor(secs / 60);
        const returnMin = minute < 10 ? `0${minute}` : `${minute}`;
        const seconds = Math.floor(secs % 60);
        const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnMin}:${returnSec}`;
    }

    //togle play and pause music 
    const togglePlayPause = () => 
    {
        const previousValue = playPause;
        setPlayPause(!previousValue);

        if (!previousValue)
        {   
            audioPlay.current.play(); 
            animationRef.current = requestAnimationFrame(whilePlaying);
        }

        else
        {
            audioPlay.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    }

    const whilePlaying = () =>
    {
        progBar.current.value = audioPlay.current.currentTime;
        changePlayerCurrent();
        animationRef.current = requestAnimationFrame(whilePlaying);
    }

    const range = () =>
    {
        audioPlay.current.currentTime = progBar.current.value;
        changePlayerCurrent();
    }

    const changePlayerCurrent = () =>
    {
        progBar.current.style.setProperty('--seek-before-width', `${progBar.current.value / duration * 100}%`)
        setCurrent(progBar.current.value);
    }

    // function to go back 30 seconds
    const back30 = () =>
    {
        audioPlay.current.currentTime = audioPlay.current.currentTime - 30;
        progBar.current.value = audioPlay.current.currentTime;
        changePlayerCurrent();
    }

    //function to skip 30 seconds
    const frwd30 = () =>
    {
        audioPlay.current.currentTime = audioPlay.current.currentTime + 30;
        progBar.current.value = audioPlay.current.currentTime;
        changePlayerCurrent();
    }


    return (
         <div className="aPlaya">
             {/* audio being played */}
            <audio ref={audioPlay} src = {song} preload="metadata"></audio>
            
            {/* previous song button */}
            <button className="skipFrontBack">
                <SkipPreviousIcon />
            </button>

            {/* back 30 seconds button */}
            <button className="skip30" onClick = {back30}>
                <Replay30Icon />
            </button>
            
            {/* play and pause button */}
            <button onClick = {togglePlayPause} className="PandP">
                { playPause ? <PauseIcon /> : <PlayArrowIcon /> }
            </button>

            {/* forward 30 seconds button */}
            <button className="skip30" onClick = {frwd30}>
                <Forward30Icon />
            </button>

            {/* next song button */}
            <button className="skipFrontBack2">
                <SkipNextIcon />
            </button>

            <div className="time">
                <div className="lefts">{timeCalculation(currentTime)}</div>
                
                {/* progress bar */}
                <div className="progBarBody">
                    <input type="range" className = "progressBar" defaultValue = "0" ref={progBar} onChange={range}/>
                </div>

                <div className="length">{(duration && !isNaN(duration)) && timeCalculation(duration)}</div>
            </div> 
         </div>
     )
 }
 
 export default AudioPlayer
  