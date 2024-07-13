import { useEffect, useRef, useState } from "react"
import * as THREE from "three";
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';
import { meshPartsLength } from "../utils/alignment";

interface Props {
    canal: "posterior" | "anterior" | "lateral" | "all",
    ear: "left" | "right"
}

const CanalRendering = ({canal, ear}: Props) => {


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
        camera.current = new THREE.PerspectiveCamera(15, 1)
        camera.current.position.set(0, 0, canal === "all" ? 80 : 40) 
        camera.current.lookAt(0, 0, 0)


        // Add lights
        const sectionHighlight = new THREE.AmbientLight(0xffffff, 0.8)
        scene.current.add(sectionHighlight)

        const pointLight1 = new THREE.PointLight(0xffffff, 1000)
        pointLight1.castShadow = true
        pointLight1.position.set(0, 0, 20)
        scene.current.add(pointLight1)

        const pointLight2 = new THREE.PointLight(0xffffff, 1000)
        pointLight2.castShadow = true
        pointLight2.position.set(0, 20, 0)
        scene.current.add(pointLight2)


        // Load Canal Mesh
        const loader = new PLYLoader()
        for (let i = 0; i < meshPartsLength[canal]; i++) {
            const meshPath = "meshes/" + canal + "_" + i.toString() + ".ply"
            loader.load(meshPath, (geometry) => {

                const color = (false) ? ORANGE_COLOUR : BLUE_COLOUR // to change for different colours
                const material = new THREE.MeshStandardMaterial({color: color, side: THREE.DoubleSide, flatShading: true})
                const loadedMesh = new THREE.Mesh(geometry, material);

                if ((ear === "left"))
                    loadedMesh.applyMatrix4(new THREE.Matrix4().makeScale(-1, 1, 1))
                scene.current!.add(loadedMesh)
                meshParts.current.push(loadedMesh)
            })
        }

        let loop: number = requestAnimationFrame(animate)

        function animate() {
            if (meshParts.current[meshPartsLength[canal] - 1]) {
                for (let mesh of meshParts.current) mesh.rotation.set(Math.PI, 0, 0)
                // const landmarks = landmarksCallback()
                // if (landmarks[0]) {
                //     const rotationMatrix = getRotationMatrix(landmarks, ear, canal, currentCamera)
                //     for (let mesh of meshParts.current) mesh.applyMatrix4(rotationMatrix) 
                // }
                renderer.current!.render(scene.current!, camera.current!)
                // alignment.current = getAlignment(canal, stage, meshParts.current[stage])
            }
            loop = requestAnimationFrame(animate)
        }

        return () => {
            cancelAnimationFrame(loop) 
            scene.current!.clear()
            meshParts.current = [] // flush any previous loadings
        }

    }, [ear, active])


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