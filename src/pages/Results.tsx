import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, HelpCircle, RotateCcw } from "lucide-react";
import Header from "@/components/Header";
import Disclaimer from "@/components/Disclaimer";
import SummaryCard from "@/components/results/SummaryCard";
import InterpretationSection from "@/components/results/InterpretationSection";
import PatternInsights from "@/components/results/PatternInsights";
import SuggestionsPanel from "@/components/results/SuggestionsPanel";
import CopingStrategies from "@/components/results/CopingStrategies";
import ProfessionalGuidance from "@/components/results/ProfessionalGuidance";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { AnalysisResponse } from "@/services/api";

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<AnalysisResponse | null>(null);

  useEffect(() => {
    const storedResults = sessionStorage.getItem("analysis-results");
    
    if (!storedResults) {
      navigate("/");
      return;
    }

    try {
      setResults(JSON.parse(storedResults));
    } catch {
      navigate("/");
    }
  }, [navigate]);

  const handleStartOver = () => {
    sessionStorage.removeItem("analysis-text");
    sessionStorage.removeItem("analysis-results");
    localStorage.removeItem("mindful-draft");
    navigate("/");
  };

  if (!results) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Disclaimer variant="banner" />
      <Header />

      <main className="flex-1 px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Navigation and actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mb-8"
          >
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back
            </Button>

            <div className="flex items-center gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <HelpCircle className="w-4 h-4" aria-hidden="true" />
                    <span className="hidden sm:inline">Why these suggestions?</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>About Your Suggestions</DialogTitle>
                    <DialogDescription className="pt-4 space-y-3">
                      <p>
                        Suggestions are generated using AI based on text patterns and assessment scores. 
                        The system analyzes language indicators to identify emotional patterns and provides 
                        personalized supportive recommendations.
                      </p>
                      <p>
                        These suggestions are meant to encourage self-reflection and healthy coping strategies. 
                        They are not medical advice and should not replace professional mental health support.
                      </p>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <Button variant="calm" size="sm" onClick={handleStartOver} className="gap-2">
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">New Analysis</span>
              </Button>
            </div>
          </motion.div>

          {/* Results sections */}
          <div className="space-y-6">
            {/* Summary Card */}
            <SummaryCard
              score={results.phq9_score}
              severity={results.severity}
              confidence={results.confidence}
            />

            {/* AI Interpretation */}
            <InterpretationSection interpretation={results.interpretation} />

            {/* Pattern Insights */}
            <PatternInsights patterns={results.phq_patterns} />

            {/* Two column layout for larger screens */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Suggestions */}
              <SuggestionsPanel suggestions={results.suggestions} />

              {/* Coping Strategies */}
              <CopingStrategies strategies={results.coping_strategies} />
            </div>

            {/* Professional Guidance */}
            <ProfessionalGuidance
              guidance={results.professional_guidance}
              severity={results.severity}
              confidenceNote={results.confidence_note}
            />
          </div>
        </div>
      </main>

      <Disclaimer />
    </div>
  );
};

export default Results;
