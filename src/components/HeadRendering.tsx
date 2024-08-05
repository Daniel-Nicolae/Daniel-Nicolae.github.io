import { useEffect, useRef, useState } from "react"
import * as THREE from "three";
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';
import { getAlignment, meshPartsLength } from "../utils/alignment";
import { BLUE_COLOUR, ORANGE_COLOUR, BROWN_COLOUR, BACKGR_COLOUR, RED_COLOUR} from "../utils/config";

interface Props {
    ear: "left" | "right"
    matrixRef: React.MutableRefObject<THREE.Matrix4>
}

const HeadRendering = ({ear, matrixRef}: Props) => {


    const [active, setActive] = useState(true)
    const handleChange = () => {
        setActive(!active)
    }


    const camera = useRef<THREE.Camera>()
    const scene = useRef<THREE.Scene>()
    const renderer = useRef<THREE.WebGLRenderer>()
    const meshParts = useRef<THREE.Mesh[]>([])

    const coloursAll = [BLUE_COLOUR, ORANGE_COLOUR, BROWN_COLOUR, 0x333333, 0x333333]

    useEffect(() => {

        // Renderer initialisation
        const canvas = document.getElementById("headCanvas") as HTMLCanvasElement
        renderer.current = new THREE.WebGLRenderer({canvas: canvas, antialias: true})
        const size = active ? 400 : 0
		renderer.current.setSize(size, size)


        // Scene initialisation
        scene.current = new THREE.Scene()
        scene.current.background = new THREE.Color(BACKGR_COLOUR)

        // Camera initialisation
        camera.current = new THREE.PerspectiveCamera(15, 1)
        camera.current.position.set(0, 0, 100) 
        camera.current.lookAt(0, 0, 0)


        // Add lights
        const sectionHighlight = new THREE.AmbientLight(0xffffff, 0.8)
        scene.current.add(sectionHighlight)

        const pointLight1 = new THREE.PointLight(0xffffff, 5000)
        pointLight1.castShadow = true
        pointLight1.position.set(0, 20, 20)
        pointLight1.lookAt(0, 0, 0)
        scene.current.add(pointLight1)


        // Load Ear Mesh
        const loader = new PLYLoader()
        loader.load("meshes/capsule.ply", (geometry) => {

            const material = new THREE.MeshStandardMaterial({color: BLUE_COLOUR, flatShading: true})
            const loadedMesh = new THREE.Mesh(geometry.center(), material)

            if ((ear === "left"))
                loadedMesh.applyMatrix4(new THREE.Matrix4().makeScale(-1, 1, 1))

            loadedMesh.applyMatrix4(new THREE.Matrix4().makeScale(0.3, 0.3, 0.3))


            scene.current!.add(loadedMesh)
            meshParts.current.push(loadedMesh)
        })

        // Load head mesh
        loader.load("meshes/head.ply", (geometry) => {

            const material = new THREE.MeshPhongMaterial({color: 0x555555, flatShading: true, transparent: true, opacity: 0.5})
            const loadedMesh = new THREE.Mesh(geometry.center(), material)

            scene.current!.add(loadedMesh)
            meshParts.current.push(loadedMesh)
        })



        // Define gravity vector
        const arrowMaterial = new THREE.LineBasicMaterial({color: RED_COLOUR, linewidth: 10})
        const points = []
        points.push(new THREE.Vector3(10, -5, 0))
        points.push(new THREE.Vector3(10, -10.3, 0))
        points.push(new THREE.Vector3(10.9, -8.7, 0))
        points.push(new THREE.Vector3(10, -10.3, 0))
        points.push(new THREE.Vector3(9.1, -8.7, 0))


        const arrowGeometry = new THREE.BufferGeometry().setFromPoints(points)
        const arrow = new THREE.Line(arrowGeometry, arrowMaterial)
        scene.current.add(arrow)

        let loop: number = requestAnimationFrame(animate)

        function animate() {
            if (meshParts.current[0]) {
                for (let mesh of meshParts.current) {
                    mesh.rotation.set(0, 0, 0)
                    if (mesh.geometry.attributes.position.array.length === 33435) 
                        mesh.position.set(ear === "left" ? 3 : -3, 0, 0)

                    mesh.applyMatrix4(matrixRef.current)
                }

                renderer.current!.render(scene.current!, camera.current!)
            }
            loop = requestAnimationFrame(animate)
        }

        return () => {
            cancelAnimationFrame(loop) 
            scene.current!.clear()
            meshParts.current = [] // flush any previous loadings
        }

    }, [ear, active, matrixRef])


    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>

            <div style={{height: 5}}/>
            <div className="form-check form-switch"
                 style={{display: "flex", flexDirection: "row", height: 20, alignItems: "center", justifyContent: "center"}}>
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={active}
                    onChange={handleChange}
                /> 
                <div style={{width: 7}}/>
                <div style={{fontSize: 20}}>{"Head"}</div>
            </div>
            <div style={{height: 5}}/>

            <canvas id={"headCanvas"}/>
        
        </div>

    )
}

export default HeadRendering