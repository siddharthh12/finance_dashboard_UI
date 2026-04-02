import React from "react";
import SummaryCards from "../components/Dashboard/SummaryCards";
import Charts from "../components/Dashboard/Charts";
import Insights from "../components/Dashboard/Insights";
import { ArrowDownLeft, ArrowUpRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";

const Dashboard = () => {
  const { role } = useAppContext();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Financial Overview</h1>
          <p className="text-muted-foreground">Manage and track your personal financial performance.</p>
        </div>
        {role === "admin" && (
          <Button className="gap-2 shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" />
            Add Transaction
          </Button>
        )}
      </div>

      <SummaryCards />
      <Charts />
      
      <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 tracking-tight">Smart Insights</h2>
          <Insights />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-xl">
              <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <ArrowUpRight className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest opacity-80">Quick Tip</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Automate Savings</h3>
              <p className="opacity-80 text-sm mb-4 leading-relaxed">Setting up automatic transfers is a proven way to build wealth without extra effort.</p>
              <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white border-none h-9 px-6 font-semibold">Learn More</Button>
          </div>
          <div className="p-6 rounded-2xl bg-card border-none shadow-sm flex flex-col justify-center border border-muted/50">
              <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <ArrowDownLeft className="w-6 h-6 text-primary" />
                  </div>
                   <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Security</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Security Check</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">Your account is secured with 2FA and encryption. Last login from NY, USA.</p>
               <Button variant="secondary" className="h-9 px-6 font-semibold">Audit Logs</Button>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
