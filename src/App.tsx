import React from "react";
import NavigationBar from "./components/NavigationBar";
import Planner from "./components/Planner";
import "./styles/App.scss";
import Map from "./components/Map";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Planner />
      <Map />
    </div>
  );
}

export default App;
