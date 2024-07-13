import { useEffect, useRef, useState } from "react"
import * as THREE from "three";
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';

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
        const size = active ? 300 : 0
		renderer.current.setSize(size, size)


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



        // Load Canal Mesh
        // const loader = new PLYLoader()
        // for (let i = 0; i < meshPartsLength[canal]; i++) {
        //     const meshPath = "meshes/" + canal + "_" + i.toString() + ".ply"
        //     loader.load(meshPath, (geometry) => {

        //         const color = (i === stage) ? ORANGE_COLOUR : BLUE_COLOUR
        //         const material = new THREE.MeshStandardMaterial({color: color, side: THREE.DoubleSide, flatShading: true})
        //         const loadedMesh = new THREE.Mesh(geometry, material);

        //         if ((ear === "left" && currentCamera === 0) || (ear === "right" && currentCamera === 1)) 
        //             loadedMesh.applyMatrix4(new THREE.Matrix4().makeScale(-1, 1, 1))
        //         scene.current!.add(loadedMesh)
        //         meshParts.current.push(loadedMesh)
        //     })
        // }


        renderer.current.render(scene.current, camera.current)

    }, [active])


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

            <canvas id={"canalCanvas" + canal}/>
        
        </div>

    )
}

export default CanalRendering