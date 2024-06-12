[README (en)](README.md) • [Subject (fr)](SUBJECT.md) • [Design Doc (en)](DESIGN.md)

# Traverse: road trip planner

## Overview
Traverse is a web application that allows users to plan their road trips. By adding destinations, specifying arrival dates, and setting the number of days to stay user can plan their own trip. Users can also modify or delete destinations, and the itinerary is displayed in an organized manner with a map view for better visualization.

## Features
- **Add Destination**: Users can add new destinations with details like name, arrival date, number of days to stay, and notes.
- **Edit Destination**: Users can modify details of existing destinations using a modal dialog.
- **Delete Destination**: Users can remove destinations from the itinerary.
- **Display Itinerary**: The list of destinations is displayed in the order of travel with corresponding dates.
- **Map Visualization**: The itinerary is visualized on a map using Leaflet.js.
- **Local Storage**: The itinerary is saved in local storage to persist data between sessions.
- **Responsive Design**: The application is styled to be responsive and user-friendly on various devices.

## Installation

### Prerequisites
- [Docker](https://www.docker.com/)

### Steps
1. Clone the repository:
   ```bash
   git clone https://gitlab.com/mfunyu/traverse.git
   ```

2. Start docker container:
   ```
   make
   ```

3. Connect from a browser
   https://localhost:3000

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


