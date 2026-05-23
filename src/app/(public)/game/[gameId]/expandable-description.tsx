"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";

const CHAR_LIMIT = 400;

export function ExpandableDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const truncated = text.length > CHAR_LIMIT && !expanded;

  return (
    <div className="space-y-2">
      <p className="text-muted-foreground leading-relaxed">
        {truncated ? text.slice(0, CHAR_LIMIT).trimEnd() + "…" : text}
      </p>
      {text.length > CHAR_LIMIT && (
        <Button
          variant="ghost"
          size="sm"
          className="px-0 h-auto text-muted-foreground hover:text-foreground"
          onClick={() => setExpanded((e) => !e)}
        >
          {expanded ? "Show less" : "Show more"}
        </Button>
      )}
    </div>
  );
}
