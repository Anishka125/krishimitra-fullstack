import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import WeatherPage from "./pages/WeatherPage";
import AIAssistant from "./pages/AIAssistant";
import CropRecommendation from "./pages/CropRecommendation";
import DiseaseDetection from "./pages/DiseaseDetection";
import MarketPrices from "./pages/MarketPrices";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/auth" element={<AuthPage />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/weather" element={<WeatherPage />} />

        <Route path="/ai-assistant" element={<AIAssistant />} />

        <Route
          path="/crop-recommendation"
          element={<CropRecommendation />}
        />

        <Route
          path="/disease-detection"
          element={<DiseaseDetection />}
        />

        <Route
          path="/market-insights"
          element={<MarketPrices />}
        />

        <Route
          path="/government-schemes"
          element={<GovernmentSchemes />}
        />

        <Route path="/profile" element={<Profile />} />

        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;