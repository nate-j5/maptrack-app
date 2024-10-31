"use strict";
"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import Map from "react-map-gl";
import ControlPanel from "../components/ControlPanel";
import Layout from "../components/Layout";
import { initMixpanel, trackEvent } from "../lib/mixpanelService";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const initialViewState = {
  latitude: 32.7157,
  longitude: -117.1611,
  zoom: 11,
  bearing: 0,
  pitch: 0,
};

export default function HomePage() {
  const mapRef = useRef(null);
  const [currentCity, setCurrentCity] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [currentCityData, setCurrentCityData] = useState(null);

  const onSelectCity = useCallback((selectedCity) => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [selectedCity.longitude, selectedCity.latitude],
        duration: 2000,
      });
      setCurrentCity({
        longitude: selectedCity.longitude,
        latitude: selectedCity.latitude,
      });
      setCityName(selectedCity.city);
      setCurrentCityData(selectedCity);
    }
  }, []);

  useEffect(() => {
    if (!MAPBOX_TOKEN) {
      console.error("Mapbox token is missing");
      return;
    }

    initMixpanel();

    // Track the page view event
    trackEvent("Page Viewed", { page: "HomePage" });
  }, []);

  return (
    <Layout linkText="View Analytics">
      <div className="flex flex-col h-screen relative bg-red-50">
        <div className="z-10">
          <ControlPanel
            onSelectCity={onSelectCity}
            selectedCity={{ city: cityName }}
          />
        </div>
        <div className="flex-grow">
          <Map
            ref={mapRef}
            initialViewState={initialViewState}
            mapStyle="mapbox://styles/mapbox/dark-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
            className="w-full h-full"
          />
        </div>
      </div>
    </Layout>
  );
}
