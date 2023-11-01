import React from 'react';
import { useState } from 'react';
import saveAction from '../action/index';
import { dd2dms, format } from 'latlng-conv';
import GoogleMapReact from 'google-map-react';
import Marker from '../components/Maker';

const Home = () => {
  const defaultCoord = {
    center: {
      lat: 27.964157,
      long: -82.452606,
    },
    zoom: 10,
  };

  //Default Position Tampa Bay, Florida
  const defaultPosition = {
    lat: 27.964157,
    long: -82.452606,
  };

  const [latitude, setLatitude] = useState(defaultPosition.lat);
  const [longitude, setLongitude] = useState(defaultPosition.long);
  const [dmslatitude, setDmslatitude] = useState('0');
  const [dmslongitude, setDmslongitude] = useState('0');
  const [showMarker, setShowMarker] = useState(false);

  const convertDMS = (lati, longi) => {
    const dmsLati = dd2dms(lati);
    const dmsLongi = dd2dms(longi);

    const dmsCoord = {
      dms_lat: format({
        degrees: dmsLati.degrees,
        minutes: dmsLati.minutes,
        seconds: dmsLati.seconds,
      }),
      dms_lang: format({
        degrees: dmsLongi.degrees,
        minutes: dmsLongi.minutes,
        seconds: dmsLongi.seconds,
      }),
    };

    return dmsCoord;
  };

  const handleConvert = () => {
    const convertCoord = convertDMS(latitude, longitude);
    setDmslatitude(convertCoord.dms_lat);
    setDmslongitude(convertCoord.dms_lang);
  };

  const handleSave = () => {
    const data = {
      latitude: latitude,
      longitude: longitude,
      dmslatitude: dmslatitude,
      dmslongitude: dmslongitude,
    };
    saveAction(data);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <div className="flex flex-col gap-3 w-full max-w-lg">
          <label>
            <p className=" text-black">Latitude</p>
          </label>
          <input
            type="number"
            onChange={(e: any) => setLatitude(e.target.value)}
            value={latitude}
            className=" bg-gray-100 border text-black border-blue-400 focus:ring-blue-500 p-2 rounded-md"
            name="latitude"
          ></input>

          <p className="text-gray-900 font-bold">DMS Latitude: {dmslatitude}</p>

          <label className=" mt-2">
            <p className=" text-black">Longitude</p>
          </label>
          <input
            type="number"
            onChange={(e: any) => setLongitude(e.target.value)}
            value={longitude}
            className="bg-gray-100 border text-black border-blue-400 focus:ring-blue-500 p-2 rounded-md"
            name="latitude"
          ></input>
          <p className=" text-gray-900 font-bold">DMS Longitude: {dmslongitude}</p>

          <button onClick={handleConvert} className=" bg-blue-500 ">
            Convert Coords
          </button>
          <button onClick={handleSave} className=" bg-blue-500">
            Save
          </button>
          <button
            value={showMarker ? 'Hide' : 'Show'}
            onClick={() => {
              setShowMarker(!showMarker);
            }}
            className=" bg-blue-500 is-fullwidth block"
          >
            Show
          </button>
          <div style={{ height: '500px', width: '100%' }}>
          <GoogleMapReact
            height="500px"
            defaultCenter={{ lat: defaultPosition.lat, lng: defaultPosition.long }}
            defaultZoom={defaultCoord.zoom}
          >
            {showMarker ? <Marker lat={latitude} lng={longitude} /> : <></>}
          </GoogleMapReact>
        </div>
        </div>
        
      </div>
    </>
  );
};

export default Home;
