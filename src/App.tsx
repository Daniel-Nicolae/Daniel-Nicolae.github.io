import './App.css';
import CameraWindow from "./components/CameraWindow"

function App() {





  return (
    <>
      <div style={{height: 10}}/>
      <div style={{display: "flex", flexDirection: "row"}}>

        <div style={{width: "50%"}}>
        </div>

        <div style={{width: "50%"}}>
          <CameraWindow/>
        </div>

      </div>
    </>
  );
}

export default App;
