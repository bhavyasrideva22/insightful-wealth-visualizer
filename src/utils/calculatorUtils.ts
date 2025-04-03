
/**
 * Calculates the lumpsum investment growth over a period of time
 * @param principal The initial investment amount
 * @param rate The annual return rate (in percentage)
 * @param years The investment duration in years
 * @returns The final amount after the investment period
 */
export const calculateLumpsum = (principal: number, rate: number, years: number): number => {
  // Using the compound interest formula for lumpsum calculation
  // A = P(1 + r)^t where
  // A = Final amount, P = Principal, r = Rate of interest, t = Time period
  const compoundRate = 1 + rate / 100;
  const finalAmount = principal * Math.pow(compoundRate, years);
  return Math.round(finalAmount);
};

/**
 * Generates an array of yearly data points for the chart
 * @param principal The initial investment amount
 * @param rate The annual return rate (in percentage)
 * @param years The investment duration in years
 * @returns An array of data points for chart
 */
export const generateYearlyData = (principal: number, rate: number, years: number) => {
  const data = [];
  let currentValue = principal;
  
  // Add initial value at year 0
  data.push({
    year: 0,
    amount: principal,
    principal: principal,
    returns: 0
  });
  
  // Calculate for each year
  for (let year = 1; year <= years; year++) {
    currentValue = calculateLumpsum(principal, rate, year);
    const returns = currentValue - principal;
    
    data.push({
      year,
      amount: currentValue,
      principal: principal,
      returns
    });
  }
  
  return data;
};

/**
 * Calculates the breakdown of investment components
 * @param principal The initial investment amount
 * @param finalAmount The amount after investment growth
 * @returns Object containing principal and growth values
 */
export const getInvestmentBreakdown = (principal: number, finalAmount: number) => {
  const returns = finalAmount - principal;
  
  return {
    principal,
    returns,
    wealthGained: Math.round((returns / principal) * 100)
  };
};
