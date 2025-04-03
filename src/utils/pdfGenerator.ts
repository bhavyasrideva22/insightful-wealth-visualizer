
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { generateYearlyData, getInvestmentBreakdown } from "./calculatorUtils";
import { formatIndianRupee, formatPercentage } from "./formatUtils";

// Add type definition for jsPDF with autotable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

/**
 * Generates a PDF report for the lumpsum investment calculation
 * @param principal The initial investment amount
 * @param rate The annual return rate
 * @param years The investment duration in years
 * @returns PDF document as Blob
 */
export const generateLumpsumPDF = async (
  principal: number,
  rate: number,
  years: number
): Promise<Blob> => {
  const doc = new jsPDF();
  const finalAmount = generateYearlyData(principal, rate, years).pop()?.amount || 0;
  const breakdown = getInvestmentBreakdown(principal, finalAmount);
  const yearlyData = generateYearlyData(principal, rate, years);
  
  // Add logo and title
  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  
  // Header
  doc.setFillColor(36, 94, 79); // Primary color
  doc.rect(0, 0, 210, 40, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Lumpsum Investment Calculator", 105, 20, { align: "center" });
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Report generated on ${currentDate}`, 105, 30, { align: "center" });
  
  // Investment Summary
  doc.setTextColor(36, 94, 79);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Investment Summary", 14, 55);
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 51, 51);
  
  // Input parameters table
  doc.autoTable({
    startY: 60,
    head: [["Parameter", "Value"]],
    body: [
      ["Initial Investment", formatIndianRupee(principal)],
      ["Expected Return Rate", formatPercentage(rate)],
      ["Time Period", `${years} years`]
    ],
    theme: "grid",
    headStyles: {
      fillColor: [122, 201, 167], // Secondary color
      textColor: [36, 94, 79],
      fontStyle: "bold"
    },
    styles: {
      fontSize: 10,
      cellPadding: 5
    }
  });
  
  // Results section
  const resultStartY = (doc as any).lastAutoTable.finalY + 15;
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(36, 94, 79);
  doc.text("Results", 14, resultStartY);
  
  // Results table
  doc.autoTable({
    startY: resultStartY + 5,
    head: [["Detail", "Value"]],
    body: [
      ["Initial Investment", formatIndianRupee(principal)],
      ["Final Amount", formatIndianRupee(finalAmount)],
      ["Wealth Gained", formatIndianRupee(breakdown.returns)],
      ["Returns Percentage", `${breakdown.wealthGained}%`]
    ],
    theme: "grid",
    headStyles: {
      fillColor: [233, 196, 106], // Accent color
      textColor: [51, 51, 51],
      fontStyle: "bold"
    },
    styles: {
      fontSize: 10,
      cellPadding: 5
    }
  });
  
  // Year-by-year growth table
  const growthStartY = (doc as any).lastAutoTable.finalY + 15;
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(36, 94, 79);
  doc.text("Year-by-Year Growth", 14, growthStartY);
  
  const tableData = yearlyData.map(data => [
    data.year,
    formatIndianRupee(data.amount),
    formatIndianRupee(data.returns),
    `${Math.round((data.returns / principal) * 100)}%`
  ]);
  
  doc.autoTable({
    startY: growthStartY + 5,
    head: [["Year", "Amount", "Returns", "Growth"]],
    body: tableData,
    theme: "grid",
    headStyles: {
      fillColor: [122, 201, 167], // Secondary color
      textColor: [36, 94, 79],
      fontStyle: "bold"
    },
    styles: {
      fontSize: 10,
      cellPadding: 5
    }
  });
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(
      "© 2025 Insightful Wealth Visualizer | For educational purposes only",
      105,
      285,
      { align: "center" }
    );
    doc.text(`Page ${i} of ${pageCount}`, 105, 292, { align: "center" });
  }
  
  return doc.output("blob");
};

/**
 * Triggers download of the generated PDF
 * @param principal The initial investment amount
 * @param rate The annual return rate
 * @param years The investment duration in years
 */
export const downloadLumpsumPDF = async (
  principal: number,
  rate: number,
  years: number
): Promise<void> => {
  const pdfBlob = await generateLumpsumPDF(principal, rate, years);
  const url = URL.createObjectURL(pdfBlob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = `Lumpsum_Investment_${new Date().toISOString().split("T")[0]}.pdf`;
  link.click();
  
  // Clean up
  URL.revokeObjectURL(url);
};

/**
 * Gets the base64 string of the PDF for email sending
 * @param principal The initial investment amount
 * @param rate The annual return rate
 * @param years The investment duration in years
 * @returns Base64 string of the PDF
 */
export const getLumpsumPDFBase64 = async (
  principal: number,
  rate: number,
  years: number
): Promise<string> => {
  const pdfBlob = await generateLumpsumPDF(principal, rate, years);
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String.split(",")[1]); // Remove data URL prefix
    };
    reader.readAsDataURL(pdfBlob);
  });
};
