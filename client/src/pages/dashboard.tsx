import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";
import { Activity, Zap, Clock, CheckCircle2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import type { RealtimeNetworkData } from "@shared/schema";

interface HistoricalData {
  timestamp: string;
  tps: number;
  finality: number;
}

export default function Dashboard() {
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [currentData, setCurrentData] = useState<RealtimeNetworkData | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [wsConnected, setWsConnected] = useState(false);

  const { data: stats, isLoading } = useQuery<{ value: string; label: string }[]>({
    queryKey: ["/api/stats"],
  });

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws/stats`;
    
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
      setWsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data: RealtimeNetworkData = JSON.parse(event.data);
        setCurrentData(data);

        setHistoricalData((prev) => {
          const newData = [...prev, {
            timestamp: data.timestamp,
            tps: data.tps,
            finality: data.finality,
          }];
          
          if (newData.length > 31) {
            return newData.slice(-31);
          }
          return newData;
        });
      } catch (error) {
        console.error("Error parsing WebSocket data:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setWsConnected(false);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setWsConnected(false);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  const statCards = [
    {
      icon: Zap,
      label: "Current TPS",
      value: currentData ? currentData.tps.toLocaleString() : "Loading...",
      change: "+12.5%",
      color: "text-primary",
    },
    {
      icon: Clock,
      label: "Avg Finality",
      value: currentData ? `${currentData.finality}s` : "Loading...",
      change: "-0.8s",
      color: "text-blue-500",
    },
    {
      icon: Activity,
      label: "Active Validators",
      value: currentData ? currentData.activeValidators.toLocaleString() : "Loading...",
      change: "+156",
      color: "text-green-500",
    },
    {
      icon: CheckCircle2,
      label: "Network Uptime",
      value: currentData ? `${currentData.uptime}%` : "Loading...",
      change: "Last 30 days",
      color: "text-emerald-500",
    },
  ];

  if (isLoading || !currentData) {
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
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-5xl md:text-7xl font-bold" data-testid="text-dashboard-title">
            Network <span className="text-primary">Dashboard</span>
          </h1>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${wsConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm text-muted-foreground">
              {wsConnected ? 'Live' : 'Disconnected'}
            </span>
          </div>
        </div>
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
            {historicalData.length > 0 ? (
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
            ) : (
              <div className="flex items-center justify-center h-[300px]">
                <p className="text-muted-foreground">Waiting for data...</p>
              </div>
            )}
          </div>

          <div className="border-2 border-border rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-6">Block Finality Time</h3>
            {historicalData.length > 0 ? (
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
            ) : (
              <div className="flex items-center justify-center h-[300px]">
                <p className="text-muted-foreground">Waiting for data...</p>
              </div>
            )}
          </div>
        </div>

        <div className="border-2 border-border rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6">Network Health</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-muted-foreground mb-2">Peak TPS (24h)</div>
              <div className="text-2xl font-bold">{currentData.peakTPS.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Avg Block Time</div>
              <div className="text-2xl font-bold">{currentData.avgBlockTime}s</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Total Blocks</div>
              <div className="text-2xl font-bold">{currentData.totalBlocks.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Active Nodes</div>
              <div className="text-2xl font-bold">{currentData.activeNodes.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Network Hash Rate</div>
              <div className="text-2xl font-bold">{currentData.networkHashRate}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Mempool Size</div>
              <div className="text-2xl font-bold">{currentData.mempoolSize.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
