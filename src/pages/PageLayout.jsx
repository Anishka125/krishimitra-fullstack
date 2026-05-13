import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

const PageLayout = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-green-50 flex">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex-1 w-full min-w-0 overflow-x-hidden">
        <div className="bg-green-700 text-white p-4 md:p-6 shadow-lg flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden bg-white text-green-800 p-2 rounded-xl shadow"
          >
            <Menu />
          </button>

          <h1 className="text-2xl md:text-3xl font-bold">
            {title}
          </h1>
        </div>

        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;