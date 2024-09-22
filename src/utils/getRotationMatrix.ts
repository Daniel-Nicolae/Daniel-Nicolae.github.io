import { Matrix4, Vector3 } from "three"

const getReferenceFrame = ([x, y]: Vector3[]) => {
    // computes reference frame as outlined in the report

    x.normalize()
    
    const yx = y.dot(x)
    y.sub(x.multiplyScalar(yx)).normalize()
    x.divideScalar(yx)

    const z = new Vector3()
    z.crossVectors(x, y)

    return [x, y, z]
}

// from world coordinate system to rendering camera coord system
const renderCameraMatrix = new Matrix4()
renderCameraMatrix.set(-1, 0, 0, 0, 
                        0, 1, 0, 0,
                        0, 0, -1, 0,
                        0, 0, 0, 1)

const getRotationMatrix = (vectors: Vector3[]) => {

    const M = new Matrix4()

    const [x, y, z] = getReferenceFrame(vectors)
    M.makeBasis(x, y, z)

    // rotate the mesh in the rendering camera coord system, according to the head movement
    M.premultiply(renderCameraMatrix)
    
    if (isNaN(M.determinant())) return new Matrix4()
    else return M
}

export default getRotationMatrix