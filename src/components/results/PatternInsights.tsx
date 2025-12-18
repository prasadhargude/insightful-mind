import { motion } from "framer-motion";
import { Activity, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { PHQPattern } from "@/services/api";

interface PatternInsightsProps {
  patterns: PHQPattern[];
}

const getSignalColor = (signal: string) => {
  const colors: Record<string, string> = {
    "High": "bg-severe-soft text-severity-severe",
    "Moderate": "bg-warning-soft text-severity-moderate",
    "Low": "bg-success-soft text-severity-minimal",
    "Not detected": "bg-muted text-muted-foreground",
  };
  return colors[signal] || colors["Not detected"];
};

const PatternInsights = ({ patterns }: PatternInsightsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card rounded-2xl shadow-soft border border-border/50 p-6 md:p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <Activity className="w-5 h-5 text-accent-foreground" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">
            PHQ-9 Pattern Insights
          </h2>
        </div>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              className="text-muted-foreground/60 hover:text-muted-foreground transition-colors"
              aria-label="Learn about pattern insights"
            >
              <Info className="w-5 h-5" aria-hidden="true" />
            </button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>These indicators are inferred from language patterns and are not a clinical assessment.</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {patterns.map((pattern, index) => (
          <motion.div
            key={pattern.area}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
            className="p-4 rounded-xl bg-muted/30 border border-border/30"
          >
            <p className="text-sm font-medium text-foreground mb-2">
              {pattern.area}
            </p>
            <span className={`
              inline-block px-3 py-1 rounded-full text-xs font-medium
              ${getSignalColor(pattern.signal)}
            `}>
              {pattern.signal}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PatternInsights;
