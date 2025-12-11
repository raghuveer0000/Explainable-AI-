import { ReactNode } from "react";
import { Brain, TrendingDown, BarChart3, Sparkles } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-secondary">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">ChurnAI</span>
          </div>
          
          <h1 className="font-display text-4xl xl:text-5xl font-bold leading-tight mb-6">
            <span className="text-foreground">Predict & Prevent</span>
            <br />
            <span className="gradient-text">Customer Churn</span>
          </h1>
          
          <p className="text-muted-foreground text-lg mb-12 max-w-md">
            Leverage explainable AI to understand why customers leave and take action before it's too late.
          </p>
          
          <div className="space-y-4">
            <FeatureItem icon={<TrendingDown className="w-5 h-5" />} text="Reduce churn by up to 25%" />
            <FeatureItem icon={<BarChart3 className="w-5 h-5" />} text="Real-time predictive analytics" />
            <FeatureItem icon={<Sparkles className="w-5 h-5" />} text="Transparent AI explanations" />
          </div>
        </div>
      </div>
      
      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">ChurnAI</span>
          </div>
          
          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">{title}</h2>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon, text }: { icon: ReactNode; text: string }) => (
  <div className="flex items-center gap-3 text-foreground/80">
    <div className="p-2 rounded-lg bg-primary/10 text-primary">
      {icon}
    </div>
    <span>{text}</span>
  </div>
);

export default AuthLayout;
