import Webcam from "react-webcam"

const CameraWindow = () => {



    return (
        <Webcam
            videoConstraints={{
                aspectRatio: 4/3
            }}
        /> 
    )
}

export default CameraWindow