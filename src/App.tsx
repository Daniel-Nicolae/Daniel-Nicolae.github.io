import { useRef, useState } from 'react';
import './App.css';
import CameraWindow from "./components/CameraWindow"
import GraphicsWindow from './components/GraphicsWindow';
import { Matrix4 } from 'three';
import SelectWindow from './components/SelectWindow';
import AlignmentDisplay from './components/AlignmentDisplay';
import HeadRendering from './components/HeadRendering';

function App() {

    // State variables for tracking the active ear, canal and Epley stage
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

    const alignmentRef = useRef(0) // alignment score variable, changed by the CanalRendering component 
                                   // using the alignment.ts function, and displayed by the 
                                   // AlignmentDisplay component
    const alignedRef = useRef(false) // boolean for whether or not the alignment is good enough,
                                     // changed by AlignmentDisplay

    const matrixRef =  useRef<Matrix4>(new Matrix4()) // 4x4 (homogeneous coords) rotation matrix
                        //  calculated in CameraWindow then used in each CanalRendering

    return (
        <>
        <div style={{height: "1vh"}}/>
        <div style={{display: "flex", flexDirection: "row"}}>

            <div style={{width: "1vw"}}/>

            <div style={{width: "24vw"}}>
                <CameraWindow 
                    matrixRef={matrixRef}/>
            </div>

                <div style={{width: "45vw"}}>
                    <GraphicsWindow 
                        ear={affectedEar}
                        affectedCanal={affectedCanal}
                        matrixRef={matrixRef}
                        stage={stage}
                        alignmentRef={alignmentRef}
                        alignedRef={alignedRef}/>
                </div>

            <div style={{display: "flex", flexDirection: "column", width: "27vw"}}>
                <SelectWindow 
                    ear={affectedEar}
                    canal={affectedCanal}
                    earCallback={setAffectedEar}
                    canalCallback={handleCanalChange}/>

                {affectedCanal && 
                <AlignmentDisplay
                    stage={stage}
                    stageCallback={handleStageAdvance}
                    alignmentRef={alignmentRef}
                    alignedRef={alignedRef}
                    />}
                <div style={{height: "5vh"}}/>
                <HeadRendering
                    ear={affectedEar}
                    matrixRef={matrixRef}/>

            </div>
        </div>
        </>
    );
}

export default App;
