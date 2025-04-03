
import { useState } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from "recharts";
import { formatLargeNumber } from "@/utils/formatUtils";

interface ResultChartProps {
  data: {
    year: number;
    amount: number;
    principal: number;
    returns: number;
  }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-md shadow-lg">
        <p className="font-semibold text-charcoal mb-1">Year {label}</p>
        <p className="text-primary flex justify-between">
          <span>Total Value:</span>
          <span className="font-semibold ml-4">
            ₹{payload[0].value.toLocaleString('en-IN')}
          </span>
        </p>
        <p className="text-secondary flex justify-between">
          <span>Principal:</span>
          <span className="font-semibold ml-4">
            ₹{payload[1].value.toLocaleString('en-IN')}
          </span>
        </p>
        <p className="text-accent flex justify-between">
          <span>Returns:</span>
          <span className="font-semibold ml-4">
            ₹{(payload[0].value - payload[1].value).toLocaleString('en-IN')}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const ResultChart = ({ data }: ResultChartProps) => {
  const [chartType, setChartType] = useState<"growth" | "breakdown">("growth");
  
  const formatYAxis = (value: number) => {
    return formatLargeNumber(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-primary">Investment Growth</h3>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              chartType === "growth"
                ? "bg-primary text-white"
                : "bg-gray-100 text-charcoal hover:bg-gray-200"
            }`}
            onClick={() => setChartType("growth")}
          >
            Growth
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              chartType === "breakdown"
                ? "bg-primary text-white"
                : "bg-gray-100 text-charcoal hover:bg-gray-200"
            }`}
            onClick={() => setChartType("breakdown")}
          >
            Breakdown
          </button>
        </div>
      </div>
      
      <div className="h-[300px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "growth" ? (
            <AreaChart
              data={data}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#245e4f" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#245e4f" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="year" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#666', fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                tickFormatter={formatYAxis}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#666', fontSize: 12 }}
                tickMargin={10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#245e4f"
                strokeWidth={2}
                fill="url(#colorAmount)"
                animationDuration={1000}
              />
            </AreaChart>
          ) : (
            <AreaChart
              data={data}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
              stackOffset="expand"
            >
              <defs>
                <linearGradient id="colorReturns" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e9c46a" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#e9c46a" stopOpacity={0.3} />
                </linearGradient>
                <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7ac9a7" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#7ac9a7" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="year" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#666', fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#666', fontSize: 12 }}
                tickMargin={10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                iconType="circle" 
                wrapperStyle={{
                  paddingTop: 20
                }}
              />
              <Area
                type="monotone"
                dataKey="returns"
                stackId="1"
                stroke="#e9c46a"
                fill="url(#colorReturns)"
                name="Returns"
              />
              <Area
                type="monotone"
                dataKey="principal"
                stackId="1"
                stroke="#7ac9a7"
                fill="url(#colorPrincipal)"
                name="Principal"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResultChart;
