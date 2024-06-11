import React from "react";
import NavigationBar from "./components/NavigationBar";
import "./styles/App.scss";
import Plan from "./class/Plan";
import { TripObject } from "./types/trip";
import Contents from "./components/Contents";
import Destination from "./class/Destination";
import Plans from "./class/Plans";
import { calcNdaysFromDate } from "./utils/dateUtils";

function App() {
  const now = new Date();
  now.setHours(0, 0, 0);
  const planData: Plan[] = [new Plan(now, null, [
    new Destination("Lyon, 69100", [45.75, 4.85], null, now, 0, null),
  ]), new Plan(calcNdaysFromDate(now, 3), null, [
    new Destination("Marceille, 80 rue de la république, 59100", [51.505, -0.09], null, calcNdaysFromDate(now, 3), 0, null),
    new Destination("Nice, 33 rue de la république, 34100", [43.7, 7.25], null, calcNdaysFromDate(now, 3), 0, null),
  ]), new Plan(calcNdaysFromDate(now, 3), calcNdaysFromDate(now, 6), [
    new Destination("Paris, 21 avenue des champs elysées, 75000", [48.85, 2.35], null, calcNdaysFromDate(now, 3), 3, "Say hi to the Eiffel Tower!"),
  ]), new Plan(calcNdaysFromDate(now, 8), calcNdaysFromDate(now, 9), [
    new Destination("Paris2, 21 avenue des champs elysées, 75000", [51.505, -0.09], null, calcNdaysFromDate(now, 8), 1, "This is a note!"),
  ])
  ];

  const trips: TripObject[] = [{
    label: "Trip to Paris!",
    plans: new Plans(planData),
  }];

  return (
    <div className="App">
      <Contents trip={trips[0]} />
    </div>
  );
}

export default App;
