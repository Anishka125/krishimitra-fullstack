import { useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I am KRISHIMITRA Assistant 🌱 Ask me about features, login, disease detection, market insights, schemes, or analytics.",
    },
  ]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const question = input.toLowerCase();

    let botReply =
      "KRISHIMITRA helps farmers with weather, crop recommendation, disease detection, market insights, government schemes, analytics, and AI farming guidance.";

    if (question.includes("weather")) {
      botReply =
        "Go to Weather Forecast to check farming-related weather updates and suggestions.";
    } else if (question.includes("crop")) {
      botReply =
        "Use Crop Recommendation to get crop suggestions based on soil, season, rainfall, and location.";
    } else if (question.includes("disease") || question.includes("image")) {
      botReply =
        "Use Disease Detection to upload a crop image and detect possible plant disease using Gemini Vision.";
    } else if (question.includes("market") || question.includes("price")) {
      botReply =
        "Use Market Insights to understand crop price trends and AI-based selling suggestions.";
    } else if (question.includes("scheme") || question.includes("government")) {
      botReply =
        "Use Government Schemes to find schemes based on state, crop, land size, and farmer issue.";
    } else if (question.includes("analytics") || question.includes("chart")) {
      botReply =
        "Use Analytics to view rainfall and crop price charts with AI-generated farming insights.";
    } else if (question.includes("login") || question.includes("signup")) {
      botReply =
        "Click Get Started to login or sign up. Your farmer profile will be saved using localStorage.";
    } else if (question.includes("profile")) {
      botReply =
        "Profile page stores farmer details like name, crop, land size, income, location, and experience.";
    } else if (question.includes("how") || question.includes("use")) {
      botReply =
        "Start by clicking Get Started, create your farmer profile, then use dashboard features like Weather, Crop Recommendation, Disease Detection, Market Insights, Schemes, and Analytics.";
    }

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: input },
      { sender: "bot", text: botReply },
    ]);

    setInput("");
  };

  return (
    <div className="min-h-screen bg-white">
      <section
        id="home"
        className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1974&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-6 md:px-16 py-5 z-20">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            KRISHIMITRA
          </h1>

          <div className="hidden md:flex gap-8 text-white font-medium">
            <button onClick={() => scrollToSection("home")} className="hover:text-green-300">
              Home
            </button>
            <button onClick={() => scrollToSection("features")} className="hover:text-green-300">
              Features
            </button>
            <button onClick={() => scrollToSection("solutions")} className="hover:text-green-300">
              Solutions
            </button>
            <button onClick={() => scrollToSection("about")} className="hover:text-green-300">
              About
            </button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-green-300">
              Contact
            </button>
          </div>

          <Link to="/auth">
            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold">
              Get Started
            </button>
          </Link>
        </nav>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <p className="text-green-300 font-semibold tracking-wide mb-4">
            AI-POWERED SMART AGRICULTURE PLATFORM
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
            Smart Farming <br />
            with <span className="text-green-400">KRISHIMITRA</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            Get AI-based crop guidance, disease detection, weather insights,
            market analysis, government scheme suggestions, and farming analytics
            in one intelligent platform.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("features")}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg"
            >
              Explore Features
            </button>

            <button
              onClick={() => scrollToSection("about")}
              className="border border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-xl text-lg font-semibold"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 md:px-16 bg-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <Stat number="8+" text="Smart Features" />
          <Stat number="AI" text="Farming Assistant" />
          <Stat number="24/7" text="Farmer Support" />
          <Stat number="100%" text="Responsive UI" />
        </div>
      </section>

      <section id="features" className="py-20 px-6 md:px-16 bg-green-50">
        <h2 className="text-4xl font-bold text-center text-green-700">
          Powerful Farming Features
        </h2>

        <p className="text-center text-gray-600 mt-4 max-w-3xl mx-auto">
          KRISHIMITRA combines AI, data, and smart design to help farmers make
          better agricultural decisions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-14">
          <Link to="/weather">
            <FeatureCard icon="🌦️" title="Weather Forecast" text="Get weather-based farming suggestions for irrigation, harvesting, and crop protection." />
          </Link>

          <Link to="/crop-recommendation">
            <FeatureCard icon="🌱" title="Crop Recommendation" text="Find suitable crops based on soil, season, location, rainfall, and farming conditions." />
          </Link>

          <Link to="/ai-assistant">
            <FeatureCard icon="🤖" title="AI Farming Assistant" text="Ask farming-related questions and get instant AI-powered guidance using Groq API." />
          </Link>

          <Link to="/disease-detection">
            <FeatureCard icon="🦠" title="Disease Detection" text="Upload crop images and detect possible plant diseases using Gemini Vision." />
          </Link>

          <Link to="/market-prices">
            <FeatureCard icon="📈" title="Market Insights" text="Understand crop price trends and get AI-generated selling suggestions." />
          </Link>

          <Link to="/analytics">
            <FeatureCard icon="📊" title="Farming Analytics" text="Visualize rainfall, crop price, and farming performance with dynamic charts." />
          </Link>
        </div>
      </section>

      <section id="solutions" className="py-20 px-6 md:px-16 bg-white">
        <h2 className="text-4xl font-bold text-center text-green-700">
          Smart Solutions for Modern Farmers
        </h2>

        <p className="text-center text-gray-600 mt-4 max-w-3xl mx-auto">
          From government schemes to market decisions, KRISHIMITRA provides
          practical digital tools for real farming problems.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-14">
          <InfoCard title="Government Scheme Support" text="Farmers can discover relevant schemes based on state, crop, land size, and farming issues." />
          <InfoCard title="Market Price Intelligence" text="AI-based crop market analysis helps farmers understand demand trends and selling opportunities." />
          <InfoCard title="Personal Farmer Profile" text="Farmer details like location, land size, crop, income, and experience personalize the platform." />
          <InfoCard title="AI-Based Decision Making" text="KRISHIMITRA uses Groq AI, Gemini Vision, Recharts, and React UI for smart agriculture decisions." />
        </div>
      </section>

      <section id="about" className="py-20 px-6 md:px-16 bg-green-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-700">
            About KRISHIMITRA
          </h2>

          <p className="text-gray-700 mt-6 text-lg leading-8">
            KRISHIMITRA is a smart agriculture web platform designed to support
            farmers with AI-powered guidance. It brings together crop
            recommendations, weather forecasting, disease detection, market
            insights, government scheme suggestions, analytics, and profile-based
            personalization in one clean and responsive application.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-16 bg-green-700 text-white text-center">
        <h2 className="text-4xl font-bold">Start Your Smart Farming Journey</h2>

        <p className="mt-4 text-green-100 max-w-2xl mx-auto">
          Use AI-powered farming tools to make better crop, market, and weather
          decisions.
        </p>

        <Link to="/auth">
          <button className="mt-8 bg-white text-green-700 hover:bg-green-100 px-8 py-3 rounded-xl text-lg font-bold">
            Get Started Now
          </button>
        </Link>
      </section>

      <section id="contact" className="py-16 px-6 md:px-16 bg-gray-900 text-white">
        <h2 className="text-4xl font-bold text-center">Contact Us</h2>

        <div className="mt-8 text-center space-y-3 text-gray-300">
          <p>Email: anishkashahdev9@gmail.com</p>
          <p>Phone: +91 8789886172</p>
          <p>Location: Kolkata, India</p>
        </div>

        <p className="text-center text-gray-500 mt-10">
          © 2026 KRISHIMITRA. Smart Agriculture Platform.
        </p>
      </section>

      {/* FLOATING CHATBOT */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen && (
          <div className="w-80 md:w-96 bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-200 mb-4">
            <div className="bg-green-700 text-white p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">KRISHIMITRA Assistant</h3>
                <p className="text-sm text-green-100">Website Guide Bot</p>
              </div>

              <button
                onClick={() => setChatOpen(false)}
                className="text-white text-xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="h-80 overflow-y-auto p-4 bg-green-50 space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.sender === "user"
                        ? "bg-green-600 text-white rounded-br-none"
                        : "bg-white text-gray-700 shadow rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t flex gap-2 bg-white">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about KRISHIMITRA..."
                className="flex-1 border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                onClick={handleSend}
                className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-xl font-semibold"
              >
                Send
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-green-600 hover:bg-green-700 text-white w-16 h-16 rounded-full shadow-2xl text-3xl flex items-center justify-center"
        >
          🤖
        </button>
      </div>
    </div>
  );
};

const Stat = ({ number, text }) => {
  return (
    <div>
      <h2 className="text-4xl font-bold text-green-700">{number}</h2>
      <p className="text-gray-600 mt-2">{text}</p>
    </div>
  );
};

const FeatureCard = ({ icon, title, text }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition duration-300 cursor-pointer h-full">
      <div className="text-5xl">{icon}</div>
      <h3 className="text-2xl font-bold mt-5 text-gray-800">{title}</h3>
      <p className="mt-4 text-gray-600 leading-7">{text}</p>
    </div>
  );
};

const InfoCard = ({ title, text }) => {
  return (
    <div className="bg-green-50 border border-green-100 rounded-3xl p-8 shadow-md hover:shadow-xl transition">
      <h3 className="text-2xl font-bold text-green-700">{title}</h3>
      <p className="mt-4 text-gray-600 leading-7">{text}</p>
    </div>
  );
};

export default LandingPage;