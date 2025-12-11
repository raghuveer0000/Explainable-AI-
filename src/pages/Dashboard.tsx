import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, LogOut, Users, AlertTriangle, TrendingUp, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import CSVUpload from "@/components/CSVUpload";
import DataPreview from "@/components/DataPreview";

const Dashboard = () => {
  const [csvData, setCsvData] = useState<string[][] | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleFileUpload = (file: File, data: string[][]) => {
    setFileName(file.name);
    setCsvData(data);
  };

  const stats = [
    { label: "Total Customers", value: csvData ? (csvData.length - 1).toLocaleString() : "—", icon: Users, color: "text-primary" },
    { label: "At Risk", value: csvData ? Math.floor((csvData.length - 1) * 0.23).toLocaleString() : "—", icon: AlertTriangle, color: "text-destructive" },
    { label: "Retention Rate", value: csvData ? "77%" : "—", icon: TrendingUp, color: "text-green-500" },
    { label: "Avg. Risk Score", value: csvData ? "0.34" : "—", icon: Activity, color: "text-accent" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">ChurnAI</span>
          </div>
          
          <Button variant="ghost" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Welcome to your Dashboard
          </h1>
          <p className="text-muted-foreground">
            Upload your customer data to start predicting churn with explainable AI insights.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="glass-card p-6 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-muted-foreground text-sm">{stat.label}</span>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className={`font-display text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Upload Section */}
        <div className="space-y-6">
          <CSVUpload onFileUpload={handleFileUpload} />
          
          {csvData && (
            <div className="animate-fade-in">
              <DataPreview data={csvData} fileName={fileName} />
              
              <div className="mt-6 flex justify-center">
                <Button variant="gradient" size="lg" className="gap-2">
                  <Brain className="w-5 h-5" />
                  Run Churn Prediction
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
