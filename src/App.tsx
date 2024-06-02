import React from "react";
import "./styles/App.css";
import NavigationBar from "./components/NavigationBar";
import Planner from "./components/Planner";
import "./styles/Color.css";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Planner />
    </div>
  );
}

export default App;
