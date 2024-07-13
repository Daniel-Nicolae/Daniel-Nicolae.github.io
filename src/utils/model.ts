import vision, { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision"

async function createFaceLandmarker(landmarkerRef: React.MutableRefObject<vision.FaceLandmarker>) {
    const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
    )
    landmarkerRef.current = await FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
            modelAssetPath: "model/face_landmarker.task",
            delegate: "GPU"
        },
        runningMode: "VIDEO",
        numFaces: 1
    })
}

export default createFaceLandmarker