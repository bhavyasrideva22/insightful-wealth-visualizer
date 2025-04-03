
import { CalculatorIcon } from "lucide-react";
import LumpsumCalculator from "@/components/LumpsumCalculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-primary text-white py-5 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalculatorIcon size={24} />
              <h1 className="text-xl font-heading font-semibold text-white">Insightful Wealth Visualizer</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <section className="mb-10">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                Lumpsum Investment Calculator
              </h1>
              <p className="text-charcoal/80 max-w-2xl mx-auto">
                Plan your financial future with precision using our interactive calculator.
                See how your one-time investment can grow over time.
              </p>
            </div>

            <LumpsumCalculator />
          </section>

          {/* Educational Section */}
          <section className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-10 animate-fade-in">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">
              Understanding Lumpsum Investments
            </h2>
            
            <div className="space-y-4 text-charcoal/90">
              <p>
                Lumpsum investment refers to investing a significant amount of money all at once in a particular investment avenue, 
                rather than investing at regular intervals. This one-time investment strategy can be highly effective when markets 
                are at their lowest point or when you have a substantial amount of capital available.
              </p>
              
              <h3 className="text-xl font-semibold text-primary mt-6 mb-2">
                Benefits of Lumpsum Investments
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-secondary/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Potential for Higher Returns</h4>
                  <p className="text-sm">
                    When markets are at lower levels, investing a lumpsum amount can potentially generate higher returns 
                    as markets recover over time.
                  </p>
                </div>
                
                <div className="bg-secondary/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Immediate Full Exposure</h4>
                  <p className="text-sm">
                    Your entire investment amount is immediately exposed to the market, allowing you to capture full benefits 
                    of market appreciation from day one.
                  </p>
                </div>
                
                <div className="bg-secondary/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Lower Transaction Costs</h4>
                  <p className="text-sm">
                    Making a single large investment typically incurs lower overall transaction costs compared to multiple smaller investments.
                  </p>
                </div>
                
                <div className="bg-secondary/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Simplified Investment Strategy</h4>
                  <p className="text-sm">
                    One-time investments require less ongoing attention and management compared to regular investment plans.
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-primary mt-6 mb-2">
                When to Consider Lumpsum Investments
              </h3>
              
              <p>
                Lumpsum investments can be most advantageous in certain scenarios:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  <span className="font-medium">Market Corrections:</span> During market downturns, investing a lumpsum amount can 
                  potentially yield significant returns when markets eventually recover.
                </li>
                <li>
                  <span className="font-medium">Windfall Gains:</span> When you receive a large sum of money unexpectedly, such as 
                  an inheritance, bonus, or proceeds from property sale.
                </li>
                <li>
                  <span className="font-medium">Long-Term Perspective:</span> If you have a long investment horizon (10+ years), 
                  short-term market volatility becomes less relevant to your overall returns.
                </li>
                <li>
                  <span className="font-medium">Low-Risk Investments:</span> For relatively stable investment avenues like government bonds 
                  or fixed deposits where market volatility is minimal.
                </li>
              </ul>
              
              <h3 className="text-xl font-semibold text-primary mt-6 mb-2">
                How to Use This Calculator
              </h3>
              
              <p>
                Our Lumpsum Investment Calculator helps you visualize how your one-time investment can grow over time:
              </p>
              
              <ol className="list-decimal pl-6 space-y-2 mt-2">
                <li>
                  <span className="font-medium">Enter Your Initial Investment:</span> Input the amount you plan to invest as a lumpsum.
                </li>
                <li>
                  <span className="font-medium">Set Expected Return Rate:</span> Based on your investment avenue and risk tolerance, 
                  specify the annual rate of return you expect.
                </li>
                <li>
                  <span className="font-medium">Choose Time Period:</span> Select the number of years you plan to stay invested.
                </li>
                <li>
                  <span className="font-medium">Analyze Results:</span> Review the projected final amount, growth charts, and detailed breakdown 
                  of principal vs. returns.
                </li>
                <li>
                  <span className="font-medium">Save Your Results:</span> Download a detailed PDF report or email it to yourself for future reference.
                </li>
              </ol>
              
              <div className="bg-blue/10 p-4 rounded-lg mt-4">
                <h4 className="font-semibold text-primary mb-2">Important Note:</h4>
                <p className="text-sm">
                  This calculator provides estimates based on the inputs you provide. Actual returns may vary due to market conditions, 
                  taxes, inflation, and other factors. It's always advisable to consult with a financial advisor before making 
                  significant investment decisions.
                </p>
              </div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-10 animate-fade-in">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-6">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-primary mb-2">
                  Is lumpsum investment better than systematic investment (SIP)?
                </h3>
                <p className="text-charcoal/80">
                  Both strategies have their own merits. Lumpsum investments can potentially yield higher returns if markets are 
                  at lower levels when you invest. However, systematic investments help average out market volatility and are suitable 
                  for regular income earners. Your choice should depend on market conditions, risk tolerance, and financial situation.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-primary mb-2">
                  What is a good expected rate of return for my calculations?
                </h3>
                <p className="text-charcoal/80">
                  Historical data suggests that equity investments in India have generated around 12-15% annual returns over the long term. 
                  For debt instruments, 6-8% might be more realistic. However, past performance doesn't guarantee future returns. 
                  Use conservative estimates for safer projections.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-primary mb-2">
                  How does inflation impact my lumpsum investment returns?
                </h3>
                <p className="text-charcoal/80">
                  Inflation erodes the purchasing power of your investment returns. For example, if your investment earns 12% but inflation 
                  is at 6%, your real (inflation-adjusted) return is approximately 6%. Consider this when planning for long-term financial goals.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-primary mb-2">
                  Can I use this calculator for tax-saving investments like ELSS?
                </h3>
                <p className="text-charcoal/80">
                  Yes, you can use this calculator for tax-saving investments like Equity-Linked Savings Schemes (ELSS). Simply input 
                  the appropriate expected return rate. Remember that ELSS funds come with a lock-in period of three years.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-primary mb-2">
                  Should I consider taxes when interpreting these results?
                </h3>
                <p className="text-charcoal/80">
                  Yes, the returns displayed are before taxes. Different investment avenues are taxed differently in India. For example, 
                  equity investments held for more than one year are subject to Long Term Capital Gains tax at 10% above ₹1 lakh, while 
                  debt investments have different tax implications based on your income tax bracket.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl font-heading font-semibold mb-4">Insightful Wealth Visualizer</h2>
            <p className="text-white/70 text-sm mb-4">
              Our calculators are designed to help you make informed financial decisions. The information provided 
              is for educational purposes only and should not be considered as financial advice.
            </p>
            <p className="text-white/70 text-xs">
              © 2025 Insightful Wealth Visualizer. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
