import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface InterpretationSectionProps {
  interpretation: string;
}

const InterpretationSection = ({ interpretation }: InterpretationSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-card rounded-2xl shadow-soft border border-border/50 p-6 md:p-8"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary-soft flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-5 h-5 text-primary" aria-hidden="true" />
        </div>
        
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            AI Interpretation
          </h2>
          <p className="text-foreground/80 leading-relaxed">
            {interpretation}
          </p>
          <p className="text-xs text-muted-foreground italic">
            This interpretation is based on language patterns and is not a clinical assessment.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default InterpretationSection;
