import { useState } from "react"

interface Props {
    boolRef: React.MutableRefObject<boolean>
    label: string
}

const Toggler = ({boolRef, label}: Props) => {

    const [state, setState] = useState(boolRef.current)
    const handleToggle = () => {
        boolRef.current = !boolRef.current
        setState(!state)
    }

    return (
        <div className="form-check form-switch"
             style={{display: "flex", flexDirection: "row", height: "2vh", alignItems: "center", justifyContent: "center"}}>
            <input
                className="form-check-input"
                type="checkbox"
                checked={boolRef.current}
                onChange={handleToggle}
            />
            <div style={{width: "0.5vw"}}/>
            <div style={{fontSize: "2vh"}}>{label}</div>
        </div>
    )
}

export default Toggler