import { loadModules } from "esri-loader";
import React, { useEffect, useRef } from "react";

function Map() {
  const mapRef = useRef(null);
  useEffect(() => {
    let view;
    const initializeMap = (mapRef) => {
      loadModules(
        ["esri/Map", "esri/views/MapView", "esri/layers/GeoJSONLayer"],
        {
          css: true,
        }
      ).then(([Map, MapView, GeoJSONLayer]) => {
        const map = new Map({ basemap: "topo-vector" });
        const template = {
          title: "Crime Info - Arrest Charge: {arrest_charge}",
          content: "  Crime category: {offense_description} at {address}",
        };
        const renderer = {
          type: "simple",
          field: "arrest_charge",
          symbol: {
            type: "simple-marker",
            color: "rgb(60, 179, 113))",
            outline: {
              color: "white",
            },
          },
          visualVariables: [
            {
              type: "size",
              field: "arrest_charge",
              stops: [
                {
                  value: 52003,
                  size: "40px",
                },
                {
                  value: 24001,
                  size: "0px",
                },
                {
                  value: 38001,
                  size: "15px",
                },
              ],
            },
          ],
        };

        view = new MapView({
          map: map,
          zoom: 12,
          container: mapRef.current,
          center: [-83.09854523, 42.384534],
        });
        const layer = new GeoJSONLayer({
          url: "https://raw.githubusercontent.com/adarshvarma15/mygeojson/main/RMS_Crime_Incidents%20edited.geojson",
          renderer: renderer,
          popupTemplate: template,
        });
        map.add(layer);
      });
    };
    initializeMap(mapRef);
    return () => view?.destroy();
  }, []);
  return <div className="map-view" style={{ height: "600px" }} ref={mapRef} />;
}
export default Map;
