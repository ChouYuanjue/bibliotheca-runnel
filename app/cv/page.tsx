import fs from "fs";
import path from "path";
import Link from "next/link";
import MarkdownRenderer from "@/components/custom/MarkdownRenderer";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function CV() {
  const filePath = path.join(process.cwd(), "data", "cv.md");
  const content = fs.readFileSync(filePath, "utf8");

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <div className="flex justify-end">
        <Link href="/cv.pdf" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </Link>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}
