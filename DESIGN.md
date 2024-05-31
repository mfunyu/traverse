# [Design Document]: Traverse (road trip planning App

## 🗺️ Overview
This document outlines the design and implementation details for the Road Trip Planning App. The app allows users to create and manage an itinerary for their road trips, visualizing the route on a map and storing the data locally.

## ⭐️ Goals
- Develop a user-friendly / intuitive interface for planning road trips.
- Create a extendable program enabling to add features.
- Responsive design for both PC / smartphone users.

## Features
### Plan your trip
  | Feature            | Attribute Name    | Required/Optional | Default Value | Description                                          |
  |--------------------|-------------------|-------------------|---------------|------------------------------------------------------|
  | Add Destination    | Destination       | Required          | -             | The name of the destination.                         |
  |                    | Name              | Optional          | ${Destination} | The name of the destination.                         |
  |                    | Arrival Date      | Optional          | None          | The date of arrival at the destination.              |
  |                    | Number of Days    | Optional          | 1             | The number of days to stay at the destination.       |
  |                    | Notes             | Optional          | empty         | Additional notes or comments about the destination.  |

### View your trip (list)
> display planned trip
- Remove destinations : delete selected destinations
  - press [x] to remove
- Edit destinations : modify attributes of a destination (cannot modify destination itself)
  - open popup to edit
- Reorder destinations : change order of destinations on the list

### View your trip (map)


## References

### Websites

| Website            | URL                                          | Details                                                                                                         |
|--------------------|----------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| Roadtrippers       | [Roadtrippers](https://roadtrippers.com/)    | ![Screenshot_from_2024-05-30_11-15-41](/uploads/35c98fddb4335058f51b374c2ff0605f/Screenshot_from_2024-05-30_11-15-41.png) ![Screenshot_from_2024-05-30_12-45-15](/uploads/88161464c828b2577cb9aff6ccd47960/Screenshot_from_2024-05-30_12-45-15.png) |
| Google My Maps     | [Google My Maps](https://www.google.com/mymaps) | ![Screenshot_from_2024-05-30_11-17-20](/uploads/34b64bf8b89c6aee8c9632ae991fbdda/Screenshot_from_2024-05-30_11-17-20.png)   |
| Furkot             | [Furkot](https://trips.furkot.com/)          | ![Screenshot_from_2024-05-30_11-12-51](/uploads/54f233f29e3e5e52c46457f9b1d35947/Screenshot_from_2024-05-30_11-12-51.png) |
| MyScenicDrives     | [MyScenicDrives](https://www.myscenicdrives.com/) | ![Screenshot_from_2024-05-30_11-05-34](/uploads/0e721c16580e87699f4d5980f45e3a91/Screenshot_from_2024-05-30_11-05-34.png) |
| Travelmath         | [Travelmath](https://www.travelmath.com/)    | Cannot add multiple destinations |


## Roadmap

| Day    | Task                                          | Details                                                                                                     |
|--------|-----------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| 1  | Project Setup                                | Create a plan, Initialize project, Install necessary dependencies, Set up GitLab repository. |
| 2  | Add Destination Form                         | Implement the `AddDestinationForm` component. Set up state management for storing destinations.                |
| 3  | Itinerary Display                            | Create the `Itinerary` component to display the list of destinations. Learn & integrate Leaflet.js for map visualization. |
| 4  | Modification and Deletion                    | Implement functionality to edit and delete destinations. Use modals for editing destinations.                    |
| 5  | Local Storage                                | Add functionality to save and load the itinerary from Local Storage.                                            |
| 6  | Styling and Responsiveness                   | Learn Saas, Apply CSS styles to make the app visually appealing and responsive.                                              |
| (7) | BONUS features                                | Integrate API / shareable link for itinerary                                               |
| (8) | Testing                                       | Write unit tests for key components. Test functionality and responsiveness across different devices.            |
| 9  | Bug Fixes and Documentation                   | Address any bugs or issues identified during testing. Prepare the README file and create a demo video or screenshots. |
| 10 | Final Review and Submission                  | Review the project to ensure all requirements are met. Submit the project by the deadline.                        |
