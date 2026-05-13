import { useState } from "react";
import PageLayout from "./PageLayout";
import Groq from "groq-sdk";

import {
  Landmark,
  ShieldCheck,
  CreditCard,
  Sprout,
  Bot,
} from "lucide-react";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const GovernmentSchemes = () => {
  const [selectedScheme, setSelectedScheme] = useState(null);

  const [stateName, setStateName] = useState("");
  const [crop, setCrop] = useState("");
  const [landSize, setLandSize] = useState("");
  const [problem, setProblem] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [loading, setLoading] = useState(false);

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const landSizes = [
    "Less than 1 acre",
    "1-2 acres",
    "2-5 acres",
    "5-10 acres",
    "More than 10 acres",
  ];

  const schemes = [
    {
      name: "PM-KISAN",
      icon: <Landmark size={42} />,
      benefit: "₹6000 yearly income support for eligible farmers.",
      eligibility: "Small and marginal farmers with valid land records.",
      link: "https://pmkisan.gov.in/",
    },
    {
      name: "Pradhan Mantri Fasal Bima Yojana",
      icon: <ShieldCheck size={42} />,
      benefit: "Crop insurance against natural disasters and crop loss.",
      eligibility: "Farmers growing notified crops in notified areas.",
      link: "https://pmfby.gov.in/",
    },
    {
      name: "Kisan Credit Card",
      icon: <CreditCard size={42} />,
      benefit: "Easy credit support for seeds, fertilizers, and farming needs.",
      eligibility: "Farmers, tenant farmers, and self-help groups.",
      link: "https://www.myscheme.gov.in/schemes/kcc",
    },
    {
      name: "Soil Health Card",
      icon: <Sprout size={42} />,
      benefit: "Soil testing report with fertilizer recommendations.",
      eligibility: "All farmers can apply for soil testing.",
      link: "https://soilhealth.dac.gov.in/",
    },
  ];

  const getSchemeSuggestion = async () => {
    if (!stateName || !crop || !landSize || !problem) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    setAiResult("");

    try {
      const prompt = `
You are KRISHIMITRA, an AI assistant for Indian government farmer schemes.

Farmer Details:
State: ${stateName}
Crop: ${crop}
Land Size: ${landSize}
Issue/Need: ${problem}

Suggest suitable Indian central and state-level government schemes for this farmer.

Give answer in this format:

Suitable Schemes:
Eligibility:
Benefits:
Required Documents:
How to Apply:
Final Advice:

Reply only in English.
Keep it simple and practical for Indian farmers.
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
      setAiResult(text);
    } catch (error) {
      console.log(error);
      setAiResult("Unable to suggest schemes right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title="Government Schemes">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800">
            Government Schemes
          </h1>

          <p className="mt-4 text-gray-700 text-lg">
            Explore farmer schemes and get AI-powered scheme suggestions.
          </p>
        </div>

        <div className="mt-10 bg-white rounded-3xl shadow-2xl p-6 md:p-8">
          <div className="flex items-center gap-3">
            <Bot className="text-green-700" size={36} />

            <h2 className="text-3xl font-bold text-green-800">
              AI Scheme Assistant
            </h2>
          </div>

          <p className="mt-3 text-gray-600">
            Select your state and land size, then type your crop and issue.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            <select
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
              className="border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="">Select State</option>
              {states.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={landSize}
              onChange={(e) => setLandSize(e.target.value)}
              className="border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="">Select Land Size</option>
              {landSizes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Enter crop e.g. Rice, Mango, Banana"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="text"
              placeholder="Enter issue e.g. loan, crop loss, irrigation"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            onClick={getSchemeSuggestion}
            disabled={loading}
            className="mt-6 bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg transition"
          >
            {loading ? "Finding Schemes..." : "Find Suitable Schemes"}
          </button>

          {aiResult && (
            <div className="mt-8 bg-green-50 rounded-3xl p-6 border border-green-100">
              <h3 className="text-2xl font-bold text-green-800">
                AI Scheme Suggestion
              </h3>

              <p className="mt-5 text-gray-700 whitespace-pre-wrap leading-relaxed text-lg">
                {aiResult}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {schemes.map((scheme, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition"
            >
              <div className="text-green-700 mb-5">{scheme.icon}</div>

              <h2 className="text-2xl font-bold text-green-800">
                {scheme.name}
              </h2>

              <p className="mt-4 text-gray-700">
                <span className="font-bold">Benefit:</span> {scheme.benefit}
              </p>

              <p className="mt-3 text-gray-700">
                <span className="font-bold">Eligibility:</span>{" "}
                {scheme.eligibility}
              </p>

              <button
                onClick={() => setSelectedScheme(scheme)}
                className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedScheme && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white max-w-2xl w-full rounded-3xl p-8 relative">
            <button
              onClick={() => setSelectedScheme(null)}
              className="absolute top-4 right-5 text-2xl"
            >
              ✕
            </button>

            <div className="text-green-700 mb-4">{selectedScheme.icon}</div>

            <h2 className="text-3xl font-bold text-green-800">
              {selectedScheme.name}
            </h2>

            <p className="mt-5 text-gray-700 text-lg">
              <span className="font-bold">Benefit:</span>{" "}
              {selectedScheme.benefit}
            </p>

            <p className="mt-4 text-gray-700 text-lg">
              <span className="font-bold">Eligibility:</span>{" "}
              {selectedScheme.eligibility}
            </p>

            <div className="mt-6">
              <h3 className="text-xl font-bold text-green-700">
                Required Documents
              </h3>

              <ul className="list-disc ml-6 mt-3 text-gray-700 space-y-2">
                <li>Aadhaar Card</li>
                <li>Bank Passbook</li>
                <li>Land Ownership Proof</li>
                <li>Passport Size Photo</li>
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold text-green-700">
                How to Apply
              </h3>

              <p className="mt-3 text-gray-700">
                Visit nearest agriculture office or apply through official
                government portal.
              </p>
            </div>

            <a href={selectedScheme.link} target="_blank" rel="noreferrer">
              <button className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold">
                Official Website
              </button>
            </a>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default GovernmentSchemes;