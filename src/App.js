import { useState } from "react";
import "./App.css";
import Map from "./components/Map";

function App() {
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="App">
      <h1> Crime Density </h1>
      <button onClick={() => setIsShow(!isShow)}>
        Click to {isShow ? "Close" : "Open"} the Map
      </button>
      <div>{isShow && <Map />}</div>
    </div>
  );
}

export default App;
