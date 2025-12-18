import { motion } from "framer-motion";
import { UserCheck, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfessionalGuidanceProps {
  guidance: string;
  severity: string;
  confidenceNote: string;
}

const ProfessionalGuidance = ({ guidance, severity, confidenceNote }: ProfessionalGuidanceProps) => {
  const isSevere = severity === "Severe" || severity === "Moderately Severe";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={`
        rounded-2xl shadow-soft border p-6 md:p-8
        ${isSevere 
          ? "bg-secondary border-secondary-foreground/20" 
          : "bg-card border-border/50"
        }
      `}
    >
      <div className="flex items-start gap-4">
        <div className={`
          w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
          ${isSevere ? "bg-secondary-foreground/10" : "bg-primary-soft"}
        `}>
          <UserCheck 
            className={`w-5 h-5 ${isSevere ? "text-secondary-foreground" : "text-primary"}`} 
            aria-hidden="true" 
          />
        </div>

        <div className="space-y-4 flex-1">
          <h2 className="text-lg font-semibold text-foreground">
            Professional Guidance
          </h2>

          <p className="text-foreground/80 leading-relaxed">
            {guidance}
          </p>

          {/* Confidence note */}
          <div className="p-3 rounded-lg bg-muted/50 border border-border/30">
            <p className="text-xs text-muted-foreground">
              {confidenceNote}
            </p>
          </div>

          {/* Support resources for severe cases */}
          {isSevere && (
            <div className="pt-4 border-t border-border/30 space-y-4">
              <p className="text-sm font-medium text-foreground">
                Support resources are available:
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Button variant="warm" size="sm" asChild>
                  <a 
                    href="tel:988" 
                    className="flex items-center gap-2"
                    aria-label="Call 988 Suicide and Crisis Lifeline"
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    988 Lifeline (US)
                  </a>
                </Button>
                
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href="https://findahelpline.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    Find Local Support
                  </a>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                If you're in immediate danger, please contact emergency services.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfessionalGuidance;
