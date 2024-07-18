import { Matrix3 } from "three"
import CanalRendering from "./CanalRendering"

interface Props {
    ear: "left" | "right"
    matrixRef: React.MutableRefObject<Matrix3>
}


const GraphicsWindow = ({ear, matrixRef}: Props) => {


    


    return (
        <>
            <div style={{display: "flex", flexDirection: "column"}}>

                <div style={{display: "flex", flexDirection: "row"}}>
                    <CanalRendering canal="posterior" ear={ear}/>
                    <div style={{width: 10}}/>
                    <CanalRendering canal="anterior" ear={ear}/>
                </div>

                <div style={{height: 10}}/>

                <div style={{display: "flex", flexDirection: "row"}}>
                    <CanalRendering canal="lateral" ear={ear}/>
                    <div style={{width: 10}}/>
                    <CanalRendering canal="all" ear={ear}/>
                </div>

            </div>
        
        </>

    )
}

export default GraphicsWindow