"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PDFExportButtonProps {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}

export default function PDFExportButton({
  onClick,
  label = "Export PDF",
  disabled = false,
}: PDFExportButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className="gap-2"
    >
      <Download className="h-4 w-4" />
      {label}
    </Button>
  );
}
