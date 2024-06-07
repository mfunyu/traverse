import { useEffect } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import { useMap } from "react-leaflet";
import { SearchResult } from "leaflet-geosearch/dist/providers/provider";

function SearchField ({ onAddLocation }: { onAddLocation: (x: number, y: number, label: string) => void }){
  console.log("SearchField");
  const provider = new OpenStreetMapProvider();

  const options = {
    notFoundMessage: "No results found",
    provider: provider,
    style: "bar",
    showPopup: true,
    popupFormat: ({ result }: { result: SearchResult }) =>
      `<div class="custom-popup-item">
        <div class="text">
          <h3>${result.label}</h3>
        <div>
        <button onclick="addLocation(${result.x}, ${result.y}, '${result.label}')">+ Add to route</button>
      </div>`,
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
