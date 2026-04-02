import React, { useState } from "react";
import Filters from "../components/Transactions/Filters";
import TransactionsTable from "../components/Transactions/TransactionsTable";
import TransactionForm from "../components/Transactions/TransactionForm";
import { Plus, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";

const Transactions = () => {
  const { role, transactions } = useAppContext();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const exportToCSV = () => {
    const headers = ["ID", "Date", "Amount", "Category", "Type"];
    const rows = transactions.map((t) => [t.id, t.date, t.amount, t.category, t.type]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Transactions</h1>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            Viewing <span className="font-bold text-foreground">{transactions.length}</span> recorded financial events.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none gap-2 hover:bg-primary/5" onClick={exportToCSV}>
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
          {role === "admin" && (
            <Button className="flex-1 md:flex-none gap-2 shadow-lg shadow-primary/20" onClick={() => setIsFormOpen(true)}>
              <Plus className="w-4 h-4" />
              New Transaction
            </Button>
          )}
        </div>
      </div>

      <Filters />
      <TransactionsTable />
      <TransactionForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} />
      
      <div className="mt-12 p-8 rounded-3xl bg-primary/5 border border-primary/10 relative overflow-hidden group">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
          <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shrink-0">
                  <FileText className="w-6 h-6" />
              </div>
              <div className="max-w-xl">
                  <h3 className="text-xl font-bold mb-2">Automated Reports</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      Your financial data is periodically synchronized with our analytical engine to generate weekly performance reports. Check your email for this week's summary.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-primary font-bold hover:no-underline flex items-center gap-1 group/btn">
                    View full history
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </Button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Transactions;
