import "./styles/App.scss";
import Plan from "./class/Plan";
import { TripObject } from "./types/trip";
import Contents from "./components/Contents";
import Destination from "./class/Destination";
import Plans from "./class/Plans";
import { calcNdaysFromDate } from "./utils/dateUtils";
import Joyride, { Step } from "react-joyride";

const initExampleData = () => {
  const now = new Date();
  now.setHours(0, 0, 0);
  const exampleData: Plan[] = [
    new Plan(now, null, [
      new Destination("Lyon Part-Dieu, 5 Pl. Charles Béraudier, 69003 Lyon", [45.75, 4.85], null, now, 0, "les amis arrive à 10h"),
    ]),
    new Plan(calcNdaysFromDate(now, 1), calcNdaysFromDate(now, 2), [
      new Destination("Genève, Suisse", [46.2017559, 6.1466014], null, calcNdaysFromDate(now, 1), 1, null),
    ]),
    new Plan(calcNdaysFromDate(now, 3), null, [
      new Destination("Marseille, Provence-Alpes-Côte d'Azur, 13000, France",
        [43.2961743, 5.3699525], null, calcNdaysFromDate(now, 3), 0, null
      ),
      new Destination("Nice, Alpes-Maritimes, Provence-Alpes-Côte d'Azur, France",
        [43.7009358, 7.2683912], null, calcNdaysFromDate(now, 3), 0, null
      ),
    ]),
    new Plan(calcNdaysFromDate(now, 4), calcNdaysFromDate(now, 7), [
      new Destination("Paris, 21 avenue des champs elysées, 75000",
        [48.8588897, 2.3200410217200766], null, calcNdaysFromDate(now, 4), 3, "Say hi to the Eiffel Tower!"),
    ]),
    new Plan(calcNdaysFromDate(now, 9), null, [
      new Destination("Vieux Lyon, Lyon 5e Arrondissement, Lyon, 69005, France",
        [45.7624951, 4.8268635], "la maison", calcNdaysFromDate(now, 9), 0, null
      ),
    ])
  ];
  return exampleData;
};

function App() {
  const trips: TripObject[] = [{
    label: "Trip",
    plans: new Plans(initExampleData()),
  }];

  const steps: Step[] = [
    {
      target: ".nav-buttons",
      content: "You can clear all example destinations by clicking here!",
    },
  ];

  return (
    <>
      <Joyride
        steps={steps}
        styles={{
          options: {
            primaryColor: "#507DBC",
          },
        }}
      />
      <div className="App">
        <Contents trip={trips[0]} />
      </div>
    </>
  );
}

export default App;
