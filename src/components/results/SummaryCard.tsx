import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SummaryCardProps {
  score: number;
  severity: string;
  confidence: number;
}

const getSeverityColor = (severity: string) => {
  const colors: Record<string, string> = {
    "Minimal": "bg-success-soft text-severity-minimal",
    "Mild": "bg-success-soft text-severity-mild",
    "Moderate": "bg-warning-soft text-severity-moderate",
    "Moderately Severe": "bg-warning-soft text-severity-moderately-severe",
    "Severe": "bg-severe-soft text-severity-severe",
  };
  return colors[severity] || colors["Minimal"];
};

const getConfidenceLabel = (confidence: number) => {
  if (confidence >= 0.85) return "High";
  if (confidence >= 0.70) return "Moderate";
  return "Low";
};

const SummaryCard = ({ score, severity, confidence }: SummaryCardProps) => {
  const confidenceLabel = getConfidenceLabel(confidence);
  const confidencePercent = Math.round(confidence * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-3xl shadow-card border border-border/50 p-8 md:p-10"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Score display */}
        <div className="text-center md:text-left">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
            PHQ-9 Assessment Score
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-6xl md:text-7xl font-bold text-foreground">{score}</span>
            <span className="text-2xl text-muted-foreground font-medium">/ 27</span>
          </div>
        </div>

        {/* Severity badge */}
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Severity Level
          </p>
          <span className={`
            inline-block px-6 py-2.5 rounded-full text-base font-semibold
            ${getSeverityColor(severity)}
          `}>
            {severity}
          </span>
        </div>

        {/* Confidence indicator */}
        <div className="text-center md:text-right min-w-[160px]">
          <div className="flex items-center justify-center md:justify-end gap-2 mb-3">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Confidence
            </p>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className="text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                  aria-label="Learn more about confidence score"
                >
                  <Info className="w-4 h-4" aria-hidden="true" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Confidence reflects how consistent the language patterns are. Higher confidence indicates clearer patterns in the text.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${confidencePercent}%` }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-full bg-primary rounded-full"
              />
            </div>
            <p className="text-sm font-medium text-foreground">
              {confidenceLabel} ({confidencePercent}%)
            </p>
          </div>
        </div>
      </div>

      {/* Contextual message */}
      <div className="mt-8 pt-6 border-t border-border/50">
        <p className="text-sm text-muted-foreground text-center md:text-left">
          The system shows {confidenceLabel.toLowerCase()} confidence based on {" "}
          {confidence >= 0.8 ? "consistent" : "mixed"} language patterns.
        </p>
      </div>
    </motion.div>
  );
};

export default SummaryCard;
