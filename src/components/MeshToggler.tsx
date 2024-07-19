import { useState } from "react"

interface Props {
    drawMeshRef: React.MutableRefObject<boolean>
}

const MeshToggler = ({drawMeshRef}: Props) => {

    const [drawMesh, setDrawMesh] = useState(drawMeshRef.current)
    const handleMeshToggle = () => {
        drawMeshRef.current = !drawMeshRef.current
        setDrawMesh(!drawMesh)
    }

    return (
        <div>
            <input
                type="checkbox"
                checked={drawMeshRef.current}
                onChange={handleMeshToggle}
            /> Draw facial mesh
        </div>
    )
}

export default MeshToggler