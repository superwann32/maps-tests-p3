import "./App.css";
import Map from "./Map";
import { geojsonData } from "../geojsonData";

function App() {
  return (
    <>
      <Map geojsonData={geojsonData} />
    </>
  );
}

export default App;
