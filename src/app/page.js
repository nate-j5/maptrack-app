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
  const [cityName, setCityName] = useState("");

  const onSelectCity = useCallback((selectedCity) => {
    mapRef.current?.flyTo({
      center: [selectedCity.longitude, selectedCity.latitude],
      duration: 2000,
    });
    setCurrentCity({
      longitude: selectedCity.longitude,
      latitude: selectedCity.latitude,
    });
    setCityName(selectedCity.city);
  }, []);

  useEffect(() => {
    // Initialize Mixpanel
    initMixpanel();

    // Track the page view event
    trackEvent("Page Viewed", { page: "HomePage" });
  }, []); // Empty dependency array means this runs once on component mount

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
