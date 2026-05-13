import { Link } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";

import {
  CloudSun,
  Sprout,
  Bot,
  IndianRupee,
  Menu,
  BarChart3,
} from "lucide-react";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const farmerProfile =
    JSON.parse(localStorage.getItem("farmerProfile")) || {};

  const submitFeedback = async () => {
    if (!rating) {
      setFeedbackMessage("Please select a rating.");
      return;
    }

    if (!feedback.trim()) {
      setFeedbackMessage("Please write your feedback.");
      return;
    }

    setLoading(true);
    setFeedbackMessage("");

    try {
      const res = await fetch("https://krishimitra-backend-u3r8.onrender.com/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: farmerProfile.name || "Anonymous Farmer",
          email: farmerProfile.email || "Not available",
          rating,
          message: feedback,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFeedbackMessage(data.message || "Failed to submit feedback.");
      } else {
        setFeedbackMessage("Thank you! Your feedback has been submitted.");
        setRating(0);
        setFeedback("");
      }
    } catch (error) {
      setFeedbackMessage("Backend server is not running.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-green-50 flex items-stretch">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex-1 w-full min-w-0 p-4 md:p-10 overflow-x-hidden">
        <div className="flex items-center justify-between gap-3 w-full min-w-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden bg-white p-2 rounded-xl shadow"
            >
              <Menu />
            </button>

            <h2 className="text-lg md:text-3xl font-bold text-green-800 truncate">
              Farmer Dashboard
            </h2>
          </div>

          <Link to="/profile" className="hidden sm:block">
            <div className="bg-white px-4 py-2 rounded-xl shadow cursor-pointer hover:bg-green-50 transition">
              👨‍🌾 {farmerProfile.name || "Farmer"}
            </div>
          </Link>
        </div>

        <div className="mt-6 md:mt-8 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-3xl p-5 md:p-8 shadow-xl">
          <h1 className="text-2xl md:text-4xl font-bold">
            Welcome Back {farmerProfile.name || "Farmer"} 👋
          </h1>

          <p className="mt-4 text-lg text-green-100">
            Monitor weather, crops, and smart farming insights in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mt-8 md:mt-10">
          <DashboardCard
            title="Weather"
            icon={<CloudSun className="text-yellow-500" size={35} />}
            main="28°C"
            sub="Sunny Climate"
          />

          <DashboardCard
            title="Recommended Crop"
            icon={<Sprout className="text-green-600" size={35} />}
            main={farmerProfile.crop || "Rice"}
            sub="Best for current soil"
          />

          <div className="bg-white rounded-3xl p-6 shadow-lg hover:-translate-y-2 transition">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-700">
                AI Assistant
              </h3>
              <Bot className="text-blue-500" size={35} />
            </div>

            <p className="mt-6 text-lg font-semibold text-gray-700">
              Ask farming questions instantly.
            </p>

            <Link to="/ai-assistant">
              <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl">
                Open AI
              </button>
            </Link>
          </div>

          <DashboardCard
            title="Market Price"
            icon={<IndianRupee className="text-green-700" size={35} />}
            main="₹2200"
            sub={`${farmerProfile.crop || "Rice"} / Quintal`}
          />

          <div className="bg-white rounded-3xl p-6 shadow-lg hover:-translate-y-2 transition">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-700">Analytics</h3>
              <BarChart3 className="text-purple-600" size={35} />
            </div>

            <p className="mt-6 text-lg font-semibold text-gray-700">
              View rainfall and price trends.
            </p>

            <Link to="/analytics">
              <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl">
                Open Analytics
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800">
            Government Schemes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <InfoBox
              title="PM-KISAN"
              text="Income support scheme for farmers."
            />
            <InfoBox
              title="Crop Insurance"
              text="Protection against crop damage and disasters."
            />
            <InfoBox
              title="Soil Health"
              text="Improve productivity through soil testing."
            />
          </div>

          <div className="flex justify-center mt-8">
            <Link to="/government-schemes">
              <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg">
                Explore All Schemes
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-20 bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800">
            About KRISHIMITRA
          </h2>

          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            KRISHIMITRA is an AI-powered smart agriculture platform designed to
            help farmers with crop recommendations, weather forecasting, disease
            detection, market insights, and government schemes.
          </p>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center">
            Smart Farming Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <InfoBox
              title="AI Crop Guidance"
              text="Get intelligent crop recommendations based on weather and soil conditions."
            />
            <InfoBox
              title="Disease Detection"
              text="Upload crop images and identify diseases using AI."
            />
            <InfoBox
              title="Market Insights"
              text="Analyze market trends and get AI-powered selling advice."
            />
          </div>
        </div>

        <div className="mt-20 bg-gradient-to-r from-green-700 to-green-900 text-white rounded-3xl p-10 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold">
            Daily Farming Tips 🌱
          </h2>

          <ul className="mt-6 space-y-4 text-lg text-green-100">
            <li>• Water crops early morning for better absorption.</li>
            <li>• Monitor soil moisture regularly.</li>
            <li>• Use crop rotation to maintain soil fertility.</li>
            <li>• Store grains in dry environments to reduce spoilage.</li>
          </ul>
        </div>

        <div className="mt-20 bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800">
            Creator's Message 💚
          </h2>

          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            Hello! I am a student developer who wanted to build something
            meaningful using AI and modern web technologies. KRISHIMITRA is my
            attempt to combine smart agriculture, AI assistance, crop guidance,
            and farmer support into one platform.
          </p>

          <p className="mt-4 text-lg text-gray-700">
            Your feedback and suggestions would mean a lot 💚
          </p>

          <div className="mt-10">
            <h3 className="text-2xl font-bold text-green-700">
              Rate This Project
            </h3>

            <div className="flex gap-3 mt-5 text-4xl cursor-pointer">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="hover:scale-125 transition"
                >
                  {star <= rating ? "⭐" : "☆"}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-bold text-green-700">
              Comments & Reviews
            </h3>

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback here..."
              className="w-full mt-5 border border-gray-300 rounded-2xl p-5 h-40 outline-none focus:ring-2 focus:ring-green-500 text-lg"
            />

            {feedbackMessage && (
              <p className="mt-4 text-green-700 font-semibold">
                {feedbackMessage}
              </p>
            )}

            <button
              onClick={submitFeedback}
              disabled={loading}
              className="mt-5 bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-2xl shadow-lg transition text-lg font-semibold disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>

          <div className="mt-12 space-y-6">
            <div className="bg-green-50 rounded-2xl p-5">
              <h4 className="font-bold text-green-800">
                Rahul Sharma ⭐⭐⭐⭐⭐
              </h4>
              <p className="mt-2 text-gray-700">
                Very innovative agriculture project with useful AI features.
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5">
              <h4 className="font-bold text-green-800">Priya Das ⭐⭐⭐⭐</h4>
              <p className="mt-2 text-gray-700">
                Clean UI and impressive farming assistance features.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 mb-10 bg-green-900 text-white rounded-3xl p-10 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold">Contact Us</h2>

          <div className="mt-6 space-y-3 text-lg text-green-100">
            <p>Email: anishkashahdev9@gmail.com</p>
            <p>Phone: +91 8789886172</p>
            <p>Location: Kolkata, India</p>
          </div>
        </div>
      </main>
    </div>
  );
};

const DashboardCard = ({ title, icon, main, sub }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg hover:-translate-y-2 transition">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-700">{title}</h3>
        {icon}
      </div>

      <p className="mt-6 text-3xl font-bold text-green-700">{main}</p>
      <p className="text-gray-500 mt-2">{sub}</p>
    </div>
  );
};

const InfoBox = ({ title, text }) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg">
      <h3 className="text-2xl font-bold text-green-700">{title}</h3>
      <p className="mt-4 text-gray-600">{text}</p>
    </div>
  );
};

export default Dashboard;