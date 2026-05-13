import { useState } from "react";
import PageLayout from "./PageLayout";
import { CloudSun, Wind, Droplets, MapPin } from "lucide-react";

const WeatherPage = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
const [error, setError] = useState("");

  const API_KEY = "1b77719f0a16cce94ba115bdb37408bc";

  const getWeather = async () => {
  if (!city) return;

  try {
    setError("");

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();

    if (data.cod === 200) {
      setWeather(data);
    } else {
      setError("City not found or API key issue");
    }

  } catch (error) {
    setError("Something went wrong");
  }
};
  return (
    <PageLayout title="Weather">
    

      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-green-800">
          Weather Forecast
        </h1>

        <p className="mt-4 text-gray-700 text-lg">
          Get real-time weather updates for smart farming
        </p>
      </div>

      {/* SEARCH */}
      <div className="max-w-2xl mx-auto mt-10 flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 px-5 py-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
        />

        <button
          onClick={getWeather}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg"
        >
          Search
        </button>
      </div>
      {error && (
  <p className="text-center text-red-600 mt-6 text-lg font-semibold">
    {error}
  </p>
)}

      {/* WEATHER CARD */}
      {weather && weather.main && (
        <div className="max-w-4xl mx-auto mt-12 bg-white rounded-3xl shadow-2xl p-8">

          <div className="flex flex-col md:flex-row justify-between items-center gap-10">

            {/* LEFT */}
            <div>
              <div className="flex items-center gap-3">
                <MapPin className="text-green-700" />

                <h2 className="text-3xl font-bold text-green-800">
                  {weather.name}
                </h2>
              </div>

              <h1 className="text-7xl font-bold mt-6 text-gray-800">
                {Math.round(weather.main.temp)}°C
              </h1>

              <p className="mt-4 text-2xl text-gray-600 capitalize">
                {weather.weather[0].description}
              </p>
            </div>

            {/* RIGHT */}
            <div className="grid grid-cols-1 gap-6 w-full md:w-auto">

              <div className="bg-green-50 p-5 rounded-2xl flex items-center gap-4 shadow">

                <CloudSun className="text-yellow-500" size={40} />

                <div>
                  <p className="text-gray-500">
                    Feels Like
                  </p>

                  <h3 className="text-2xl font-bold">
                    {Math.round(weather.main.feels_like)}°C
                  </h3>
                </div>
              </div>

              <div className="bg-green-50 p-5 rounded-2xl flex items-center gap-4 shadow">

                <Droplets className="text-blue-500" size={40} />

                <div>
                  <p className="text-gray-500">
                    Humidity
                  </p>

                  <h3 className="text-2xl font-bold">
                    {weather.main.humidity}%
                  </h3>
                </div>
              </div>

              <div className="bg-green-50 p-5 rounded-2xl flex items-center gap-4 shadow">

                <Wind className="text-gray-600" size={40} />

                <div>
                  <p className="text-gray-500">
                    Wind Speed
                  </p>

                  <h3 className="text-2xl font-bold">
                    {weather.wind.speed} km/h
                  </h3>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    
    </PageLayout>
  );
};

export default WeatherPage;