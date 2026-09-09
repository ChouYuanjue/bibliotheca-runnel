import fs from "fs";
import path from "path";
import Link from "next/link";
import MarkdownRenderer from "@/components/custom/MarkdownRenderer";

export default function CV() {
  const filePath = path.join(process.cwd(), "data", "cv.md");
  const content = fs.readFileSync(filePath, "utf8");

  return (
    <div className="mx-auto max-w-4xl space-y-7">
      <div className="flex justify-end gap-4 border-b border-gray-200 pb-4 text-sm">
        <Link href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-500 underline decoration-gray-300 underline-offset-4 hover:text-gray-900">PDF</Link>
      </div>
      <MarkdownRenderer content={content} />
    </div>
  );
}
