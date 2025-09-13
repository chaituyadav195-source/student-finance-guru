import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { 
  CreditCard, 
  Calculator, 
  TrendingUp, 
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Plus,
  Banknote
} from "lucide-react";

const existingLoans = [
  {
    id: 1,
    type: "Student Loan",
    lender: "SBI Education Loan",
    principal: 500000,
    currentBalance: 425000,
    interestRate: 8.5,
    emiAmount: 6200,
    nextDueDate: "15 Jul 2024",
    status: "active",
    tenure: 84,
    paidTenure: 18
  },
  {
    id: 2,
    type: "Personal Loan",
    lender: "HDFC Personal Loan",
    principal: 100000,
    currentBalance: 45000,
    interestRate: 12.0,
    emiAmount: 2400,
    nextDueDate: "20 Jul 2024",
    status: "active",
    tenure: 48,
    paidTenure: 28
  }
];

const loanOffers = [
  {
    id: 1,
    lender: "ICICI Bank",
    type: "Education Loan",
    maxAmount: 1000000,
    interestRate: 8.2,
    processingFee: 0.5,
    features: ["No collateral up to ₹7.5L", "Moratorium period", "Tax benefits"],
    rating: 4.5
  },
  {
    id: 2,
    lender: "Axis Bank",
    type: "Student Credit Card",
    maxAmount: 50000,
    interestRate: 24.0,
    processingFee: 0,
    features: ["No annual fee", "Reward points", "Online bill pay"],
    rating: 4.2
  }
];

