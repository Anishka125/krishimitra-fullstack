import { useState } from "react";
import Groq from "groq-sdk";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import PageLayout from "./PageLayout";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const generateSampleData = (cropName) => {
  const basePrice = 1500 + cropName.length * 120;
  const baseRainfall = 30 + cropName.length * 5;

  return {
    rainfall: [
      { month: "Jan", value: baseRainfall },
      { month: "Feb", value: baseRainfall + 15 },
      { month: "Mar", value: baseRainfall + 30 },
      { month: "Apr", value: baseRainfall + 45 },
      { month: "May", value: baseRainfall + 70 },
      { month: "Jun", value: baseRainfall + 100 },
    ],
    price: [
      { month: "Jan", value: basePrice },
      { month: "Feb", value: basePrice + 80 },
      { month: "Mar", value: basePrice + 160 },
      { month: "Apr", value: basePrice + 220 },
      { month: "May", value: basePrice + 300 },
      { month: "Jun", value: basePrice + 250 },
    ],
  };
};

const cropAnalyticsData = {
  Rice: generateSampleData("Rice"),
  Wheat: generateSampleData("Wheat"),
  Potato: generateSampleData("Potato"),
  Onion: generateSampleData("Onion"),
  Tomato: generateSampleData("Tomato"),
  Maize: generateSampleData("Maize"),
  Mustard: generateSampleData("Mustard"),
  Cotton: generateSampleData("Cotton"),
  Sugarcane: generateSampleData("Sugarcane"),
  Banana: generateSampleData("Banana"),
  Mango: generateSampleData("Mango"),
  Brinjal: generateSampleData("Brinjal"),
};

const Analytics = () => {
  const [selectedCrop, setSelectedCrop] = useState("Rice");
  const [chartData, setChartData] = useState(cropAnalyticsData.Rice);
  const [aiInsight, setAiInsight] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCropChange = (e) => {
    const cropName = e.target.value;

    setSelectedCrop(cropName);

    if (cropAnalyticsData[cropName]) {
      setChartData(cropAnalyticsData[cropName]);
    } else if (cropName.trim()) {
      setChartData(generateSampleData(cropName));
    }

    setAiInsight("");
  };

  const generateAnalytics = async () => {
    const cropName = selectedCrop.trim();

    if (!cropName) {
      alert("Please enter or select a crop");
      return;
    }

    const data = cropAnalyticsData[cropName] || generateSampleData(cropName);

    setChartData(data);
    setAiInsight("");
    setLoading(true);

    try {
      const prompt = `
You are KRISHIMITRA, an AI agriculture analytics assistant.

Crop: ${cropName}

Rainfall Data:
${JSON.stringify(data.rainfall)}

Market Price Data:
${JSON.stringify(data.price)}

Analyze this crop data and give:
1. Rainfall trend
2. Price trend
3. Best farming advice
4. Selling suggestion
5. Risk warning

Reply only in English.
Keep it short and useful for Indian farmers.
`;

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

      const text = chatCompletion.choices[0].message.content;
      setAiInsight(text);
    } catch (error) {
      console.log(error);
      setAiInsight("Unable to generate crop analytics right now.");
    } finally {
      setLoading(false);
    }
  };

  const latestPrice = chartData.price[chartData.price.length - 1].value;
  const latestRainfall =
    chartData.rainfall[chartData.rainfall.length - 1].value;

  return (
    <PageLayout title="Analytics">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800">
            Crop Analytics
          </h1>

          <p className="mt-4 text-gray-700 text-lg">
            Type or select any crop and generate rainfall, market price, and
            AI-powered farming analytics.
          </p>
        </div>

        <div className="mt-10 bg-white rounded-3xl shadow-xl p-6 md:p-8">
          <label className="font-bold text-green-800 text-lg">
            Type or Select Crop
          </label>

          <div className="mt-4 flex flex-col md:flex-row gap-4">
            <input
              list="crop-options"
              value={selectedCrop}
              onChange={handleCropChange}
              placeholder="Type or select crop..."
              className="border border-gray-300 rounded-2xl px-5 py-4 flex-1 outline-none focus:ring-2 focus:ring-green-500 bg-white"
            />

            <datalist id="crop-options">
              {Object.keys(cropAnalyticsData).map((crop) => (
                <option key={crop} value={crop} />
              ))}
            </datalist>

            <button
              onClick={generateAnalytics}
              disabled={loading}
              className="bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg"
            >
              {loading ? "Generating..." : "Generate Analytics"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white rounded-3xl p-6 shadow-xl text-center">
            <h2 className="text-4xl font-bold text-green-700">
              {selectedCrop || "Crop"}
            </h2>
            <p className="text-gray-600 mt-2">Selected Crop</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl text-center">
            <h2 className="text-4xl font-bold text-green-700">
              {latestRainfall} mm
            </h2>
            <p className="text-gray-600 mt-2">Latest Rainfall</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl text-center">
            <h2 className="text-4xl font-bold text-green-700">
              ₹{latestPrice}
            </h2>
            <p className="text-gray-600 mt-2">Latest Market Price</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-green-800 mb-6">
              {selectedCrop || "Crop"} Rainfall Trend
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData.rainfall}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-green-800 mb-6">
              {selectedCrop || "Crop"} Price Trend
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.price}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {aiInsight && (
          <div className="mt-10 bg-white rounded-3xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-green-800">
              AI Crop Insight
            </h2>

            <p className="mt-6 text-gray-700 whitespace-pre-wrap leading-relaxed text-lg">
              {aiInsight}
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Analytics;