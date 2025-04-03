
import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { downloadLumpsumPDF } from "@/utils/pdfGenerator";

interface DownloadPDFProps {
  principal: number;
  rate: number;
  years: number;
}

const DownloadPDF = ({ principal, rate, years }: DownloadPDFProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    setIsGenerating(true);
    
    try {
      await downloadLumpsumPDF(principal, rate, years);
      
      toast({
        title: "Download Started",
        description: "Your investment report is being downloaded",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error generating your report. Please try again.",
        variant: "destructive"
      });
      console.error("PDF generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 animate-fade-in">
      <h3 className="font-semibold text-primary text-lg mb-3">Download Report</h3>
      <p className="text-sm text-gray-600 mb-4">
        Download a detailed PDF report of your investment projection.
      </p>
      
      <Button 
        onClick={handleDownload} 
        className="w-full bg-accent hover:bg-accent/90 text-charcoal flex items-center justify-center gap-2"
        disabled={isGenerating}
      >
        <Download size={18} />
        {isGenerating ? "Generating PDF..." : "Download PDF Report"}
      </Button>
    </div>
  );
};

export default DownloadPDF;
