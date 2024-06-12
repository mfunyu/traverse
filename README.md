[README (en)](README.md) • [Subject (fr)](SUBJECT.md) • [Design Doc (en)](DESIGN.md)

[![wakatime](https://wakatime.com/badge/user/08071e9d-f227-4ac4-acb0-e78a5829cf60/project/dc98b7d5-070f-4fa5-a9d5-acb8be66c640.svg)](https://wakatime.com/badge/user/08071e9d-f227-4ac4-acb0-e78a5829cf60/project/dc98b7d5-070f-4fa5-a9d5-acb8be66c640)

# ⛰️Traverse: road trip planner
Traverse is a web application that allows users to plan their road trips. <br/>
By discovering and selecting destinations, setting arrival dates, and deciding on the length of stay, users can craft their own personalized journeys. <br/>
They can seamlessly edit or remove stops, and the itinerary is beautifully organized with an interactive map view, providing an enhanced visual experience.

## 🚀 Deployed Project

**Check out the deployed project here: [Traverse -Road Trip Planner-](https://road-trip-app-mfunyu-38981952388dc62e79f35638ccdb213b3c3fd12231.gitlab.io/)**

![Demo Video](Traverse.mp4)

## How to use
1. **Example Destinations**: Example destinations are shown, and you can clear them using the clear button at the top left.
2. **Search Destinations**: Search for your destination using the search bar.
3. **Add Destinations**: Add the destination to your trip by specifying the arrival date. You can also add additional information as desired.
4. **Modify Destinations**: Modify your trip by clicking on a destination, making the necessary changes, and clicking save to apply the updates.
5. **Delete Destinations**: To delete a destination, click the delete button in the modification window or select "remove from route" in the map popup.

## Installation

### Prerequisites
- [Docker](https://www.docker.com/)

### Steps
1. Clone the repository:
   ```bash
   git clone https://gitlab.com/mfunyu/traverse.git
   ```

2. Start the docker container:
   ```
   make
   ```

3. Access from a browser: https://localhost:3000

## Technos

### Basics

- **React**: [React Documentation](https://react.dev/reference/react)
- **TypeScript**: [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- **HTML**: [HTML Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML)
- **CSS (Sass)**: [Sass Documentation](https://sass-lang.com/documentation)
- **Docker**: [Docker Documentation](https://docs.docker.com/)

### Additional Libraries

| Technology                | Description                                                                                 | Documentation Link                                 |
|---------------------------|---------------------------------------------------------------------------------------------|---------------------------------------------------|
| **React-Leaflet**         | A React wrapper for Leaflet, a JavaScript library for interactive maps.                     | [React-Leaflet Documentation](https://react-leaflet.js.org/)  |
| **Leaflet-Geosearch**     | A geocoding library for Leaflet, allowing for location searches and display on maps.         | [Leaflet-Geosearch Documentation](https://github.com/smeijer/leaflet-geosearch) |
| **Leaflet-Routing-Machine** | A routing library for Leaflet, providing a way to draw routes on a map and control them easily.      | [Leaflet Routing Machine Documentation](http://www.liedman.net/leaflet-routing-machine/) |
| **Leaflet-Active-Area**   | A Leaflet plugin that defines the active area of the map, where layers are displayed and interactive. | [Leaflet-Active-Area Documentation](https://github.com/Mappy/Leaflet-active-area) |
| **UUID**                  | A library for generating unique identifiers (UUIDs) in JavaScript.                          | [UUID Documentation](https://github.com/uuidjs/uuid) |


