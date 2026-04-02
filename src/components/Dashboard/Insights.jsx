import React from "react";
import { Zap, Target, ArrowUpRight, ArrowDownRight, Info } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatCurrency } from "@/utils/helpers";

const Insights = () => {
  const { transactions } = useAppContext();
  
  // Highest spending category
  const expenses = transactions.filter(t => t.type === 'expense');
  const catTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
    return acc;
  }, {});
  
  const highestCategory = Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0];
  
  // Total Transaction Count
  const totalCount = transactions.length;
  
  // Budget Insight (Mock Logic)
  const monthlyGoal = 2000;
  const currentSpending = Object.values(catTotals).reduce((a, b) => a + b, 0);
  const percentOfGoal = ((currentSpending / monthlyGoal) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="border-none shadow-sm bg-primary/5 border-l-4 border-l-primary">
        <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-primary">
                <Zap className="w-5 h-5 fill-current" />
                <CardTitle className="text-sm font-bold uppercase tracking-wider">Top Spending</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-1">
             {highestCategory ? highestCategory[0] : 'N/A'}
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Totaling <span className="font-semibold text-foreground">{highestCategory ? formatCurrency(highestCategory[1]) : '$0'}</span> this month
          </p>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-primary">
                <Target className="w-5 h-5" />
                <CardTitle className="text-sm font-bold uppercase tracking-wider">Budget Progress</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-1">{percentOfGoal}%</div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
              <div 
                className={`h-full transition-all duration-500 ${parseFloat(percentOfGoal) > 90 ? 'bg-destructive' : 'bg-primary'}`} 
                style={{ width: `${Math.min(parseFloat(percentOfGoal), 100)}%` }}
              ></div>
          </div>
          <p className="text-xs text-muted-foreground">
             Spent {formatCurrency(currentSpending)} of {formatCurrency(monthlyGoal)} budget
          </p>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-primary">
                <Info className="w-5 h-5" />
                <CardTitle className="text-sm font-bold uppercase tracking-wider">Activity Summary</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-1">{totalCount} Transactions</div>
          <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                  <ArrowUpRight className="w-3 h-3" />
                  +3 this week
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  View full history
              </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Insights;
