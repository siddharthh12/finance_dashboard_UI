import React from "react";
import { Search, Filter, X } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { categories } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Filters = () => {
  const { filters, setFilters } = useAppContext();

  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleTypeChange = (value) => {
    setFilters((prev) => ({ ...prev, type: value }));
  };

  const handleCategoryChange = (value) => {
    setFilters((prev) => ({ ...prev, category: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      type: "all",
      category: "all",
      sortBy: "date",
      sortOrder: "desc",
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 items-end md:items-center">
      <div className="relative flex-1 group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input
          placeholder="Search descriptions..."
          value={filters.search}
          onChange={handleSearchChange}
          className="pl-10 h-11 bg-muted/30 border-none shadow-none focus-visible:ring-1 focus-visible:bg-muted/50"
        />
      </div>

      <div className="flex flex-wrap gap-2 md:gap-4 w-full md:w-auto">
        <div className="w-[140px]">
          <Select value={filters.type} onValueChange={handleTypeChange}>
            <SelectTrigger className="h-11 border-none bg-muted/30 shadow-none hover:bg-muted/50">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-[160px]">
          <Select value={filters.category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="h-11 border-none bg-muted/30 shadow-none hover:bg-muted/50">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="ghost"
          onClick={clearFilters}
          className="h-11 px-3 text-muted-foreground hover:text-primary hover:bg-primary/5 gap-2"
        >
          <X className="w-4 h-4" />
          <span className="hidden sm:inline">Reset</span>
        </Button>
      </div>
    </div>
  );
};

export default Filters;
