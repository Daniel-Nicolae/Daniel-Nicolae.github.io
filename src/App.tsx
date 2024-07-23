import { useRef, useState } from 'react';
import './App.css';
import CameraWindow from "./components/CameraWindow"
import GraphicsWindow from './components/GraphicsWindow';
import { Matrix4 } from 'three';
import SelectWindow from './components/SelectWindow';

function App() {

    const [affectedEar, setAffectedEar] = useState<"left"|"right">("right")
    const [affectedCanal, setAffectedCanal] = useState<"posterior"|"anterior"|"lateral"|"">("")
    const matrixRef =  useRef<Matrix4>(new Matrix4())

    return (
        <>
        <div style={{height: 10}}/>
        <div style={{display: "flex", flexDirection: "row"}}>

            <div style={{width: "1%"}}/>

            <div style={{width: "25%"}}>
                <CameraWindow 
                    matrixRef={matrixRef}/>
            </div>

            <div style={{width: "45%"}}>
                <GraphicsWindow 
                    ear={affectedEar}
                    matrixRef={matrixRef}/>
            </div>

            <div style={{width: "25%"}}>
                <SelectWindow 
                    ear={affectedEar}
                    earCallback={setAffectedEar}
                    canal={affectedCanal}
                    canalCallback={setAffectedCanal}/>
            </div>

            {affectedCanal}

        </div>
        </>
    );
}

export default App;
