import { Matrix4 } from "three"
import CanalRendering from "./CanalRendering"

interface Props {
    ear: "left" | "right"
    matrixRef: React.MutableRefObject<Matrix4>
}


const GraphicsWindow = ({ear, matrixRef}: Props) => {

    return (
        <>
            <div style={{display: "flex", flexDirection: "column"}}>

                <div style={{display: "flex", flexDirection: "row"}}>
                    <CanalRendering 
                        canal="posterior" 
                        ear={ear}
                        matrixRef={matrixRef}/>
                    <div style={{width: 30}}/>
                    <CanalRendering 
                        canal="anterior" 
                        ear={ear}
                        matrixRef={matrixRef}/>
                </div>

                <div style={{height: 5}}/>

                <div style={{display: "flex", flexDirection: "row"}}>
                    <CanalRendering 
                        canal="lateral" 
                        ear={ear}
                        matrixRef={matrixRef}/>
                    <div style={{width: 30}}/>
                    <CanalRendering 
                        canal="all" 
                        ear={ear}
                        matrixRef={matrixRef}/>
                </div>

            </div>
        
        </>

    )
}

export default GraphicsWindow