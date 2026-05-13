import { useState } from "react";
import PageLayout from "./PageLayout";
import Groq from "groq-sdk";

import {
  Search,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  PackageCheck,
  Clock,
} from "lucide-react";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const MarketPrices = () => {
  const [search, setSearch] = useState("");
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestedCrops = [
    "Rice",
    "Wheat",
    "Onion",
    "Tomato",
    "Potato",
    "Maize",
  ];

  const getMarketInsight = async () => {
    if (!search.trim()) {
      alert("Enter crop name first");
      return;
    }

    setLoading(true);
    setInsight("");

    try {
      const prompt = `
You are KRISHIMITRA, an AI agriculture market advisor.

Reply only in English.
Keep the answer practical for Indian farmers.

Crop: ${search}

Give answer in this format:

Market Trend:
Best Selling Time:
Farmer Advice:
Storage Suggestion:
Risk Warning:
Final Recommendation:
`;

      const chatCompletion =
        await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],

          model: "llama-3.3-70b-versatile",
        });

      const text =
        chatCompletion.choices[0].message.content;

      setInsight(text);
    } catch (error) {
      console.log(error);

      setInsight(
        "Unable to generate market insight right now."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title="Market Insights">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-700 text-white p-4 rounded-3xl shadow-lg">
              <Sparkles size={34} />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-green-900">
            Market Insights
          </h1>

          <p className="mt-4 text-gray-700 text-lg">
            AI-powered crop selling advice, demand trend,
            storage tips, and risk analysis.
          </p>
        </div>

        {/* INPUT WINDOW */}
        <div className="mt-10 bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-6 md:p-8">

          <label className="text-green-900 font-bold text-lg">
            Enter Crop Name
          </label>

          <div className="mt-4 flex flex-col md:flex-row gap-4">

            <div className="flex items-center gap-3 border border-green-200 rounded-2xl px-5 py-4 flex-1 bg-green-50">
              <Search className="text-green-700" />

              <input
                type="text"
                placeholder="Example: Rice, Wheat, Onion..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent outline-none text-lg"
              />
            </div>

            <button
              onClick={getMarketInsight}
              disabled={loading}
              className="bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg transition"
            >
              {loading
                ? "Analyzing..."
                : "Generate Insight"}
            </button>

          </div>

          {/* SUGGESTED CROPS */}
          <div className="flex flex-wrap gap-3 mt-6">

            {suggestedCrops.map((crop) => (
              <button
                key={crop}
                onClick={() => setSearch(crop)}
                className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-full font-medium transition"
              >
                {crop}
              </button>
            ))}

          </div>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

          <div className="bg-white rounded-3xl p-5 shadow-xl">
            <TrendingUp
              className="text-green-600"
              size={32}
            />

            <h3 className="mt-4 font-bold text-green-900">
              Demand Trend
            </h3>

            <p className="text-gray-600">
              AI-based crop demand analysis
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-xl">
            <Clock
              className="text-blue-600"
              size={32}
            />

            <h3 className="mt-4 font-bold text-green-900">
              Selling Time
            </h3>

            <p className="text-gray-600">
              Best time to sell crop
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-xl">
            <PackageCheck
              className="text-purple-600"
              size={32}
            />

            <h3 className="mt-4 font-bold text-green-900">
              Storage Advice
            </h3>

            <p className="text-gray-600">
              Reduce crop loss after harvest
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-xl">
            <AlertTriangle
              className="text-orange-600"
              size={32}
            />

            <h3 className="mt-4 font-bold text-green-900">
              Risk Level
            </h3>

            <p className="text-gray-600">
              Market and price risk warning
            </p>
          </div>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="mt-10 bg-white rounded-3xl shadow-2xl p-8 text-center">

            <h2 className="text-2xl font-bold text-green-800">
              KRISHIMITRA is analyzing market conditions...
            </h2>

          </div>
        )}

        {/* AI OUTPUT */}
        {insight && !loading && (
          <div className="mt-10 bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-green-100">

            <h2 className="text-2xl md:text-3xl font-bold text-green-900">
              AI Market Analysis
            </h2>

            <div className="mt-6 bg-green-50 rounded-2xl p-5">

              <p className="text-gray-800 text-base md:text-lg whitespace-pre-wrap leading-relaxed">
                {insight}
              </p>

            </div>

          </div>
        )}

      </div>
    </PageLayout>
  );
};

export default MarketPrices;