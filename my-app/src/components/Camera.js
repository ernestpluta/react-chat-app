import React from 'react'
import CameraPic from '../assets/camera.svg'
import './Camera.css'

export default function Camera({userPic}) {
    return (
        <div>
            <img src={CameraPic} alt="" className={userPic ? 'camera' : 'camera-center'}/>
        </div>
    )
}
