import { Matrix3 } from "three";

const computeAverageLandmarks = (cameraLandmarksRefs: React.MutableRefObject<Matrix3>[],
                                 landmarksRef: React.MutableRefObject<Matrix3>) => {

    // let s: number
    // for (let i=0; i<3; i++) {
    //     s = 0
    //     for (let landmark of cameraLandmarksRefs[i].current) s += landmark.x
    //     console.log(i, s)
    // }
    // console.log("##################")
    if (cameraLandmarksRefs[0].current.determinant()) {
        console.log(cameraLandmarksRefs[0].current.elements[0])
        landmarksRef.current = cameraLandmarksRefs[0].current
    }
}


export default computeAverageLandmarks