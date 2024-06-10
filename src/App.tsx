import React from "react";
import NavigationBar from "./components/NavigationBar";
import "./styles/App.scss";
import Plan from "./class/Plan";
import { TripObject } from "./types/trip";
import Contents from "./components/Contents";
import Destination from "./class/Destination";

function App() {
  const now = new Date();
  now.setHours(0, 0, 0);
  const planData: Plan[] = [new Plan(now, null, [
    new Destination("Lyon, 69100", [45.75, 4.85], null, now, 0, null),
  ]), new Plan(new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000)), null, [
    new Destination("Marceille, 80 rue de la république, 59100", [51.505, -0.09], null, now, 3, null),
    new Destination("Nice, 33 rue de la république, 34100", [43.7, 7.25], null, now, 0, null),
  ]), new Plan(new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000)), new Date(now.getTime() + (6 * 24 * 60 * 60 * 1000)), [
    new Destination("Paris, 21 avenue des champs elysées, 75000", [48.85, 2.35], null, now, 1, "Say hi to the Eiffel Tower!"),
  ]), new Plan(new Date(now.getTime() + (8 * 24 * 60 * 60 * 1000)), new Date(now.getTime() + (9 * 24 * 60 * 60 * 1000)), [
    new Destination("Paris2, 21 avenue des champs elysées, 75000", [51.505, -0.09], null, now, 1, "This is a note!"),
  ])
  ];

  const trips: TripObject[] = [{
    label: "Trip to Paris!",
    plans: planData,
  }];

  return (
    <div className="App">
      <NavigationBar />
      <Contents trip={trips[0]} />
    </div>
  );
}

export default App;
