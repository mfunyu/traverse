import { useEffect } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import { useMap } from "react-leaflet";

const SearchField = () => {
  const provider = new OpenStreetMapProvider();

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    notFoundMessage: "Sorry, that address could not be found.",
    provider: provider,
    // style: "bar",
  });

  const map = useMap();
  // @ts-ignore
  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  return null;
};

export default SearchField;