import axios from "axios";
import { useState } from "react";
import Map, { Marker } from "react-map-gl";
import pin from "../../assets/pin.png";

const CreateLandfill = () => {
  const [latitude, setLatitude] = useState(23.809591);
  const [longitude, setLongitude] = useState(90.367447);

  const _onClickMap = (map, evt) => {
    setLatitude(map.lngLat.lat);
    setLongitude(map.lngLat.lng);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = {
      capacity: Number(data.get("capacity")),
      latitude: Number(latitude),
      longitude: Number(longitude),
    };
    try {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/landfills`, payload, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 201) {
            alert("Landfill created successfully");
          }
        })
        .catch((error) => alert(error.response.data.errors));
    } catch (error) {
      console.log(error);
    }
    e.target.reset();
  };

  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Create Landfill
      </h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="landfillCapacity"
          >
            Landfill Capacity
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="landfillCapacity"
            type="number"
            placeholder="in tons"
            name="capacity"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="landfillLocation"
          >
            STS Location
          </label>
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="landfillLocation"
            type="number"
            value={latitude}
            placeholder="Latitude"
            name="latitude"
            required
          />
          <div className="mb-4" />
          <input
            className="shadow-md shadow-gray-300 appearance-none border border-gray-300 rounded w-full py-2 px-3 number-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            value={longitude}
            placeholder="Longitude"
            name="logitude"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Landfill
          </button>
        </div>
        <div>
          <Map
            mapboxAccessToken="pk.eyJ1IjoicG9uaXJtYWhtdWQiLCJhIjoiY2x3MWpmZDJoMGN3bjJxb2NqcDVsYXFybiJ9.xt-bUTSAGKRRPdD4AtIhjw"
            initialViewState={{
              longitude,
              latitude,
              zoom: 14,
            }}
            onClick={_onClickMap}
            style={{ width: 510, height: 400 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Marker
              longitude={longitude}
              latitude={latitude}
              offset={[250, -400]}
            >
              <img src={pin} />
            </Marker>
          </Map>
        </div>
      </form>
    </div>
  );
};

export default CreateLandfill;
