"use client";

import { useEffect } from "react";

import { recordRecentTool } from "@/lib/recentTools";

export default function RecentToolTracker({ toolId }: { toolId?: string }) {
  useEffect(() => {
    if (toolId) recordRecentTool(toolId);
  }, [toolId]);

  return null;
}
