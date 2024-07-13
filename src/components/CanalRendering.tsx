import { useEffect, useRef, useState } from "react"
import * as THREE from "three";

interface Props {
    canal: "posterior" | "anterior" | "lateral" | "all"
}

const CanalRendering = ({canal}: Props) => {


    const [active, setActive] = useState(true)
    const handleChange = () => {
        setActive(!active)
    }


    const camera = useRef<THREE.Camera>()
    const scene = useRef<THREE.Scene>()
    const renderer = useRef<THREE.WebGLRenderer>()
    const meshParts = useRef<THREE.Mesh[]>([])



    const ORANGE_COLOUR = 0xffbb33
    const BLUE_COLOUR = 0x0022aa
    const BACKGR_COLOUR = 0xbbaa99


    useEffect(() => {

        // Renderer initialisation
        const canvas = document.getElementById("canalCanvas" + canal) as HTMLCanvasElement
        renderer.current = new THREE.WebGLRenderer({canvas: canvas})
		renderer.current.setSize(300, 300)


        // Scene initialisation
        scene.current = new THREE.Scene()
        scene.current.background = new THREE.Color(BACKGR_COLOUR)

        // Camera initialisation
        camera.current = new THREE.PerspectiveCamera(60, 1)
        camera.current.position.set(0, 0, 20) 
        camera.current.lookAt(0, 0, 0)


        // Add lights
        const sectionHighlight = new THREE.AmbientLight(ORANGE_COLOUR, 0.8)
        scene.current.add(sectionHighlight)

        // Add ground
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100),
            new THREE.MeshStandardMaterial({color: 0xcbcbcb, flatShading: true})
        )
        plane.rotation.x = -Math.PI/2
        plane.position.y = -10;
        scene.current.add(plane)


        renderer.current.render(scene.current, camera.current)

    }, [])


    return (
        <div style={{display: "flex", flexDirection: "column"}}>
        
            <div style={{display: "flex", flexDirection: "row", height: 20, alignItems: "baseline", justifyContent: "center"}}>
                <input
                    type="checkbox"
                    checked={active}
                    onChange={handleChange}
                /> 
                <div style={{fontSize: 20}}>{canal}</div>
            </div>
            <div style={{height: 10}}/>

            {active && <canvas id={"canalCanvas" + canal}/>}
        
        </div>

    )
}

export default CanalRendering