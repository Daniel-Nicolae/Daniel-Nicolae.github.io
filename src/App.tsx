import { useEffect, useRef, useState } from 'react';
import './App.css';
import CameraWindow from "./components/CameraWindow"

function App() {

    const currentCameraRef = useRef(0)

    return (
        <>
        <div style={{height: 10}}/>
        <div style={{display: "flex", flexDirection: "row"}}>

            <div style={{width: "25%"}}>
            </div>

            <div style={{width: "75%"}}>
                <CameraWindow/>
            </div>

        </div>
        </>
    );
}

export default App;
