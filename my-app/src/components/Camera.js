import React from 'react'
import CameraPic from '../assets/camera.svg'
import './Camera.css'

export default function Camera() {
    return (
        <div>
            <img src={CameraPic} alt="" className="camera"/>
        </div>
    )
}
