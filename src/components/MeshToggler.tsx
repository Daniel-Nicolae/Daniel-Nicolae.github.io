import { useState } from "react"

interface Props {
    number: number
    drawMeshRef: React.MutableRefObject<boolean>
}

const MeshToggler = ({number, drawMeshRef}: Props) => {

    const [drawMesh, setDrawMesh] = useState(drawMeshRef.current)
    const handleMeshToggle = () => {
        drawMeshRef.current = !drawMeshRef.current
        setDrawMesh(!drawMesh)
    }

    return (
        <div className="form-check form-switch"
             style={{display: "flex", flexDirection: "row", height: 20, alignItems: "center", justifyContent: "center"}}>
            <input
                className="form-check-input"
                type="checkbox"
                checked={drawMeshRef.current}
                onChange={handleMeshToggle}
            />
            <div style={{width: 7}}/>
            <div style={{fontSize: 20}}>Facial mesh</div>
        </div>
    )
}

export default MeshToggler