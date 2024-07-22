import { useRef, useState } from 'react';
import './App.css';
import CameraWindow from "./components/CameraWindow"
import GraphicsWindow from './components/GraphicsWindow';
import { Matrix4 } from 'three';

function App() {

    const [affectedEar, setAffectedEar] = useState<"left"|"right">("right")
    const matrixRef =  useRef<Matrix4>(new Matrix4())

    return (
        <>
        <div style={{height: 10}}/>
        <div style={{display: "flex", flexDirection: "row"}}>

            <div style={{width: "1%"}}/>

            <div style={{width: "30%"}}>
                <CameraWindow 
                    matrixRef={matrixRef}/>
            </div>

            <div style={{width: "3%"}}/>

            <div style={{width: "60%"}}>
                <GraphicsWindow 
                    ear={affectedEar}
                    matrixRef={matrixRef}/>
            </div>

            <div style={{width: "1%"}}/>

        </div>
        </>
    );
}

export default App;
