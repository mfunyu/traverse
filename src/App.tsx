import React from "react";
import NavigationBar from "./components/NavigationBar";
import "./styles/App.scss";
import { PlanObject } from "./types/plan";
import { TripObject } from "./types/trip";
import { PlanController } from "./class/PlanController";
import Contents from "./components/Contents";

function App() {
  const planData: PlanObject[] = [{
    date: new Date(),
    endDate: null,
    destinations: [{
      label: "Lyon",
      latLang: [45.75, 4.85],
      address: "69100",
      customLabel: null,
      arrivalDate: new Date(),
      lengthOfStay: 0,
      notes: null,
    }]
  },
  {
    date: new Date(new Date().getTime() + (3 * 24 * 60 * 60 * 1000)),
    endDate: null,
    destinations: [{
      label: "Marceille",
      latLang: [51.505, -0.09],
      address: "80 rue de la république, 59100",
      customLabel: null,
      arrivalDate: new Date(),
      lengthOfStay: 3,
      notes: null,
    },
    {
      label: "Nice",
      latLang: [43.7, 7.25],
      address: "33 rue de la république, 34100",
      customLabel: null,
      arrivalDate: new Date(),
      lengthOfStay: 0,
      notes: null,
    }]
  },
  {
    date: new Date(new Date().getTime() + (3 * 24 * 60 * 60 * 1000)),
    endDate: new Date(new Date().getTime() + (6 * 24 * 60 * 60 * 1000)),
    destinations: [{
      label: "Paris",
      latLang: [48.85, 2.35],
      address: "21 avenue des champs elysées, 75000",
      customLabel: null,
      arrivalDate: new Date(),
      lengthOfStay: 1,
      notes: "This is a note",
    }]
  },
  {
    date: new Date(new Date().getTime() + (8 * 24 * 60 * 60 * 1000)),
    endDate: new Date(new Date().getTime() + (9 * 24 * 60 * 60 * 1000)),
    destinations: [{
      label: "Paris2",
      latLang: [51.505, -0.09],
      address: "21 avenue des champs elysées, 75000",
      customLabel: null,
      arrivalDate: new Date(),
      lengthOfStay: 1,
      notes: "This is a note",
    }]
  }];

  const trips: TripObject[] = [{
    label: "Trip to Paris!",
    planController: new PlanController(planData),
  }];

  return (
    <div className="App">
      <NavigationBar />
      <Contents trip={trips[0]} />
    </div>
  );
}

export default App;
