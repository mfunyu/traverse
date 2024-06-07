import { useEffect } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import { useMap } from "react-leaflet";
import * as L from "leaflet";

const SearchField = () => {
  console.log("SearchField");
  const provider = new OpenStreetMapProvider();

  const options = {
    notFoundMessage: "No results found",
    provider: provider,
    style: "bar",
    showPopup: true,
    popupFormat: ({ result }: { result: any }) =>
      `<div class="custom-popup-item">
        <div class="text">
          <h3>${result.label}</h3>
          <p>${result.label}</p>
        <div>
        <button onclick="addLocation(${result.x}, ${result.y})">+ Add to route</button>
      </div>`,
  };

  const searchControl = new GeoSearchControl(options);

  const map = useMap();

  useEffect(() => {
    map.addControl(searchControl as L.Control);

    // Add event listener for search results
    map.on("geosearch/showlocation", (result) => {
      console.log("Search result:", result);
      // process the result here, e.g., update state, show a custom popup, etc.
    });

    (window as any).addLocation = (x: number, y: number) => {
      alert(`Location added: ${x}, ${y}`);
      // Add your custom logic here to handle the location addition
    };

    return () => {
      map.removeControl(searchControl as L.Control);
      // Remove event listener when component unmounts
      map.off("geosearch/showlocation");
    };
  }, [map, searchControl]);

  return null;
};

export default SearchField;
