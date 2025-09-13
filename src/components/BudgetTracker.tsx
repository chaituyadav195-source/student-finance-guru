import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Plus, Target, TrendingUp, TrendingDown } from "lucide-react";

const budgetCategories = [
  {
    name: "Food & Dining",
    budget: 6000,
    spent: 5600,
    status: "warning"
  },
  {
    name: "Transportation",
    budget: 3000,
    spent: 2800,
    status: "good"
  },
  {
    name: "Entertainment",
    budget: 2000,
    spent: 1900,
    status: "good"
  },
  {
    name: "Shopping",
    budget: 2500,
    spent: 2400,
    status: "warning"
  },
  {
    name: "Education",
    budget: 2000,
    spent: 1800,
    status: "good"
  }
];

export const BudgetTracker = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-emerald/20 text-emerald';
      case 'warning': return 'bg-warning/20 text-warning';
      case 'danger': return 'bg-danger/20 text-danger';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage < 70) return 'bg-emerald';
    if (percentage < 90) return 'bg-warning';
    return 'bg-danger';
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-card-foreground">Budget Tracker</h3>
        <Button size="sm" className="bg-gradient-saffron hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Add Budget
        </Button>
      </div>

      <div className="space-y-6">
        {budgetCategories.map((category, index) => {
          const percentage = (category.spent / category.budget) * 100;
          const remaining = category.budget - category.spent;
          
          return (
            <div key={index} className="p-4 bg-gradient-glass border border-border/20 rounded-lg backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-card-foreground">{category.name}</h4>
                <Badge className={getStatusColor(category.status)}>
                  {category.status === 'good' ? (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  )}
                  {percentage.toFixed(0)}%
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-card-foreground">
                    Spent: {formatCurrency(category.spent)}
                  </span>
                  <span className="text-muted-foreground">
                    Budget: {formatCurrency(category.budget)}
                  </span>
                </div>
                
                <Progress 
                  value={percentage} 
                  className="h-2"
                />
                
                <div className="flex justify-between text-xs">
                  <span className={remaining > 0 ? "text-emerald" : "text-danger"}>
                    {remaining > 0 ? 
                      `${formatCurrency(remaining)} remaining` : 
                      `${formatCurrency(Math.abs(remaining))} over budget`
                    }
                  </span>
                  <span className="text-muted-foreground">
                    {(100 - percentage).toFixed(0)}% left
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-primary rounded-lg">
        <div className="flex items-center gap-3">
          <Target className="h-5 w-5 text-primary-foreground" />
          <div>
            <h4 className="font-medium text-primary-foreground">Monthly Goal Status</h4>
            <p className="text-primary-foreground/70 text-sm">
              You're on track to save ₹4,580 this month!
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};