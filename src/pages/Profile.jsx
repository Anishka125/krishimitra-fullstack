import { useEffect, useState } from "react";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Tractor,
  Pencil,
  LogOut,
  RotateCcw,
} from "lucide-react";

import PageLayout from "./PageLayout";

const defaultProfile = {
  name: "Rajesh Kumar",
  role: "Progressive Farmer 🌾",
  location: "Hooghly, West Bengal",
  phone: "+91 9876543210",
  email: "farmer@krishimitra.com",
  experience: "12 Years Experience",
  land: "12 Acres",
  crop: "Rice",
  annualIncome: "₹80,000 / Year",
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => {
    const savedProfile = localStorage.getItem("farmerProfile");

    if (savedProfile && savedProfile !== "undefined") {
      const parsedProfile = JSON.parse(savedProfile);

      setProfile({
        ...defaultProfile,
        ...parsedProfile,
        annualIncome:
          parsedProfile.annualIncome ||
          parsedProfile.farmingMethod ||
          parsedProfile.schemes ||
          "₹80,000 / Year",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveProfile = () => {
    localStorage.setItem("farmerProfile", JSON.stringify(profile));
    setIsEditing(false);
  };

  const resetProfile = () => {
    localStorage.removeItem("farmerProfile");
    setProfile(defaultProfile);
    setIsEditing(false);
  };

  const logout = () => {
    localStorage.setItem("isLoggedIn", "false");
    window.location.href = "/auth";
  };

  return (
    <PageLayout title="Farmer Profile">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-40 h-40 rounded-full bg-green-200 flex items-center justify-center shadow-lg">
              <User size={80} className="text-green-700" />
            </div>

            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div className="w-full">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      className="text-3xl md:text-4xl font-bold text-green-800 border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-green-500 w-full"
                    />
                  ) : (
                    <h1 className="text-4xl font-bold text-green-800">
                      {profile.name}
                    </h1>
                  )}

                  {isEditing ? (
                    <input
                      type="text"
                      name="role"
                      value={profile.role}
                      onChange={handleChange}
                      className="mt-3 text-lg text-gray-600 border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-green-500 w-full"
                    />
                  ) : (
                    <p className="text-gray-600 mt-2 text-lg">
                      {profile.role}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      if (isEditing) {
                        saveProfile();
                      } else {
                        setIsEditing(true);
                      }
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 whitespace-nowrap"
                  >
                    <Pencil size={18} />
                    {isEditing ? "Save Profile" : "Edit Profile"}
                  </button>

                  <button
                    onClick={resetProfile}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 whitespace-nowrap"
                  >
                    <RotateCcw size={18} />
                    Reset
                  </button>

                  <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 whitespace-nowrap"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
                <div className="flex items-center gap-3 bg-green-50 rounded-2xl p-4">
                  <MapPin className="text-green-700" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                      className="bg-transparent outline-none w-full"
                    />
                  ) : (
                    <span>{profile.location}</span>
                  )}
                </div>

                <div className="flex items-center gap-3 bg-green-50 rounded-2xl p-4">
                  <Phone className="text-green-700" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="bg-transparent outline-none w-full"
                    />
                  ) : (
                    <span>{profile.phone}</span>
                  )}
                </div>

                <div className="flex items-center gap-3 bg-green-50 rounded-2xl p-4">
                  <Mail className="text-green-700" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="bg-transparent outline-none w-full"
                    />
                  ) : (
                    <span>{profile.email}</span>
                  )}
                </div>

                <div className="flex items-center gap-3 bg-green-50 rounded-2xl p-4">
                  <Tractor className="text-green-700" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="experience"
                      value={profile.experience}
                      onChange={handleChange}
                      className="bg-transparent outline-none w-full"
                    />
                  ) : (
                    <span>{profile.experience}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            {isEditing ? (
              <input
                type="text"
                name="land"
                value={profile.land}
                onChange={handleChange}
                className="text-4xl font-bold text-green-700 border border-gray-300 rounded-xl px-4 py-2 text-center w-full outline-none focus:ring-2 focus:ring-green-500"
              />
            ) : (
              <h2 className="text-5xl font-bold text-green-700">
                {profile.land}
              </h2>
            )}

            <p className="text-gray-600 mt-3 text-lg">Total Land Area</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            {isEditing ? (
              <input
                type="text"
                name="crop"
                value={profile.crop}
                onChange={handleChange}
                className="text-4xl font-bold text-green-700 border border-gray-300 rounded-xl px-4 py-2 text-center w-full outline-none focus:ring-2 focus:ring-green-500"
              />
            ) : (
              <h2 className="text-5xl font-bold text-green-700">
                {profile.crop}
              </h2>
            )}

            <p className="text-gray-600 mt-3 text-lg">Main Crop</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            {isEditing ? (
              <input
                type="text"
                name="annualIncome"
                value={profile.annualIncome}
                onChange={handleChange}
                className="text-4xl font-bold text-green-700 border border-gray-300 rounded-xl px-4 py-2 text-center w-full outline-none focus:ring-2 focus:ring-green-500"
              />
            ) : (
              <h2 className="text-5xl font-bold text-green-700">
                {profile.annualIncome}
              </h2>
            )}

            <p className="text-gray-600 mt-3 text-lg">Annual Farm Income</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;