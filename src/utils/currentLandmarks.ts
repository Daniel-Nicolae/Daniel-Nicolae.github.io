import { Vector3 } from "three";

const zeroVector = new Vector3()
const computeCurrentLandmarks = (cameraLandmarksRefs: React.MutableRefObject<Vector3[]>[],
                                 landmarksRef: React.MutableRefObject<Vector3[]>,
                                 lostCallback: (lost: boolean) => void) => {

    const x = new Vector3()
    const y = new Vector3()

    let active = 0

    for (let i=0; i<3; i++) {
        if (cameraLandmarksRefs[i].current[0].distanceTo(zeroVector) > 0.001) {
            active += 1
            const Ai = cameraLandmarksRefs[i].current[2]
            const Bi = cameraLandmarksRefs[i].current[4]
            const Ci = cameraLandmarksRefs[i].current[0]
            x.addScaledVector(Bi.subVectors(Bi, Ai), 1)
            y.addScaledVector(Ci.subVectors(Ci, Ai), 1)
        }
    }
    
    x.multiplyScalar(1.0/active)
    y.multiplyScalar(1.0/active)

    if (active) {
        landmarksRef.current = [x, y]
        lostCallback(false)
    }
    else lostCallback(true)
}


export default computeCurrentLandmarks