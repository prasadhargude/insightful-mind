import { motion } from "framer-motion";
import { PenLine, FileUp } from "lucide-react";

interface InputTabsProps {
  activeTab: "text" | "file";
  onTabChange: (tab: "text" | "file") => void;
}

const InputTabs = ({ activeTab, onTabChange }: InputTabsProps) => {
  const tabs = [
    { id: "text" as const, label: "Write Text", icon: PenLine },
    { id: "file" as const, label: "Upload File", icon: FileUp },
  ];

  return (
    <div 
      className="flex gap-2 p-1.5 bg-muted/50 rounded-xl w-fit"
      role="tablist"
      aria-label="Input method selection"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative flex items-center gap-2 px-5 py-2.5 rounded-lg
              text-sm font-medium transition-colors duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
              ${isActive 
                ? "text-foreground" 
                : "text-muted-foreground hover:text-foreground"
              }
            `}
            role="tab"
            aria-selected={isActive}
            aria-controls={`${tab.id}-panel`}
            id={`${tab.id}-tab`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-card rounded-lg shadow-soft"
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              <Icon className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">{tab.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default InputTabs;
