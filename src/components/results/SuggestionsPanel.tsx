import { motion } from "framer-motion";
import { Lightbulb, Heart, Leaf, Users } from "lucide-react";

interface SuggestionsPanelProps {
  suggestions: string[];
}

const ICONS = [Lightbulb, Heart, Leaf, Users];

const SuggestionsPanel = ({ suggestions }: SuggestionsPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-card rounded-2xl shadow-soft border border-border/50 p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-secondary-foreground" aria-hidden="true" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">
          Supportive Suggestions
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {suggestions.map((suggestion, index) => {
          const Icon = ICONS[index % ICONS.length];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/30"
            >
              <div className="w-8 h-8 rounded-lg bg-primary-soft flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {suggestion}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SuggestionsPanel;
