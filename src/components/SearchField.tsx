import { useEffect } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import { useMap } from "react-leaflet";
import { SearchResult } from "leaflet-geosearch/dist/providers/provider";

const escapeHTML = (str: string) => {
  return str.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

function SearchField ({ onAddLocation }: { onAddLocation: (x: number, y: number, label: string) => void }){
  console.log("SearchField");
  const provider = new OpenStreetMapProvider();

  const options = {
    notFoundMessage: "No results found",
    provider: provider,
    style: "bar",
    showPopup: true,
    popupFormat: ({ result }: { result: SearchResult }) => {
      const escapedLabel = escapeHTML(result.label);
      const [mainLabel] = escapedLabel.split(",");

      return (`<div class="custom-popup-item">
        <div class="text">
          <h3>${mainLabel}</h3>
          <p>${escapedLabel}</p>
        <div>
        <button onclick='addLocation(${result.x}, ${result.y}, "${escapedLabel}")'>+ Add to route</button>
      </div>`);
    },
  };

  const searchControl = new GeoSearchControl(options);

  const map = useMap();

  useEffect(() => {
    map.addControl(searchControl as L.Control);

    window.addLocation = (x: number, y: number, label:string) => {
      onAddLocation(x, y, label);
    };

    return () => {
      map.removeControl(searchControl as L.Control);
      // Remove event listener when component unmounts
      map.off("geosearch/showlocation");
    };
  }, [map, searchControl]);

  return null;
}

export default SearchField;
