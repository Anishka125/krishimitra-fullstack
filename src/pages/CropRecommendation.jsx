import { useState } from "react";
import PageLayout from "./PageLayout";

import { Sprout, Thermometer, CloudRain, Leaf } from "lucide-react";

const CropRecommendation = () => {
  const [soil, setSoil] = useState("");
  const [season, setSeason] = useState("");
  const [temperature, setTemperature] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [result, setResult] = useState(null);

  const recommendCrop = (e) => {
    e.preventDefault();

    let crop = "Maize";
    let reason = "Maize is suitable for moderate temperature and rainfall.";

    if (soil === "clay" && season === "monsoon") {
      crop = "Rice";
      reason = "Rice grows best in clay soil with high rainfall during monsoon.";
    } else if (soil === "loamy" && season === "winter") {
      crop = "Wheat";
      reason = "Wheat grows well in loamy soil and cool winter conditions.";
    } else if (soil === "black" && season === "summer") {
      crop = "Cotton";
      reason = "Cotton is suitable for black soil and warm summer climate.";
    } else if (soil === "sandy" && season === "summer") {
      crop = "Groundnut";
      reason = "Groundnut grows well in sandy soil and warm weather.";
    } else if (Number(rainfall) > 150) {
      crop = "Rice";
      reason = "High rainfall conditions are suitable for rice cultivation.";
    } else if (Number(temperature) < 20) {
      crop = "Wheat";
      reason = "Cool temperature is suitable for wheat cultivation.";
    }

    setResult({ crop, reason });
  };

  return (
    <PageLayout title="Crop Recommendation">
    
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800">
            Crop Recommendation
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            Get smart crop suggestions based on soil, season, temperature and rainfall.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
          <form
            onSubmit={recommendCrop}
            className="bg-white rounded-3xl shadow-2xl p-8 space-y-6"
          >
            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                Soil Type
              </label>
              <select
                value={soil}
                onChange={(e) => setSoil(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select soil type</option>
                <option value="clay">Clay Soil</option>
                <option value="loamy">Loamy Soil</option>
                <option value="black">Black Soil</option>
                <option value="sandy">Sandy Soil</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                Season
              </label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select season</option>
                <option value="summer">Summer</option>
                <option value="monsoon">Monsoon</option>
                <option value="winter">Winter</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                Temperature °C
              </label>
              <input
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                placeholder="Example: 28"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                Rainfall mm
              </label>
              <input
                type="number"
                value={rainfall}
                onChange={(e) => setRainfall(e.target.value)}
                placeholder="Example: 180"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-semibold transition"
            >
              Recommend Crop
            </button>
          </form>

          <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col justify-center">
            {!result ? (
              <div className="text-center">
                <Sprout size={80} className="mx-auto text-green-600" />
                <h2 className="text-3xl font-bold text-green-800 mt-6">
                  Smart Crop Suggestion
                </h2>
                <p className="text-gray-600 mt-4">
                  Fill the form to get the best crop recommendation.
                </p>
              </div>
            ) : (
              <div className="text-center">
                <Leaf size={80} className="mx-auto text-green-600" />
                <p className="text-gray-500 text-lg">Recommended Crop</p>
                <h2 className="text-5xl font-bold text-green-700 mt-3">
                  {result.crop}
                </h2>
                <p className="text-gray-700 mt-6 text-lg leading-relaxed">
                  {result.reason}
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-green-50 rounded-2xl p-4">
                    <Thermometer className="mx-auto text-red-500" />
                    <p className="mt-2 font-semibold">{temperature}°C</p>
                  </div>

                  <div className="bg-green-50 rounded-2xl p-4">
                    <CloudRain className="mx-auto text-blue-500" />
                    <p className="mt-2 font-semibold">{rainfall} mm</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    
    </PageLayout>
  );
};

export default CropRecommendation;