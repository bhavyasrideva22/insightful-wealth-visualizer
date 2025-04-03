
import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { isValidEmail } from "@/utils/formatUtils";
import { getLumpsumPDFBase64 } from "@/utils/pdfGenerator";

interface EmailFormProps {
  principal: number;
  rate: number;
  years: number;
  finalAmount: number;
}

const EmailForm = ({ principal, rate, years, finalAmount }: EmailFormProps) => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSending(true);
    
    try {
      // In a real application, this would connect to a backend API
      // For now, we'll simulate the email sending with a timeout
      
      // Get PDF as base64 for attachment
      await getLumpsumPDFBase64(principal, rate, years);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Email Sent Successfully!",
        description: `Your investment report has been sent to ${email}`,
        variant: "default"
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Failed to Send Email",
        description: "There was an error sending your report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 animate-fade-in">
      <h3 className="font-semibold text-primary text-lg mb-3">Email Report</h3>
      <p className="text-sm text-gray-600 mb-4">
        Get your investment report delivered to your inbox.
      </p>
      
      <form onSubmit={handleSendEmail} className="space-y-3">
        <div>
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full input-field"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
          disabled={isSending}
        >
          <Mail size={18} />
          {isSending ? "Sending..." : "Send Report"}
        </Button>
      </form>
    </div>
  );
};

export default EmailForm;
