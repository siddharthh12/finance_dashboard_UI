import React, { useState } from "react";
import { Edit2, Trash2, ChevronUp, ChevronDown, MoreVertical } from "lucide-react";
import { formatDate, formatCurrency } from "@/utils/helpers";
import { useAppContext } from "@/context/AppContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import TransactionForm from "./TransactionForm";

const TransactionsTable = () => {
  const { transactions, role, deleteTransaction, filters, setFilters } = useAppContext();
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.category.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = filters.type === "all" || t.type === filters.type;
    const matchesCategory = filters.category === "all" || t.category === filters.category;
    return matchesSearch && matchesType && matchesCategory;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const order = filters.sortOrder === "asc" ? 1 : -1;
    if (filters.sortBy === "date") {
      return (new Date(a.date) - new Date(b.date)) * order;
    }
    if (filters.sortBy === "amount") {
      return (a.amount - b.amount) * order;
    }
    return 0;
  });

  const handleSort = (column) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: column,
      sortOrder: prev.sortBy === column && prev.sortOrder === "desc" ? "asc" : "desc",
    }));
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      deleteTransaction(id);
    }
  };

  if (sortedTransactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-card/30 rounded-2xl border-2 border-dashed border-muted">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Trash2 className="w-8 h-8 text-muted-foreground opacity-50" />
        </div>
        <h3 className="text-xl font-bold mb-1">No transactions found</h3>
        <p className="text-muted-foreground text-center">Try adjusting your filters or add a new record to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl shadow-sm overflow-hidden border border-muted/50">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent bg-muted/20">
            <TableHead 
              className="cursor-pointer font-bold w-[20%]" 
              onClick={() => handleSort("date")}
            >
              <div className="flex items-center gap-2">
                Date {filters.sortBy === "date" && (filters.sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
              </div>
            </TableHead>
            <TableHead className="font-bold">Category</TableHead>
            <TableHead className="font-bold text-center">Type</TableHead>
            <TableHead 
              className="cursor-pointer font-bold text-right w-[20%]" 
              onClick={() => handleSort("amount")}
            >
              <div className="flex items-center justify-end gap-2">
                Amount {filters.sortBy === "amount" && (filters.sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
              </div>
            </TableHead>
            {role === "admin" && <TableHead className="font-bold text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTransactions.map((t) => (
            <TableRow key={t.id} className="group hover:bg-muted/30 transition-colors">
              <TableCell className="text-muted-foreground font-medium">{formatDate(t.date)}</TableCell>
              <TableCell>
                  <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${t.type === 'income' ? 'bg-green-500' : 'bg-destructive'}`} />
                      <span className="font-semibold">{t.category}</span>
                  </div>
              </TableCell>
              <TableCell className="text-center">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  t.type === "income" 
                  ? "bg-green-100 text-green-700" 
                  : "bg-red-100 text-red-700"
                }`}>
                  {t.type}
                </span>
              </TableCell>
              <TableCell className={`text-right font-bold text-lg ${t.type === "income" ? "text-green-600" : "text-foreground"}`}>
                {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
              </TableCell>
              {role === "admin" && (
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(t)}
                      className="w-8 h-8 rounded-full hover:bg-primary/10 hover:text-primary"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(t.id)}
                      className="w-8 h-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TransactionForm 
        isOpen={isFormOpen} 
        setIsOpen={setIsFormOpen} 
        editingTransaction={editingTransaction} 
      />
    </div>
  );
};

export default TransactionsTable;
