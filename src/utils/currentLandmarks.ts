import { Vector3 } from "three";

const computeCurrentLandmarks = (cameraLandmarksRefs: React.MutableRefObject<Vector3[]>[],
                                 landmarksRef: React.MutableRefObject<Vector3[]>) => {

    const x = new Vector3()
    const y = new Vector3()

    let atLeastOne = false

    for (let i=0; i<3; i++) {
        if (cameraLandmarksRefs[i].current.length) {
            atLeastOne = true
            const Ai = cameraLandmarksRefs[i].current[2]
            const Bi = cameraLandmarksRefs[i].current[4]
            const Ci = cameraLandmarksRefs[i].current[0]
            x.addScaledVector(Bi.subVectors(Bi, Ai), 1/3)
            y.addScaledVector(Ci.subVectors(Ci, Ai), 1/3)
        }
    }

    if (atLeastOne) {
        landmarksRef.current = [x, y]
    }
}


export default computeCurrentLandmarks