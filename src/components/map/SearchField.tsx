import { useEffect, useState } from "react";
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

type SearchFieldProps = {
  onAddLocation: (x: number, y: number, label: string) => void;
};

function SearchField ({ onAddLocation }: SearchFieldProps) {
  const provider = new OpenStreetMapProvider();
  const [marker, setMarker] = useState<L.Marker | null>(null);

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

    // Add an event listener for when a location is shown
    // eslint-disable-next-line
    map.on("geosearch/showlocation", (e: any) => {
      // If there is an existing marker, remove it
      if (marker && map) {
        map.removeLayer(marker);
      }
      // Set the new marker
      const newMarker = e.marker;
      setMarker(newMarker);
    });

    window.addLocation = (x: number, y: number, label:string) => {
      onAddLocation(x, y, label);
      // Remove the marker placed by GeoSearch
      if (marker && map) {
        map.removeLayer(marker);
        setMarker(null);
      }
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
