import { Matrix4, Vector3 } from "three"

const getReferenceFrame = ([x, y]: Vector3[]) => {

    x.normalize()
    
    const yx = y.dot(x)
    y.sub(x.multiplyScalar(yx)).normalize()
    x.divideScalar(yx)

    const z = new Vector3()
    z.crossVectors(x, y)

    return [x, y, z]
}

const renderCameraMatrix = new Matrix4()
renderCameraMatrix.set(-1, 0, 0, 0, 
                        0, 1, 0, 0,
                        0, 0, -1, 0,
                        0, 0, 0, 1)

const getRotationMatrix = (landmarksRef: React.MutableRefObject<Vector3[]>, isClinicalRef: React.MutableRefObject<boolean>) => {

    const [x, y, z] = getReferenceFrame(landmarksRef.current)
    const M = new Matrix4()
    M.makeBasis(x, y, z)

    if (isClinicalRef.current) M.premultiply(renderCameraMatrix)
    
    return M
}

export default getRotationMatrix