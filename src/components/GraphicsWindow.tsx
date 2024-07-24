import { Matrix4 } from "three"
import CanalRendering from "./CanalRendering"

interface Props {
    ear: "left" | "right"
    affectedCanal: "posterior"|"anterior"|"lateral"|""
    matrixRef: React.MutableRefObject<Matrix4>
}


const GraphicsWindow = ({ear, affectedCanal, matrixRef}: Props) => {

    return (
        <>
            <div style={{display: "flex", flexDirection: "column"}}>

                <div style={{display: "flex", flexDirection: "row"}}>
                    <CanalRendering 
                        canal="posterior" 
                        ear={ear}
                        affectedCanal={affectedCanal}
                        matrixRef={matrixRef}/>
                    <div style={{width: 40}}/>
                    <CanalRendering 
                        canal="anterior" 
                        ear={ear}
                        affectedCanal={affectedCanal}
                        matrixRef={matrixRef}/>
                </div>

                <div style={{height: 5}}/>

                <div style={{display: "flex", flexDirection: "row"}}>
                    <CanalRendering 
                        canal="lateral" 
                        ear={ear}
                        affectedCanal={affectedCanal}
                        matrixRef={matrixRef}/>
                    <div style={{width: 40}}/>
                    <CanalRendering 
                        canal="all" 
                        ear={ear}
                        affectedCanal={affectedCanal}
                        matrixRef={matrixRef}/>
                </div>

            </div>
        
        </>

    )
}

export default GraphicsWindow