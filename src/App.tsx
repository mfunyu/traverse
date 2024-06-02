import React from "react";
import NavigationBar from "./components/NavigationBar";
import Planner from "./components/Planner";
import "./styles/App.scss";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Planner />
    </div>
  );
}

export default App;
