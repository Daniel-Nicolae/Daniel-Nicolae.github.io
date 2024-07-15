import { useEffect, useRef, useState } from 'react';
import './App.css';
import CameraWindow from "./components/CameraWindow"
import GraphicsWindow from './components/GraphicsWindow';
import vision from "@mediapipe/tasks-vision"

function App() {

    const currentCameraRef = useRef(0)
    const [affectedEar, setAffectedEar] = useState<"left"|"right">("left")
    const landmarksRef =  useRef<vision.NormalizedLandmark[]>([])


    return (
        <>
        <div style={{height: 10}}/>
        <div style={{display: "flex", flexDirection: "row"}}>

            <div style={{width: "1%"}}/>

            <div style={{width: "50%"}}>
                <CameraWindow 
                    landmarksRef={landmarksRef}/>
            </div>

            <div style={{width: "3%"}}/>

            <div style={{width: "40%"}}>
                <GraphicsWindow 
                    ear={affectedEar}
                    landmarksRef={landmarksRef}/>
            </div>

            <div style={{width: "1%"}}/>

        </div>
        </>
    );
}

export default App;
