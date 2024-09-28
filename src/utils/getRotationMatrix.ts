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

const getRotationMatrix = (vectors: Vector3[]) => {

    const M = new Matrix4()

    const [x, y, z] = getReferenceFrame(vectors)
    M.makeBasis(x, y, z)
    
    if (isNaN(M.determinant())) return new Matrix4()
    else return M
}

export default getRotationMatrix