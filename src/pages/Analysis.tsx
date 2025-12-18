import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnalysisProgress from "@/components/AnalysisProgress";
import { analyzeText, type AnalysisResponse } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const Analysis = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const text = sessionStorage.getItem("analysis-text");

    if (!text) {
      navigate("/");
      return;
    }

    const runAnalysis = async () => {
      try {
        const results = await analyzeText(text);
        
        // Store results and navigate
        sessionStorage.setItem("analysis-results", JSON.stringify(results));
        navigate("/results");
      } catch (error) {
        console.error("Analysis failed:", error);
        toast({
          title: "Analysis failed",
          description: "We couldn't complete the analysis. Please try again.",
          variant: "destructive",
        });
        navigate("/");
      } finally {
        setIsAnalyzing(false);
      }
    };

    runAnalysis();
  }, [navigate, toast]);

  if (!isAnalyzing) {
    return null;
  }

  return <AnalysisProgress />;
};

export default Analysis;
