import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Brain, TrendingUp, AlertCircle, Target } from "lucide-react";

const predictiveData = [
  { month: "Jul", actual: 15420, predicted: 16800 },
  { month: "Aug", actual: null, predicted: 17200 },
  { month: "Sep", actual: null, predicted: 16900 },
  { month: "Oct", actual: null, predicted: 18500 },
  { month: "Nov", actual: null, predicted: 17800 },
  { month: "Dec", actual: null, predicted: 19200 }
];

const aiInsights = [
  {
    type: "warning",
    title: "Budget Risk Alert",
    description: "You're likely to exceed your food budget by ₹800 this month",
    confidence: 85,
    action: "Reduce dining out by 2 meals/week"
  },
  {
    type: "opportunity",
    title: "Savings Opportunity",
    description: "Switch to metro for daily commute to save ₹1,200/month",
    confidence: 92,
    action: "Consider monthly metro pass"
  },
  {
    type: "goal",
    title: "Savings Goal Progress",
    description: "On track to achieve your ₹5,000 monthly savings goal",
    confidence: 78,
    action: "Maintain current spending pattern"
  }
];

export const PredictiveAnalytics = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-danger/20 text-danger border-danger/30';
      case 'opportunity': return 'bg-emerald/20 text-emerald border-emerald/30';
      case 'goal': return 'bg-saffron/20 text-saffron border-saffron/30';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertCircle;
      case 'opportunity': return TrendingUp;
      case 'goal': return Target;
      default: return Brain;
    }
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-saffron" />
          <h3 className="text-xl font-semibold text-card-foreground">AI Predictions</h3>
        </div>
        <Badge className="bg-saffron/20 text-saffron">
          ML Powered
        </Badge>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-medium text-card-foreground mb-4">6-Month Spending Forecast</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={predictiveData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `₹${value/1000}k`}
              />
              <Area
                type="monotone"
                dataKey="predicted"
                stroke="hsl(30, 100%, 55%)"
                fill="url(#predictionGradient)"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="hsl(145, 85%, 35%)"
                strokeWidth={3}
                dot={{ fill: "hsl(145, 85%, 35%)", strokeWidth: 2, r: 4 }}
              />
              <defs>
                <linearGradient id="predictionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(30, 100%, 55%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(30, 100%, 55%)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-card-foreground">AI Insights & Recommendations</h4>
        {aiInsights.map((insight, index) => {
          const IconComponent = getInsightIcon(insight.type);
          
          return (
            <div 
              key={index} 
              className={`p-4 rounded-lg border backdrop-blur-sm ${getInsightColor(insight.type)}`}
            >
              <div className="flex items-start gap-3">
                <IconComponent className="h-5 w-5 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">{insight.title}</h5>
                    <Badge variant="outline" className="text-xs">
                      {insight.confidence}% confidence
                    </Badge>
                  </div>
                  <p className="text-sm opacity-90 mb-3">
                    {insight.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">
                      Recommended: {insight.action}
                    </span>
                    <Button variant="ghost" size="sm" className="h-6 text-xs">
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-primary rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-primary-foreground">Smart Alerts</h4>
            <p className="text-primary-foreground/80 text-sm">
              Get notified when your spending patterns change
            </p>
          </div>
          <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20">
            Configure
          </Button>
        </div>
      </div>
    </Card>
  );
};