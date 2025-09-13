import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const monthlyExpenses = [
  { month: "Jan", amount: 12000 },
  { month: "Feb", amount: 14500 },
  { month: "Mar", amount: 13200 },
  { month: "Apr", amount: 15800 },
  { month: "May", amount: 16200 },
  { month: "Jun", amount: 15420 }
];

const categoryData = [
  { name: "Food", value: 5600, color: "hsl(30, 100%, 55%)" },
  { name: "Transport", value: 2800, color: "hsl(145, 85%, 35%)" },
  { name: "Entertainment", value: 1900, color: "hsl(225, 71%, 25%)" },
  { name: "Shopping", value: 2400, color: "hsl(0, 84%, 60%)" },
  { name: "Education", value: 1800, color: "hsl(210, 20%, 95%)" },
  { name: "Others", value: 920, color: "hsl(240, 8%, 15%)" }
];

export const ExpenseChart = () => {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
      <h3 className="text-xl font-semibold text-card-foreground mb-6">Monthly Spending Trend</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyExpenses}>
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
            <Bar 
              dataKey="amount" 
              fill="url(#gradient)" 
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(30, 100%, 55%)" />
                <stop offset="100%" stopColor="hsl(35, 100%, 65%)" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6">
        <h4 className="text-lg font-medium text-card-foreground mb-4">Category Breakdown</h4>
        <div className="flex items-center justify-center">
          <div className="h-48 w-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="ml-6 space-y-2">
            {categoryData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-card-foreground">{entry.name}</span>
                <span className="text-sm text-muted-foreground">
                  ₹{entry.value.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};