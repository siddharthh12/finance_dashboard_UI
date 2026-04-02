import React from "react";
import { Bell, Search, User, Menu } from "lucide-react";
import RoleSwitcher from "./RoleSwitcher";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context/AppContext";

const Navbar = () => {
  const { setIsSidebarOpen } = useAppContext();

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 border-b bg-card/80 backdrop-blur-md z-30 px-4 sm:px-8 flex items-center justify-between transition-all duration-300">
      <div className="flex items-center gap-4 flex-1">
        <button 
          className="lg:hidden p-2 hover:bg-accent rounded-lg transition-colors border"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>
        
        <div className="flex-1 max-w-sm relative group hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search..." 
            className="pl-10 h-10 bg-muted/50 border-none shadow-none focus-visible:ring-1"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-6">
        <button className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-card"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-2 sm:pl-6 border-l h-8">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold">Alex Johnson</p>
            <p className="text-[10px] text-muted-foreground capitalize font-semibold">Admin</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
            <User className="w-5 h-5 text-primary" />
          </div>
        </div>
        
        <div className="hidden xs:block">
           <RoleSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
