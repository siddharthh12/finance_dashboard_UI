import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Receipt, UserCircle, Settings, LogOut, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/AppContext";

const Sidebar = () => {
  const location = useLocation();
  const { isSidebarOpen, setIsSidebarOpen } = useAppContext();

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Transactions", path: "/transactions", icon: Receipt },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-all duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={cn(
        "fixed top-0 z-50 h-screen w-64 border-r bg-card flex flex-col transition-all duration-300 ease-in-out",
        isSidebarOpen ? "left-0" : "-left-64 lg:left-0"
      )}>
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
              $
            </div>
            FinDash
          </h1>
          <button 
            className="lg:hidden p-2 hover:bg-accent rounded-lg"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200",
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t mt-auto">
            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors group">
              <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Sign Out
            </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
