import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import InputTabs from "@/components/InputTabs";
import TextInputPanel from "@/components/TextInputPanel";
import FileUploadPanel from "@/components/FileUploadPanel";
import Disclaimer from "@/components/Disclaimer";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"text" | "file">("text");
  const [text, setText] = useState("");

  const handleAnalyze = () => {
    if (text.trim()) {
      // Store text in session storage for the analysis page
      sessionStorage.setItem("analysis-text", text);
      navigate("/analysis");
    }
  };

  const handleFileText = (extractedText: string) => {
    setText(extractedText);
  };

  const isSubmitDisabled = !text.trim();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex flex-col items-center px-6 pb-12">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl text-center mt-8 md:mt-16 mb-10"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            Understand emotional patterns through{" "}
            <span className="text-gradient">language insights</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Share your thoughts in a safe space. Our supportive tool helps identify emotional patterns through gentle language analysis.
          </p>
        </motion.div>

        {/* Input section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-2xl space-y-6"
        >
          {/* Tabs */}
          <div className="flex justify-center">
            <InputTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Input panels */}
          <div role="tabpanel" id={`${activeTab}-panel`} aria-labelledby={`${activeTab}-tab`}>
            {activeTab === "text" ? (
              <TextInputPanel value={text} onChange={setText} />
            ) : (
              <FileUploadPanel onTextExtracted={handleFileText} />
            )}
          </div>

          {/* Submit button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center pt-4"
          >
            <Button
              onClick={handleAnalyze}
              disabled={isSubmitDisabled}
              size="xl"
              className="group"
            >
              Analyze Text
              <ArrowRight 
                className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                aria-hidden="true" 
              />
            </Button>
          </motion.div>

          {/* Hint text */}
          {isSubmitDisabled && (
            <p className="text-center text-sm text-muted-foreground">
              Enter some text or upload a file to begin
            </p>
          )}
        </motion.div>
      </main>

      <Disclaimer />
    </div>
  );
};

export default Landing;
