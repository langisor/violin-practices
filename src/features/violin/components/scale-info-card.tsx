import { Download, ExternalLink } from "lucide-react";
import { getPdfFilename } from "../lib/scales-data";

interface ScaleInfoCardProps {
  scaleId: string;
  label: string;
  notes: string;
}

export function ScaleInfoCard({ scaleId, label, notes }: ScaleInfoCardProps) {
  const pdfFilename = getPdfFilename(scaleId);
  const pdfUrl = `/downloads/${pdfFilename}`;
  
  // To disable declared but its value is never read
  void label;
  
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = pdfFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className="bg-[#20281F]/40 border border-[#2B3630] rounded-xl px-4 py-3 mt-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-[11px] text-[#5B6660] uppercase tracking-wider mb-1">
            Scale Notes
          </p>
          <p className="text-[13px] text-[#EDE7D8] font-mono">
            {notes}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleDownload}
            className="p-2 rounded-lg border border-[#2B3630] hover:border-[#5B6660] transition-colors group"
            title="Download PDF"
          >
            <Download className="w-4 h-4 text-[#8A9A93] group-hover:text-[#EDE7D8]" />
          </button>
          <button
            onClick={handleOpenInNewTab}
            className="p-2 rounded-lg border border-[#2B3630] hover:border-[#5B6660] transition-colors group"
            title="Open PDF in new tab"
          >
            <ExternalLink className="w-4 h-4 text-[#8A9A93] group-hover:text-[#EDE7D8]" />
          </button>
        </div>
      </div>
    </div>
  );
}
