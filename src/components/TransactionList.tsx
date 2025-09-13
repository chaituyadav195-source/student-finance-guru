import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Coffee, 
  Car, 
  ShoppingBag, 
  BookOpen, 
  Gamepad2, 
  MoreHorizontal,
  TrendingUp,
  Search
} from "lucide-react";

const transactions = [
  {
    id: 1,
    description: "Café Coffee Day",
    category: "Food & Dining",
    amount: -250,
    date: "Today, 2:30 PM",
    icon: Coffee,
    color: "text-warning"
  },
  {
    id: 2,
    description: "Uber Ride",
    category: "Transportation",
    amount: -120,
    date: "Today, 11:45 AM",
    icon: Car,
    color: "text-emerald"
  },
  {
    id: 3,
    description: "Myntra Purchase",
    category: "Shopping",
    amount: -1500,
    date: "Yesterday, 6:20 PM",
    icon: ShoppingBag,
    color: "text-danger"
  },
  {
    id: 4,
    description: "Course Fee Refund",
    category: "Education",
    amount: +500,
    date: "Yesterday, 3:15 PM",
    icon: BookOpen,
    color: "text-primary"
  },
  {
    id: 5,
    description: "Steam Game",
    category: "Entertainment",
    amount: -899,
    date: "2 days ago",
    icon: Gamepad2,
    color: "text-saffron"
  },
  {
    id: 6,
    description: "Zomato Order",
    category: "Food & Dining",
    amount: -380,
    date: "2 days ago",
    icon: Coffee,
    color: "text-warning"
  }
];

export const TransactionList = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(Math.abs(amount));
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'Food & Dining': return 'bg-warning/20 text-warning';
      case 'Transportation': return 'bg-emerald/20 text-emerald';
      case 'Shopping': return 'bg-danger/20 text-danger';
      case 'Education': return 'bg-primary/20 text-primary';
      case 'Entertainment': return 'bg-saffron/20 text-saffron';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-card-foreground">Recent Transactions</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button variant="outline" size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => {
          const IconComponent = transaction.icon;
          const isIncome = transaction.amount > 0;
          
          return (
            <div 
              key={transaction.id} 
              className="flex items-center justify-between p-4 bg-gradient-glass border border-border/20 rounded-lg backdrop-blur-sm hover:bg-card/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full bg-card/30 ${transaction.color}`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-card-foreground">
                    {transaction.description}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getCategoryBadgeColor(transaction.category)}>
                      {transaction.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {transaction.date}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`font-semibold ${
                  isIncome ? 'text-emerald' : 'text-card-foreground'
                }`}>
                  {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 mt-1">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-emerald rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-emerald-foreground">AI Insights</h4>
            <p className="text-emerald-foreground/80 text-sm">
              You spend 23% more on weekends. Consider setting weekend budget limits.
            </p>
          </div>
          <Button variant="ghost" className="text-emerald-foreground hover:bg-emerald-foreground/20">
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};