import { useEffect } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import { useMap } from "react-leaflet";
import * as L from "leaflet";

const SearchField = () => {
  const provider = new OpenStreetMapProvider();

  const options = {
    notFoundMessage: "No results found",
    provider: provider,
    style: "bar",
    showPopup: true,
  };

  const searchControl = new GeoSearchControl(options);

  const map = useMap();

  useEffect(() => {
    map.addControl(searchControl as L.Control);
    return () => {
      map.removeControl(searchControl as L.Control);
    };
  }, [map, searchControl]);

  return null;
};

export default SearchField;
