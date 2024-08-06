import { useEffect, useRef, useState } from "react"
import * as THREE from "three";
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';
import { getAlignment, meshPartsLength } from "../utils/alignment";
import { BLUE_COLOUR, ORANGE_COLOUR, BROWN_COLOUR, BACKGR_COLOUR, GREEN_COLOUR, RED_COLOUR} from "../utils/config";

interface Props {
    canal: "posterior" | "anterior" | "lateral" | "all",
    ear: "left" | "right"
    affectedCanal: "posterior"|"anterior"|"lateral"|""
    matrixRef: React.MutableRefObject<THREE.Matrix4>
    stage: number
    alignmentRef: React.MutableRefObject<number> | null
    alignedRef: React.MutableRefObject<boolean>
}

function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const CanalRendering = ({canal, ear, affectedCanal, matrixRef, stage, alignmentRef, alignedRef}: Props) => {


    const [active, setActive] = useState(true)
    const handleChange = () => {
        setActive(!active)
    }


    const camera = useRef<THREE.Camera>()
    const scene = useRef<THREE.Scene>()
    const renderer = useRef<THREE.WebGLRenderer>()
    const meshParts = useRef<THREE.Mesh[]>([])



    const canalColours = {"posterior": BLUE_COLOUR, "anterior": ORANGE_COLOUR, "lateral": BROWN_COLOUR, "all": 0}
    const coloursAll = [BLUE_COLOUR, ORANGE_COLOUR, BROWN_COLOUR, 0x333333, 0x333333]

    useEffect(() => {
        const affected = affectedCanal === canal

        // Renderer initialisation
        const canvas = document.getElementById("canalCanvas" + canal) as HTMLCanvasElement
        renderer.current = new THREE.WebGLRenderer({canvas: canvas, antialias: true})
        const size = active ? 400 : 0
		renderer.current.setSize(size, size)


        // Scene initialisation
        scene.current = new THREE.Scene()
        scene.current.background = new THREE.Color(BACKGR_COLOUR)

        // Camera initialisation
        camera.current = new THREE.PerspectiveCamera(15, 1)
        camera.current.position.set(0, 0, canal === "all" ? 70 : 39) 
        camera.current.lookAt(0, 0, 0)


        // Add lights
        const sectionHighlight = new THREE.AmbientLight(0xffffff, 0.8)
        scene.current.add(sectionHighlight)

        const pointLight1 = new THREE.PointLight(0xffffff, 200)
        pointLight1.castShadow = true
        pointLight1.position.set(0, 0, 35)
        scene.current.add(pointLight1)

        const pointLight2 = new THREE.PointLight(0xffffff, canal === "all" ? 850 : 1300)
        pointLight2.castShadow = true
        pointLight2.position.set(0, 15, 8)
        scene.current.add(pointLight2)

        const pointLight3 = new THREE.PointLight(0xffffff, 200)
        pointLight3.castShadow = true
        pointLight3.position.set(0, -20, 0)
        scene.current.add(pointLight3)


        // Load Canal Mesh
        const loader = new PLYLoader()
        let color = 0
        for (let i = 0; i < meshPartsLength[canal]; i++) {
            const meshPath = "meshes/" + canal + "_" + i.toString() + ".ply"
            loader.load(meshPath, (geometry) => {

                if (canal === "all") color = coloursAll[i]
                else {
                    if (affected && ((i+1 === stage && canal === "lateral") || 
                                    (i === stage && canal !== "lateral"))) color = RED_COLOUR
                    else color = canalColours[canal]
                }

                const material = new THREE.MeshStandardMaterial({color: color, side: THREE.DoubleSide, flatShading: true})
                const loadedMesh = new THREE.Mesh(geometry, material)

                if ((ear === "left"))
                    loadedMesh.applyMatrix4(new THREE.Matrix4().makeScale(-1, 1, 1))
                scene.current!.add(loadedMesh)
                meshParts.current.push(loadedMesh)
            })
        }

        // Define gravity vector
        const arrowMaterial = new THREE.LineBasicMaterial({color: RED_COLOUR, linewidth: 10})
        const points = []
        if (canal === "all") {
            points.push(new THREE.Vector3(7.8, -3.5, 0))
            points.push(new THREE.Vector3(7.8, -7.2, 0))
            points.push(new THREE.Vector3(8.45, -6.1, 0))
            points.push(new THREE.Vector3(7.8, -7.2, 0))
            points.push(new THREE.Vector3(7.15, -6.1, 0))
        }
        else {
            points.push(new THREE.Vector3(4.3, -2, 0))
            points.push(new THREE.Vector3(4.3, -4, 0))
            points.push(new THREE.Vector3(4.7, -3.4, 0))
            points.push(new THREE.Vector3(4.3, -4, 0))
            points.push(new THREE.Vector3(3.9, -3.4, 0))
        }


        const arrowGeometry = new THREE.BufferGeometry().setFromPoints(points)
        const arrow = new THREE.Line(arrowGeometry, arrowMaterial)
        scene.current.add(arrow)

        let loop: number = requestAnimationFrame(animate)

        function animate() {
            if (meshParts.current[meshPartsLength[canal] - 1]) {
                for (let mesh of meshParts.current) {
                    mesh.rotation.set(0, 0, 0)
                    mesh.applyMatrix4(matrixRef.current)
                }

                if (affected) {
                    const segmentID = canal === "lateral" ? stage - 1 : stage
                    alignmentRef!.current = getAlignment(canal, stage, meshParts.current[segmentID])
                    if (alignedRef.current) {
                        const material = new THREE.MeshStandardMaterial({color: GREEN_COLOUR, side: THREE.DoubleSide, flatShading: true})
                        meshParts.current[segmentID].material = material
                    } 
                    else {
                        const material = new THREE.MeshStandardMaterial({color: RED_COLOUR, side: THREE.DoubleSide, flatShading: true})
                        meshParts.current[segmentID].material = material
                    }
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

    }, [ear, affectedCanal, active, matrixRef, stage])


    return (
        <div style={{display: "flex", flexDirection: "column"}}>

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
                <div style={{fontSize: 20}}>{capitalize(canal)}</div>
            </div>
            <div style={{height: 5}}/>

            <canvas id={"canalCanvas" + canal}/>
        
        </div>

    )
}

export default CanalRendering