import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, ChevronDown, BookOpen, Footprints, Smile } from "lucide-react";

interface CopingStrategiesProps {
  strategies: string[];
}

const STRATEGY_ICONS = [Wind, BookOpen, Smile, Footprints];

const CopingStrategies = ({ strategies }: CopingStrategiesProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-card rounded-2xl shadow-soft border border-border/50 p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
          <Wind className="w-5 h-5 text-accent-foreground" aria-hidden="true" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">
          Coping Strategies
        </h2>
      </div>

      <div className="space-y-3">
        {strategies.map((strategy, index) => {
          const Icon = STRATEGY_ICONS[index % STRATEGY_ICONS.length];
          const isExpanded = expandedIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="rounded-xl border border-border/50 overflow-hidden"
            >
              <button
                onClick={() => toggleExpand(index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
                aria-expanded={isExpanded}
                aria-controls={`strategy-${index}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-soft/50 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    Strategy {index + 1}
                  </span>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    id={`strategy-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-0">
                      <div className="p-4 rounded-lg bg-muted/30">
                        <p className="text-sm text-foreground/80 leading-relaxed">
                          {strategy}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CopingStrategies;
