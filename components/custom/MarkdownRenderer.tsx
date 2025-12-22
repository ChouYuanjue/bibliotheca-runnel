import ReactMarkdown from "react-markdown";
import React from "react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import "katex/dist/katex.min.css"; // Import KaTeX CSS
import MermaidDiagram from "@/components/custom/MermaidDiagram";

interface MarkdownRendererProps {
  content: string;
  className?: string;
  inline?: boolean;
}

// Helper to preprocess LaTeX delimiters
// Replaces \( ... \) with $ ... $ and \[ ... \] with $$ ... $$
const preprocessMarkdown = (content: string) => {
  if (!content) return "";
  return content
    .replace(/\\\[([\s\S]*?)\\\]/g, '$$$$$1$$$$') // \[ ... \] -> $$ ... $$
    .replace(/\\\(([\s\S]*?)\\\)/g, '$$$1$$');    // \( ... \) -> $ ... $
};

export default function MarkdownRenderer({ content, className, inline = false }: MarkdownRendererProps) {
  const processedContent = preprocessMarkdown(content);

  const Wrapper = inline ? 'span' : 'div';

  return (
    <Wrapper className={cn(inline ? "" : "prose prose-sm max-w-none prose-headings:font-serif prose-a:text-red-800 hover:prose-a:text-red-600", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
        components={{
          pre({ children, ...props }) {
            const child = Array.isArray(children) ? children[0] : children;
            if (
              React.isValidElement(child) &&
              typeof (child.props as any)?.className === "string" &&
              (child.props as any).className.includes("language-mermaid")
            ) {
              const { node, ref, ...rest } = props as any;
              return <div {...rest}>{children}</div>;
            }

            return <pre {...props}>{children}</pre>;
          },
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match?.[1];
            const code = String(children ?? "").replace(/\n$/, "");

            if (language === "mermaid") {
              return <MermaidDiagram code={code} />;
            }

            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          img: () => null,
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </Wrapper>
  );
}
