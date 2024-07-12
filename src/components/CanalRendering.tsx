import { useState } from "react"


interface Props {
    canal: "posterior" | "anterior" | "lateral" | "all"
}

const CanalRendering = ({canal}: Props) => {


    const [active, setActive] = useState(false)

    const handleChange = () => {
        setActive(!active)
    }

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

            {active && <div style={{width: 400, height: 400, backgroundColor: "red"}}></div>}
        
        </div>

    )
}

export default CanalRendering