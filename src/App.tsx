import { useRef, useState } from 'react';
import './App.css';
import CameraWindow from "./components/CameraWindow"
import GraphicsWindow from './components/GraphicsWindow';
import { Matrix4 } from 'three';
import SelectWindow from './components/SelectWindow';
import AlignmentWindow from './components/AlignmentWindow';

function App() {

    const [affectedEar, setAffectedEar] = useState<"left"|"right">("right")
    // const affectedEar = useRef<"left"|"right">("right")
    // const setAffectedEar = (newEar: "left"|"right") => {affectedEar.current = newEar}

    const [affectedCanal, setAffectedCanal] = useState<"posterior"|"anterior"|"lateral"|"">("")
    const matrixRef =  useRef<Matrix4>(new Matrix4())

    return (
        <>
        <div style={{height: 10}}/>
        <div style={{display: "flex", flexDirection: "row"}}>

            <div style={{width: "1%"}}/>

            <div style={{width: "25%"}}>
                <CameraWindow 
                    ear={affectedEar}
                    matrixRef={matrixRef}/>
            </div>

            <div style={{width: "45%"}}>
                <GraphicsWindow 
                    ear={affectedEar}
                    matrixRef={matrixRef}/>
            </div>

            <div style={{display: "flex", flexDirection: "column", width: "25%"}}>
                <SelectWindow 
                    ear={affectedEar}
                    canal={affectedCanal}
                    earCallback={setAffectedEar}
                    canalCallback={setAffectedCanal}/>
                <div style={{height: 90}}/>
                <AlignmentWindow/>

            </div>
        </div>
        </>
    );
}

export default App;
