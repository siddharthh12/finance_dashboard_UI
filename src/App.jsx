import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Sidebar from "./components/Layout/Sidebar";
import Navbar from "./components/Layout/Navbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex min-h-screen bg-background">
          <Sidebar />
          <div className="flex-1 lg:ml-64 min-h-screen flex flex-col relative transition-all duration-300">
            <Navbar />
            <main className="mt-16 flex-1 overflow-x-hidden">
               <div className="mx-auto max-w-7xl px-4 sm:px-8 py-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/transactions" element={<Transactions />} />
                  </Routes>
               </div>
            </main>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
