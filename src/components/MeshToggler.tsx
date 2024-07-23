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
        <div className="form-check form-switch">
            <input
                id={"switch" + number}
                className="form-check-input"
                type="checkbox"
                checked={drawMeshRef.current}
                onChange={handleMeshToggle}
            />
            <label className="form-check-label" htmlFor={"switch" + number}>Draw facial mesh</label>
        </div>
    )
}

export default MeshToggler