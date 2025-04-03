
import { useState, useEffect } from "react";
import { IndianRupee, Percent, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { formatIndianRupee, formatPercentage } from "@/utils/formatUtils";
import { calculateLumpsum, generateYearlyData, getInvestmentBreakdown } from "@/utils/calculatorUtils";
import ResultChart from "./ResultChart";
import DownloadPDF from "./DownloadPDF";
import EmailForm from "./EmailForm";

const LumpsumCalculator = () => {
  // State for input values
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  
  // State for calculator results
  const [finalAmount, setFinalAmount] = useState(0);
  const [breakdown, setBreakdown] = useState({ principal: 0, returns: 0, wealthGained: 0 });
  const [chartData, setChartData] = useState<any[]>([]);
  
  // Calculate results when inputs change
  useEffect(() => {
    const calculatedAmount = calculateLumpsum(principal, rate, years);
    setFinalAmount(calculatedAmount);
    
    const calculatedBreakdown = getInvestmentBreakdown(principal, calculatedAmount);
    setBreakdown(calculatedBreakdown);
    
    const yearlyData = generateYearlyData(principal, rate, years);
    setChartData(yearlyData);
  }, [principal, rate, years]);
  
  // Handler for principal input
  const handlePrincipalChange = (value: string) => {
    const numValue = parseFloat(value.replace(/,/g, ''));
    if (!isNaN(numValue)) {
      setPrincipal(numValue);
    } else if (value === "") {
      setPrincipal(0);
    }
  };
  
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <Card className="lg:col-span-1 card-shadow">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold text-primary mb-6">Investment Inputs</h2>
            
            <div className="space-y-8">
              {/* Principal Amount Input */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-charcoal">Initial Investment</label>
                  <span className="text-sm text-gray-500">
                    {formatIndianRupee(principal)}
                  </span>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <IndianRupee size={16} className="text-gray-500" />
                  </div>
                  <Input
                    type="text"
                    value={principal.toLocaleString("en-IN")}
                    onChange={(e) => handlePrincipalChange(e.target.value)}
                    className="pl-9 input-field"
                  />
                </div>
                
                <Slider
                  value={[principal]}
                  min={1000}
                  max={10000000}
                  step={1000}
                  className="calculator-slider"
                  onValueChange={(value) => setPrincipal(value[0])}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>₹1K</span>
                  <span>₹1Cr</span>
                </div>
              </div>
              
              {/* Expected Return Rate Input */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-charcoal">Expected Return Rate</label>
                  <span className="text-sm text-gray-500">
                    {formatPercentage(rate)}
                  </span>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Percent size={16} className="text-gray-500" />
                  </div>
                  <Input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                    min={1}
                    max={30}
                    step={0.1}
                    className="pl-9 input-field"
                  />
                </div>
                
                <Slider
                  value={[rate]}
                  min={1}
                  max={30}
                  step={0.1}
                  className="calculator-slider"
                  onValueChange={(value) => setRate(value[0])}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>
              
              {/* Time Period Input */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-charcoal">Time Period (Years)</label>
                  <span className="text-sm text-gray-500">
                    {years} {years === 1 ? "year" : "years"}
                  </span>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Calendar size={16} className="text-gray-500" />
                  </div>
                  <Input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(parseInt(e.target.value) || 0)}
                    min={1}
                    max={50}
                    className="pl-9 input-field"
                  />
                </div>
                
                <Slider
                  value={[years]}
                  min={1}
                  max={50}
                  className="calculator-slider"
                  onValueChange={(value) => setYears(value[0])}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1 year</span>
                  <span>50 years</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Results Section */}
        <Card className="lg:col-span-2 card-shadow">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold text-primary mb-6">Investment Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div className="bg-primary/10 rounded-lg p-4">
                <div className="text-primary text-sm font-medium">Initial Investment</div>
                <div className="text-2xl font-semibold mt-1">{formatIndianRupee(principal)}</div>
              </div>
              
              <div className="bg-secondary/20 rounded-lg p-4">
                <div className="text-primary text-sm font-medium">Total Returns</div>
                <div className="text-2xl font-semibold mt-1">{formatIndianRupee(breakdown.returns)}</div>
              </div>
              
              <div className="bg-accent/20 rounded-lg p-4">
                <div className="text-primary text-sm font-medium">Absolute Returns</div>
                <div className="text-2xl font-semibold mt-1">{breakdown.wealthGained}%</div>
              </div>
              
              <div className="bg-blue/10 rounded-lg p-4">
                <div className="text-primary text-sm font-medium">Final Amount</div>
                <div className="text-2xl font-semibold mt-1">{formatIndianRupee(finalAmount)}</div>
              </div>
            </div>
            
            <ResultChart data={chartData} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <DownloadPDF principal={principal} rate={rate} years={years} />
              <EmailForm 
                principal={principal}
                rate={rate}
                years={years}
                finalAmount={finalAmount}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LumpsumCalculator;
