import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface TextInputPanelProps {
  value: string;
  onChange: (value: string) => void;
}

const ENCOURAGEMENT_MESSAGES = [
  "Take your time. There's no rush.",
  "Your feelings are valid.",
  "Writing can be a form of self-care.",
  "Every word you share matters.",
];

const TextInputPanel = ({ value, onChange }: TextInputPanelProps) => {
  const [charCount, setCharCount] = useState(0);
  const [encouragementIndex, setEncouragementIndex] = useState(0);

  useEffect(() => {
    setCharCount(value.length);
  }, [value]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEncouragementIndex((prev) => (prev + 1) % ENCOURAGEMENT_MESSAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value) {
        localStorage.setItem("mindful-draft", value);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [value]);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem("mindful-draft");
    if (draft && !value) {
      onChange(draft);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="You can freely write about how you've been feeling lately. There's no right or wrong way to express yourself."
          className="w-full h-64 md:h-80 p-6 rounded-2xl border border-border bg-card/50 
                     text-foreground placeholder:text-muted-foreground/60
                     focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50
                     transition-all duration-300 resize-none text-base leading-relaxed"
          aria-label="Write about your feelings"
          aria-describedby="input-hint character-count"
        />
        
        {/* Character counter */}
        <div 
          id="character-count"
          className="absolute bottom-4 right-4 text-sm text-muted-foreground/60"
          aria-live="polite"
        >
          {charCount > 0 && `${charCount} characters`}
        </div>
      </div>

      {/* Encouragement message */}
      <motion.div
        key={encouragementIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center gap-2 text-sm text-muted-foreground"
        id="input-hint"
      >
        <Sparkles className="w-4 h-4 text-primary/60" aria-hidden="true" />
        <span>{ENCOURAGEMENT_MESSAGES[encouragementIndex]}</span>
      </motion.div>

      {/* Draft saved indicator */}
      {value && (
        <p className="text-xs text-muted-foreground/50">
          Draft automatically saved
        </p>
      )}
    </motion.div>
  );
};

export default TextInputPanel;
