import { useRef, useState } from 'react';
import './App.css';
import CameraWindow from "./components/CameraWindow"
import GraphicsWindow from './components/GraphicsWindow';
import { Matrix4 } from 'three';
import SelectWindow from './components/SelectWindow';
import AlignmentDisplay from './components/AlignmentDisplay';

function App() {

    const [affectedEar, setAffectedEar] = useState<"left"|"right">("right")

    const [affectedCanal, setAffectedCanal] = useState<"posterior"|"anterior"|"lateral"|"">("")
    const handleCanalChange = (newCanal: "posterior"|"anterior"|"lateral") => {
        if (affectedCanal !== newCanal) setAffectedCanal(newCanal)
        else setAffectedCanal("")
        setStage(1)
    }

    const [stage, setStage] = useState(1)
    const handleStageAdvance = () => {
        setStage(stage % 3 + 1)
    }

    const alignmentRef = useRef(0)
    const alignedRef = useRef(false)

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
                        affectedCanal={affectedCanal}
                        matrixRef={matrixRef}
                        stage={stage}
                        alignmentRef={alignmentRef}
                        alignedRef={alignedRef}/>
                </div>

            <div style={{display: "flex", flexDirection: "column", width: "25%"}}>
                <SelectWindow 
                    ear={affectedEar}
                    canal={affectedCanal}
                    earCallback={setAffectedEar}
                    canalCallback={handleCanalChange}/>
                <div style={{height: 90}}/>
                {affectedCanal && 
                <AlignmentDisplay
                    stage={stage}
                    alignmentRef={alignmentRef}
                    alignedRef={alignedRef}
                    />}

            </div>
        </div>
        </>
    );
}

export default App;
