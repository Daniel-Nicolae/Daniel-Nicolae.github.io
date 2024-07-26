import { cameraMatrices } from "../utils/cameraPositions"
import { Matrix4, Vector3 } from "three"

const getReferenceFrame = ([A, B, C]: Vector3[]) => {

    const x = new Vector3()
    x.subVectors(B, A).normalize()
    
    const y = new Vector3()
    y.subVectors(C, A)
    const yx = y.dot(x)
    y.sub(x.multiplyScalar(yx)).normalize()
    x.divideScalar(yx)

    const z = new Vector3()
    z.crossVectors(x, y)

    return [x, y, z]
}

const getRotationMatrix = (usefulLandmarks: Vector3[], number: number) => {

    for (let i=0; i<3; i++) usefulLandmarks[i].applyMatrix4(cameraMatrices[number-1])
    const [x, y, z] = getReferenceFrame(usefulLandmarks)
    const M = new Matrix4()
    M.makeBasis(x, y, z)

    // if (number === 1) console.log(cameraMatrices[number])
    
    return M
}

export default getRotationMatrix