import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExpenseChart } from "./ExpenseChart";
import { BudgetTracker } from "./BudgetTracker";
import { TransactionList } from "./TransactionList";
import { PredictiveAnalytics } from "./PredictiveAnalytics";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Target,
  Bell,
  CreditCard,
  PiggyBank,
  AlertTriangle
} from "lucide-react";

// Mock data for demonstration
const monthlyData = {
  totalSpent: 15420,
  totalBudget: 20000,
  savingsGoal: 5000,
  currentSavings: 3200,
  predictedSpending: 17800
};

const expenseCategories = [
  { name: "Food & Dining", amount: 5600, percentage: 36, trend: "+5%" },
  { name: "Transportation", amount: 2800, percentage: 18, trend: "-2%" },
  { name: "Entertainment", amount: 1900, percentage: 12, trend: "+12%" },
  { name: "Shopping", amount: 2400, percentage: 16, trend: "+8%" },
  { name: "Education", amount: 1800, percentage: 12, trend: "0%" },
  { name: "Others", amount: 920, percentage: 6, trend: "-3%" }
];

export const FinancialDashboard = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const spentPercentage = (monthlyData.totalSpent / monthlyData.totalBudget) * 100;
  const savingsPercentage = (monthlyData.currentSavings / monthlyData.savingsGoal) * 100;

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-saffron bg-clip-text text-transparent">
            FinanceAI
          </h1>
          <p className="text-muted-foreground mt-1">Smart financial management for students</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="border-saffron text-saffron hover:bg-saffron hover:text-saffron-foreground">
            <Bell className="h-4 w-4 mr-2" />
            Alerts (3)
          </Button>
          <Button variant="default" className="bg-gradient-saffron hover:opacity-90">
            <PiggyBank className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-primary border-primary/20 shadow-glow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-foreground/70 text-sm">Total Spent</p>
              <p className="text-2xl font-bold text-primary-foreground">
                {formatCurrency(monthlyData.totalSpent)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-3 w-3 text-warning" />
                <span className="text-xs text-warning">+8% from last month</span>
              </div>
            </div>
            <Wallet className="h-8 w-8 text-primary-foreground/70" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-emerald/20 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-card-foreground/70 text-sm">Budget Status</p>
              <p className="text-2xl font-bold text-card-foreground">
                {spentPercentage.toFixed(0)}%
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="h-3 w-3 text-emerald" />
                <span className="text-xs text-emerald">On track</span>
              </div>
            </div>
            <Target className="h-8 w-8 text-emerald" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-warning/20 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-card-foreground/70 text-sm">Savings Goal</p>
              <p className="text-2xl font-bold text-card-foreground">
                {formatCurrency(monthlyData.currentSavings)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-3 w-3 text-warning" />
                <span className="text-xs text-warning">{savingsPercentage.toFixed(0)}% complete</span>
              </div>
            </div>
            <PiggyBank className="h-8 w-8 text-warning" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-danger/20 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-card-foreground/70 text-sm">Predicted Spending</p>
              <p className="text-2xl font-bold text-card-foreground">
                {formatCurrency(monthlyData.predictedSpending)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <AlertTriangle className="h-3 w-3 text-danger" />
                <span className="text-xs text-danger">Over budget risk</span>
              </div>
            </div>
            <CreditCard className="h-8 w-8 text-danger" />
          </div>
        </Card>
      </div>

      {/* Expense Categories */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
        <h3 className="text-xl font-semibold text-card-foreground mb-6">Expense Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {expenseCategories.map((category, index) => (
            <div key={index} className="p-4 bg-gradient-glass border border-border/20 rounded-lg backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-card-foreground">{category.name}</h4>
                <Badge 
                  variant={category.trend.startsWith('+') ? "destructive" : "default"}
                  className={category.trend.startsWith('+') ? "bg-danger/20 text-danger" : "bg-emerald/20 text-emerald"}
                >
                  {category.trend}
                </Badge>
              </div>
              <p className="text-2xl font-bold text-card-foreground mb-1">
                {formatCurrency(category.amount)}
              </p>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-saffron h-2 rounded-full transition-all duration-500"
                  style={{ width: `${category.percentage}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{category.percentage}% of budget</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseChart />
        <PredictiveAnalytics />
      </div>

      {/* Budget Tracker and Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BudgetTracker />
        <TransactionList />
      </div>
    </div>
  );
};