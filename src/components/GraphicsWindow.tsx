import { Matrix4 } from "three"
import CanalRendering from "./CanalRendering"
import { useState } from "react"

interface Props {
    ear: "left" | "right"
    affectedCanal: "posterior"|"anterior"|"lateral"|""
    matrixRef: React.MutableRefObject<Matrix4>,
    stage: number,
    alignmentRef: React.MutableRefObject<number>
    alignedRef: React.MutableRefObject<boolean>
}


const GraphicsWindow = ({ear, affectedCanal, matrixRef, stage, alignmentRef, alignedRef}: Props) => {

    return (
        <>
            <div style={{display: "flex", flexDirection: "column"}}>

                <div style={{display: "flex", flexDirection: "row"}}>
                    <CanalRendering 
                        canal="posterior" 
                        ear={ear}
                        affectedCanal={affectedCanal}
                        matrixRef={matrixRef}
                        stage={stage}
                        alignmentRef={alignmentRef}
                        alignedRef={alignedRef}/>
                    <div style={{width: 40}}/>
                    <CanalRendering 
                        canal="anterior" 
                        ear={ear}
                        affectedCanal={affectedCanal}
                        matrixRef={matrixRef}
                        stage={stage}
                        alignmentRef={alignmentRef}
                        alignedRef={alignedRef}/>
                </div>

                <div style={{height: 5}}/>

                <div style={{display: "flex", flexDirection: "row"}}>
                    <CanalRendering 
                        canal="lateral" 
                        ear={ear}
                        affectedCanal={affectedCanal}
                        matrixRef={matrixRef}
                        stage={stage}
                        alignmentRef={alignmentRef}
                        alignedRef={alignedRef}/>

                    <div style={{width: 40}}/>

                    <CanalRendering 
                        canal="all" 
                        ear={ear}
                        affectedCanal={affectedCanal}
                        matrixRef={matrixRef}
                        stage={0}
                        alignmentRef={null}
                        alignedRef={alignedRef}/>
                </div>

            </div>
        
        </>

    )
}

export default GraphicsWindow