"use client";

import { useEffect, useId, useMemo, useState } from "react";

interface MermaidDiagramProps {
  code: string;
}

export default function MermaidDiagram({ code }: MermaidDiagramProps) {
  const reactId = useId();
  const diagramId = useMemo(() => `mermaid-${reactId.replace(/[:]/g, "")}`, [reactId]);

  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        setError("");
        setSvg("");

        const mermaidModule = await import("mermaid");
        const mermaid = mermaidModule.default;

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
        });

        const { svg } = await mermaid.render(diagramId, code);
        if (!cancelled) {
          setSvg(svg);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to render mermaid diagram");
        }
      }
    }

    if (code.trim().length > 0) {
      render();
    }

    return () => {
      cancelled = true;
    };
  }, [code, diagramId]);

  if (error) {
    return (
      <pre className="mermaid-diagram my-4 overflow-x-auto rounded-md border border-gray-200 bg-gray-50 p-4 text-sm">
        <code>{code}</code>
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="mermaid-diagram my-4 overflow-x-auto rounded-md border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
        Rendering diagram…
      </div>
    );
  }

  return (
    <div
      className="mermaid-diagram my-6 overflow-x-auto"
      // Mermaid returns SVG markup
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