export const LoansSection = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [calculatedEMI, setCalculatedEMI] = useState(0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const n = parseFloat(tenure);
    
    if (P && r && n) {
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setCalculatedEMI(emi);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald/20 text-emerald';
      case 'overdue': return 'bg-danger/20 text-danger';
      case 'completed': return 'bg-saffron/20 text-saffron';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8">
      {/* Loan Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-primary border-primary/20 shadow-glow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-foreground/70 text-sm">Total Loan Balance</p>
              <p className="text-2xl font-bold text-primary-foreground">
                {formatCurrency(470000)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-3 w-3 text-warning" />
                <span className="text-xs text-warning">2 active loans</span>
              </div>
            </div>
            <CreditCard className="h-8 w-8 text-primary-foreground/70" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-saffron/20 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-card-foreground/70 text-sm">Monthly EMI</p>
              <p className="text-2xl font-bold text-card-foreground">
                {formatCurrency(8600)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <Calendar className="h-3 w-3 text-saffron" />
                <span className="text-xs text-saffron">Next due: 15 Jul</span>
              </div>
            </div>
            <DollarSign className="h-8 w-8 text-saffron" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-emerald/20 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-card-foreground/70 text-sm">Credit Score</p>
              <p className="text-2xl font-bold text-card-foreground">742</p>
              <div className="flex items-center gap-1 mt-2">
                <CheckCircle className="h-3 w-3 text-emerald" />
                <span className="text-xs text-emerald">Good</span>
              </div>
            </div>
            <TrendingUp className="h-8 w-8 text-emerald" />
          </div>
        </Card>
      </div>

      {/* Active Loans */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-card-foreground">Active Loans</h3>
          <Button className="bg-gradient-saffron hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" />
            Apply for Loan
          </Button>
        </div>

        <div className="space-y-4">
          {existingLoans.map((loan) => {
            const progressPercentage = ((loan.tenure - loan.paidTenure) / loan.tenure) * 100;
            const paidPercentage = (loan.paidTenure / loan.tenure) * 100;
            
            return (
              <div key={loan.id} className="p-4 bg-gradient-glass border border-border/20 rounded-lg backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-card-foreground">{loan.type}</h4>
                    <p className="text-sm text-muted-foreground">{loan.lender}</p>
                  </div>
                  <Badge className={getStatusColor(loan.status)}>
                    {loan.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Current Balance</p>
                    <p className="font-semibold text-card-foreground">
                      {formatCurrency(loan.currentBalance)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">EMI Amount</p>
                    <p className="font-semibold text-card-foreground">
                      {formatCurrency(loan.emiAmount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Interest Rate</p>
                    <p className="font-semibold text-card-foreground">
                      {loan.interestRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Next Due</p>
                    <p className="font-semibold text-card-foreground">
                      {loan.nextDueDate}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-card-foreground">
                      Repayment Progress
                    </span>
                    <span className="text-muted-foreground">
                      {loan.paidTenure}/{loan.tenure} months
                    </span>
                  </div>
                  <Progress value={paidPercentage} className="h-2" />
                  <div className="flex justify-between text-xs">
                    <span className="text-emerald">
                      {formatCurrency(loan.principal - loan.currentBalance)} paid
                    </span>
                    <span className="text-muted-foreground">
                      {paidPercentage.toFixed(0)}% complete
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* EMI Calculator */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="h-5 w-5 text-saffron" />
          <h3 className="text-xl font-semibold text-card-foreground">EMI Calculator</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Loan Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="500000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="rate">Interest Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                step="0.1"
                placeholder="8.5"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="tenure">Tenure (months)</Label>
              <Input
                id="tenure"
                type="number"
                placeholder="84"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
              />
            </div>
            <Button 
              onClick={calculateEMI}
              className="w-full bg-gradient-saffron hover:opacity-90"
            >
              Calculate EMI
            </Button>
          </div>

          <div className="p-6 bg-gradient-primary rounded-lg">
            <h4 className="font-medium text-primary-foreground mb-4">Calculation Result</h4>
            {calculatedEMI > 0 ? (
              <div className="space-y-3">
                <div>
                  <p className="text-primary-foreground/70 text-sm">Monthly EMI</p>
                  <p className="text-3xl font-bold text-primary-foreground">
                    {formatCurrency(calculatedEMI)}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-primary-foreground/70">Total Interest</p>
                    <p className="font-semibold text-primary-foreground">
                      {formatCurrency((calculatedEMI * parseFloat(tenure)) - parseFloat(loanAmount))}
                    </p>
                  </div>
                  <div>
                    <p className="text-primary-foreground/70">Total Amount</p>
                    <p className="font-semibold text-primary-foreground">
                      {formatCurrency(calculatedEMI * parseFloat(tenure))}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-primary-foreground/70">
                Enter loan details to calculate EMI
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Loan Offers */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
        <h3 className="text-xl font-semibold text-card-foreground mb-6">Recommended Loan Offers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loanOffers.map((offer) => (
            <div key={offer.id} className="p-4 bg-gradient-glass border border-border/20 rounded-lg backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-card-foreground">{offer.lender}</h4>
                  <p className="text-sm text-muted-foreground">{offer.type}</p>
                </div>
                <Badge className="bg-emerald/20 text-emerald">
                  ⭐ {offer.rating}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Max Amount</p>
                    <p className="font-semibold text-card-foreground">
                      {formatCurrency(offer.maxAmount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Interest Rate</p>
                    <p className="font-semibold text-card-foreground">
                      {offer.interestRate}% p.a.
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Key Features</p>
                  <div className="space-y-1">
                    {offer.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-emerald" />
                        <span className="text-xs text-card-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full border-saffron text-saffron hover:bg-saffron hover:text-saffron-foreground">
                  Apply Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Insights for Loans */}
      <Card className="p-6 bg-gradient-emerald border-emerald/20 shadow-card">
        <div className="flex items-center gap-3">
          <Banknote className="h-6 w-6 text-emerald-foreground" />
          <div>
            <h4 className="font-medium text-emerald-foreground">Smart Loan Advice</h4>
            <p className="text-emerald-foreground/80 text-sm">
              Based on your spending patterns, you can afford a maximum EMI of ₹12,000/month. 
              Consider prepaying your personal loan to save ₹18,500 in interest.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};