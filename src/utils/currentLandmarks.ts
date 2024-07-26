import { Matrix4 } from "three";

const computeCurrentLandmarks = (cameraMatrixRefs: React.MutableRefObject<Matrix4>[],
                                 matrixRef: React.MutableRefObject<Matrix4>) => {

    // let s: number
    // for (let i=0; i<3; i++) {
    //     s = 0
    //     for (let landmark of cameraMatrixRefs[i].current) s += landmark.x
    //     console.log(i, s)
    // }
    // console.log("##################")
    matrixRef.current = cameraMatrixRefs[0].current
}


export default computeCurrentLandmarks