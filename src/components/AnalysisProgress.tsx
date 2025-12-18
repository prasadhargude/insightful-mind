import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROGRESS_MESSAGES = [
  "Analyzing language patterns…",
  "Looking for emotional indicators…",
  "Understanding context and tone…",
  "Preparing supportive insights…",
];

const AnalysisProgress = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % PROGRESS_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-background px-6"
    >
      <div className="text-center max-w-md">
        {/* Breathing animation circles */}
        <div className="relative w-32 h-32 mx-auto mb-10">
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary-soft"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Middle ring */}
          <motion.div
            className="absolute inset-4 rounded-full bg-primary-glow"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />
          
          {/* Inner circle */}
          <motion.div
            className="absolute inset-8 rounded-full bg-primary/30"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          />
          
          {/* Core */}
          <div className="absolute inset-12 rounded-full bg-primary/50" />
        </div>

        {/* Message cycling */}
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-lg text-foreground font-medium mb-3"
            aria-live="polite"
            aria-atomic="true"
          >
            {PROGRESS_MESSAGES[messageIndex]}
          </motion.p>
        </AnimatePresence>

        <p className="text-sm text-muted-foreground">
          This may take a few moments
        </p>

        {/* Accessibility: Screen reader only progress indication */}
        <div className="sr-only" role="status" aria-live="polite">
          Analysis in progress. Please wait.
        </div>
      </div>
    </motion.div>
  );
};

export default AnalysisProgress;
