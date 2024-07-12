import CanalRendering from "./CanalRendering"

const GraphicsWindow = () => {



    return (
        <>
            <div style={{display: "flex", flexDirection: "column"}}>

                <div style={{display: "flex", flexDirection: "row"}}>
                    <CanalRendering canal="posterior"/>
                    <div style={{width: 10}}/>
                    <CanalRendering canal="anterior"/>
                </div>

                <div style={{height: 10}}/>

                <div style={{display: "flex", flexDirection: "row"}}>
                    <CanalRendering canal="lateral"/>
                    <div style={{width: 10}}/>
                    <CanalRendering canal="all"/>
                </div>

            </div>
        
        </>

    )
}

export default GraphicsWindow