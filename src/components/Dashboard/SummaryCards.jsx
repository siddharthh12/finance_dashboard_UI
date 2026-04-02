import React from "react";
import { Wallet, TrendingUp, TrendingDown, MoreVertical } from "lucide-react";
import { calculateSummary, formatCurrency } from "@/utils/helpers";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SummaryCards = () => {
  const { transactions } = useAppContext();
  const { balance, income, expenses } = calculateSummary(transactions);

  const cards = [
    {
      title: "Total Balance",
      amount: balance,
      icon: Wallet,
      color: "text-primary",
      bg: "bg-primary/10",
      trend: "+12.5% from last month",
      trendColor: "text-green-600",
    },
    {
      title: "Total Income",
      amount: income,
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-100",
      trend: "+8.2% from last month",
      trendColor: "text-green-600",
    },
    {
      title: "Total Expenses",
      amount: expenses,
      icon: TrendingDown,
      color: "text-destructive",
      bg: "bg-destructive/10",
      trend: "-5.4% from last month",
      trendColor: "text-green-600", // Lower expenses is good
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow border-none shadow-sm bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <div className={`${card.bg} p-2 rounded-lg`}>
                <card.icon className={`w-4 h-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1 tracking-tight">
              {formatCurrency(card.amount)}
            </div>
            <p className={`text-xs font-medium ${card.trendColor}`}>
              {card.trend}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;
