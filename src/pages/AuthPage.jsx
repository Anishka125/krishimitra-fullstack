import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://krishimitra-backend-u3r8.onrender.com/api";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    experience: "",
    land: "",
    crop: "",
    annualIncome: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveUserToLocalStorage = (user) => {
    const profileData = {
      id: user.id,
      name: user.name,
      role: "Farmer 🌾",
      email: user.email,
      phone: user.phone || "Not added",
      location: user.location || "Not added",
      experience: user.experience || "Not added",
      land: user.land || "Not added",
      crop: user.crop || "Not added",
      annualIncome: user.income || "Not added",
    };

    localStorage.setItem("farmerProfile", JSON.stringify(profileData));
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const endpoint = isLogin ? "/login" : "/signup";

      const payload = isLogin
        ? {
            email: formData.email,
            password: formData.password,
          }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            location: formData.location,
            experience: formData.experience,
            land: formData.land,
            crop: formData.crop,
            income: formData.annualIncome,
          };

      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      if (isLogin) {
        saveUserToLocalStorage(data.user);
        navigate("/dashboard");
      } else {
        setMessage("Signup successful! Please login now.");
        setIsLogin(true);
        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          location: "",
          experience: "",
          land: "",
          crop: "",
          annualIncome: "",
        });
      }
    } catch (error) {
      setMessage("Backend server is not running. Please start backend.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 px-4 py-8">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div
          className="hidden md:flex flex-col justify-center items-center bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1974&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative z-10 text-center text-white px-8">
            <h1 className="text-5xl font-bold">KRISHIMITRA</h1>
            <p className="mt-6 text-lg">
              Smart Agriculture Platform for Modern Farmers
            </p>
          </div>
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-green-700 text-center">
            {isLogin ? "Welcome Back" : "Create Farmer Account"}
          </h2>

          <p className="text-center text-gray-500 mt-3">
            {isLogin
              ? "Login to continue"
              : "Fill your farmer details to start smart farming"}
          </p>

          {message && (
            <p className="mt-5 text-center text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl py-3 px-4">
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {!isLogin && (
              <>
                <Input
                  label="Full Name"
                  type="text"
                  name="name"
                  placeholder="Enter farmer name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <Input
                  label="Phone Number"
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />

                <Input
                  label="Location"
                  type="text"
                  name="location"
                  placeholder="Example: Hooghly, West Bengal"
                  value={formData.location}
                  onChange={handleChange}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Farming Experience"
                    type="text"
                    name="experience"
                    placeholder="Example: 5 Years"
                    value={formData.experience}
                    onChange={handleChange}
                  />

                  <Input
                    label="Total Land Area"
                    type="text"
                    name="land"
                    placeholder="Example: 2 Acres"
                    value={formData.land}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Main Crop"
                    type="text"
                    name="crop"
                    placeholder="Example: Rice"
                    value={formData.crop}
                    onChange={handleChange}
                  />

                  <Input
                    label="Annual Farm Income"
                    type="text"
                    name="annualIncome"
                    placeholder="Example: ₹80,000 / Year"
                    value={formData.annualIncome}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-semibold transition disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Login"
                : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}

            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage("");
                setFormData({
                  name: "",
                  email: "",
                  password: "",
                  phone: "",
                  location: "",
                  experience: "",
                  land: "",
                  crop: "",
                  annualIncome: "",
                });
              }}
              className="ml-2 text-green-700 font-semibold hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const Input = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div>
      <label className="block mb-2 font-medium">{label}</label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
};

export default AuthPage;