import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Activity, Zap, Clock, CheckCircle2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface NetworkStat {
  value: string;
  label: string;
}

interface HistoricalData {
  timestamp: string;
  tps: number;
  finality: number;
}

export default function Dashboard() {
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [currentTPS, setCurrentTPS] = useState(10234);
  
  const { data: stats, isLoading } = useQuery<NetworkStat[]>({
    queryKey: ["/api/stats"],
  });

  useEffect(() => {
    const initialData: HistoricalData[] = [];
    const now = Date.now();
    
    for (let i = 30; i >= 0; i--) {
      initialData.push({
        timestamp: new Date(now - i * 2000).toISOString(),
        tps: 8000 + Math.random() * 4000,
        finality: 10 + Math.random() * 4,
      });
    }
    setHistoricalData(initialData);

    const interval = setInterval(() => {
      const newTPS = 8000 + Math.random() * 4000;
      setCurrentTPS(Math.round(newTPS));
      
      setHistoricalData(prev => {
        const newData = [...prev.slice(1), {
          timestamp: new Date().toISOString(),
          tps: newTPS,
          finality: 10 + Math.random() * 4,
        }];
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      icon: Zap,
      label: "Current TPS",
      value: currentTPS.toLocaleString(),
      change: "+12.5%",
      color: "text-primary",
    },
    {
      icon: Clock,
      label: "Avg Finality",
      value: "11.2s",
      change: "-0.8s",
      color: "text-blue-500",
    },
    {
      icon: Activity,
      label: "Active Validators",
      value: "2,847",
      change: "+156",
      color: "text-green-500",
    },
    {
      icon: CheckCircle2,
      label: "Network Uptime",
      value: "99.99%",
      change: "Last 30 days",
      color: "text-emerald-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Network <span className="text-primary">Dashboard</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-16">
            Real-time network statistics and performance metrics
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border-2 border-border rounded-lg p-6">
                <div className="h-16 bg-muted/30 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-5xl md:text-7xl font-bold mb-4" data-testid="text-dashboard-title">
          Network <span className="text-primary">Dashboard</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-16">
          Real-time network statistics and performance metrics
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, i) => (
            <div
              key={i}
              className="border-2 border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300"
              data-testid={`stat-card-${i}`}
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <span className="text-sm text-muted-foreground">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold mb-1" data-testid={`stat-value-${i}`}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="border-2 border-border rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-6">Transactions Per Second</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={historicalData}>
                <defs>
                  <linearGradient id="tpsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(time) => new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  labelFormatter={(time) => new Date(time as string).toLocaleTimeString()}
                  formatter={(value: number) => [`${Math.round(value).toLocaleString()} TPS`, 'Throughput']}
                />
                <Area
                  type="monotone"
                  dataKey="tps"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#tpsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="border-2 border-border rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-6">Block Finality Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(time) => new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  labelFormatter={(time) => new Date(time as string).toLocaleTimeString()}
                  formatter={(value: number) => [`${value.toFixed(1)}s`, 'Finality']}
                />
                <Line
                  type="monotone"
                  dataKey="finality"
                  stroke="hsl(220 90% 56%)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border-2 border-border rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6">Network Health</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-muted-foreground mb-2">Peak TPS (24h)</div>
              <div className="text-2xl font-bold">12,487</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Avg Block Time</div>
              <div className="text-2xl font-bold">0.8s</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Total Blocks</div>
              <div className="text-2xl font-bold">8,234,567</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Active Nodes</div>
              <div className="text-2xl font-bold">4,921</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Network Hash Rate</div>
              <div className="text-2xl font-bold">42.5 PH/s</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Mempool Size</div>
              <div className="text-2xl font-bold">1,234</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
