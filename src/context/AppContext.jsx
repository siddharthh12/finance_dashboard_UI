import React, { createContext, useContext, useState, useEffect } from "react";
import { mockTransactions } from "../data/mockData";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("finance_transactions");
    return saved ? JSON.parse(saved) : mockTransactions;
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem("finance_role") || "admin"; // Default to admin for easier testing
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "all",
    sortBy: "date",
    sortOrder: "desc",
  });

  useEffect(() => {
    localStorage.setItem("finance_transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("finance_role", role);
  }, [role]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const editTransaction = (id, updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedTransaction } : t))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const value = {
    transactions,
    role,
    filters,
    isSidebarOpen,
    setIsSidebarOpen,
    setRole,
    setFilters,
    addTransaction,
    editTransaction,
    deleteTransaction,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
