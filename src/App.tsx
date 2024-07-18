import { useRef, useState } from 'react';
import './App.css';
import CameraWindow from "./components/CameraWindow"
import GraphicsWindow from './components/GraphicsWindow';
import { Matrix3 } from 'three';

function App() {

    const [affectedEar, setAffectedEar] = useState<"left"|"right">("left")
    const matrixRef =  useRef<Matrix3>(new Matrix3())


    return (
        <>
        <div style={{height: 10}}/>
        <div style={{display: "flex", flexDirection: "row"}}>

            <div style={{width: "1%"}}/>

            <div style={{width: "50%"}}>
                <CameraWindow 
                    matrixRef={matrixRef}/>
            </div>

            <div style={{width: "3%"}}/>

            <div style={{width: "40%"}}>
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
