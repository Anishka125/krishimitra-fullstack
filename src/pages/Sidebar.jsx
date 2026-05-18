import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  CloudSun,
  Bot,
  Leaf,
  Bug,
  IndianRupee,
  Landmark,
  User,
  BarChart3,
  X,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Weather", path: "/weather", icon: CloudSun },
  { name: "AI Assistant", path: "/ai-assistant", icon: Bot },
  { name: "Crop Recommendation", path: "/crop-recommendation", icon: Leaf },
  { name: "Disease Detection", path: "/disease-detection", icon: Bug },
  { name: "Market Insights", path: "/market-insights", icon: IndianRupee },
  { name: "Govt Schemes", path: "/government-schemes", icon: Landmark },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
  { name: "Profile", path: "/profile", icon: User },
];

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          
            fixed md:static top-0 left-0 z-50
min-h-screen self-stretch w-64
          bg-gradient-to-b from-green-800 to-green-950
          text-white
          flex flex-col
          px-5 py-6
          shadow-2xl
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">

          {/* TOP SECTION */}
          <div>

            {/* LOGO */}
            <div className="flex items-center justify-between">

              <div>
                <h1 className="text-3xl font-extrabold tracking-wide">
                  KRISHIMITRA
                </h1>

                <p className="mt-2 text-green-200 text-sm">
                  Smart Agriculture Platform
                </p>
              </div>

              <button
                className="md:hidden"
                onClick={() => setIsOpen(false)}
              >
                <X />
              </button>

            </div>

            {/* NAVIGATION */}
            <nav className="mt-10 flex flex-col gap-3">

              {menuItems.map((item) => {
                const Icon = item.icon;

                const active =
                  location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center gap-4
                      px-4 py-3 rounded-2xl
                      text-base font-medium
                      transition-all duration-300
                      ${
                        active
                          ? "bg-white text-green-900 shadow-lg"
                          : "hover:bg-green-700/70 text-green-100"
                      }
                    `}
                  >
                    <Icon size={20} />

                    <span>{item.name}</span>
                  </Link>
                );
              })}

            </nav>
          </div>

          {/* BOTTOM SECTION */}
          <div className="mt-auto">

            {/* PROFILE CARD */}
            <div className="bg-white/10 backdrop-blur rounded-3xl p-5 border border-green-700 shadow-lg">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-white text-green-900 flex items-center justify-center text-2xl font-bold">
                  A
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    Anishka Shahdev
                  </h3>

                  <p className="text-green-200 text-sm">
                    Student Developer
                  </p>
                </div>

              </div>

            </div>

            

            {/* FOOTER */}
            <div className="mt-8 text-center">

              <p className="text-green-300 text-sm">
                Built with 💚 by Student Developer
              </p>

              <div className="mt-4 flex justify-center gap-5 text-sm text-green-300">

                <span className="hover:text-white cursor-pointer transition">
                  About 
                </span>

                <span className="hover:text-white cursor-pointer transition">
                  Contact
                </span>

                <span className="hover:text-white cursor-pointer transition">
                  Feedback
                </span>

              </div>

            </div>

          </div>

        </div>
      </aside>
    </>
  );
}

export default Sidebar;