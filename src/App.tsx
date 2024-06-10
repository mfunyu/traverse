import React from "react";
import NavigationBar from "./components/NavigationBar";
import "./styles/App.scss";
import { PlanObject } from "./types/plan";
import { TripObject } from "./types/trip";
import Contents from "./components/Contents";

function App() {
  const now = new Date();
  now.setHours(0, 0, 0);
  const planData: PlanObject[] = [{
    date: now,
    endDate: null,
    destinations: [{
      label: "Lyon",
      latLng: [45.75, 4.85],
      address: "69100",
      customLabel: null,
      arrivalDate: now,
      lengthOfStay: 0,
      notes: null,
    }]
  },
  {
    date: new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000)),
    endDate: null,
    destinations: [{
      label: "Marceille",
      latLng: [51.505, -0.09],
      address: "80 rue de la république, 59100",
      customLabel: null,
      arrivalDate: now,
      lengthOfStay: 3,
      notes: null,
    },
    {
      label: "Nice",
      latLng: [43.7, 7.25],
      address: "33 rue de la république, 34100",
      customLabel: null,
      arrivalDate: now,
      lengthOfStay: 0,
      notes: null,
    }]
  },
  {
    date: new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000)),
    endDate: new Date(now.getTime() + (6 * 24 * 60 * 60 * 1000)),
    destinations: [{
      label: "Paris",
      latLng: [48.85, 2.35],
      address: "21 avenue des champs elysées, 75000",
      customLabel: null,
      arrivalDate: now,
      lengthOfStay: 1,
      notes: "This is a note",
    }]
  },
  {
    date: new Date(now.getTime() + (8 * 24 * 60 * 60 * 1000)),
    endDate: new Date(now.getTime() + (9 * 24 * 60 * 60 * 1000)),
    destinations: [{
      label: "Paris2",
      latLng: [51.505, -0.09],
      address: "21 avenue des champs elysées, 75000",
      customLabel: null,
      arrivalDate: now,
      lengthOfStay: 1,
      notes: "This is a note",
    }]
  }];

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
