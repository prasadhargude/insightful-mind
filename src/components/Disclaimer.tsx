import { motion } from "framer-motion";
import { Shield } from "lucide-react";

interface DisclaimerProps {
  variant?: "banner" | "footer";
}

const Disclaimer = ({ variant = "footer" }: DisclaimerProps) => {
  if (variant === "banner") {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full py-3 px-4 bg-muted/50 border-b border-border/50"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Shield className="w-3.5 h-3.5" aria-hidden="true" />
          <p>
            This tool provides supportive insights based on language patterns and is not a medical diagnosis.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <footer className="w-full py-8 px-6 mt-auto border-t border-border/50 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Shield className="w-4 h-4" aria-hidden="true" />
          <p className="text-sm font-medium">Important Notice</p>
        </div>
        
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          This tool provides supportive insights based on language patterns and is not a medical diagnosis. 
          It is designed to encourage self-reflection and should not replace professional mental health care. 
          If you're experiencing distress, please reach out to a qualified healthcare provider.
        </p>

        <div className="pt-4 text-xs text-muted-foreground/60">
          <p>© {new Date().getFullYear()} MindfulLens. Built with care.</p>
        </div>
      </div>
    </footer>
  );
};

export default Disclaimer;
