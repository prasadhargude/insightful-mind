import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface HeaderProps {
  showNav?: boolean;
}

const Header = ({ showNav = false }: HeaderProps) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-6 px-6 md:px-10"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-soft flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary" aria-hidden="true" />
          </div>
          <span className="text-xl font-semibold text-foreground">MindfulLens</span>
        </div>
        
        {showNav && (
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            <a 
              href="/" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </a>
            <a 
              href="#about" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
            <a 
              href="#resources" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Resources
            </a>
          </nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
