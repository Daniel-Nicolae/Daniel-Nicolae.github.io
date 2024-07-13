import { useEffect, useRef, useState } from 'react';
import './App.css';
import CameraWindow from "./components/CameraWindow"
import GraphicsWindow from './components/GraphicsWindow';

function App() {

    const currentCameraRef = useRef(0)
    const [affectedEar, setAffectedEar] = useState<"left"|"right">("left")

    return (
        <>
        <div style={{height: 10}}/>
        <div style={{display: "flex", flexDirection: "row"}}>

            <div style={{width: "1%"}}/>

            <div style={{width: "50%"}}>
                <CameraWindow/>
            </div>

            <div style={{width: "3%"}}/>

            <div style={{width: "40%"}}>
                <GraphicsWindow ear={affectedEar}/>
            </div>

            <div style={{width: "1%"}}/>

        </div>
        </>
    );
}

export default App;
