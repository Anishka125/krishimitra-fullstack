import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

function DashboardLayout({ children, title }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-green-50">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex-1 w-full">
        <div className="sticky top-0 z-30 bg-green-50/90 backdrop-blur border-b border-green-100 px-4 md:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden bg-white p-2 rounded-xl shadow"
          >
            <Menu />
          </button>

          <h2 className="text-2xl md:text-3xl font-bold text-green-800">
            {title}
          </h2>
        </div>

        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}

export default DashboardLayout;