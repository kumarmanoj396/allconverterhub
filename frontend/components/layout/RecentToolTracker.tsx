"use client";

import { useEffect } from "react";

import { recordRecentTool } from "@/lib/recentTools";
import { getStoredSession, recordConversionHistory } from "@/lib/authApi";

export default function RecentToolTracker({ toolId }: { toolId?: string }) {
  useEffect(() => {
    if (!toolId) return;
    recordRecentTool(toolId);
    const session = getStoredSession();
    if (session) void recordConversionHistory(session, toolId, "opened").catch(() => undefined);
  }, [toolId]);

  return null;
}
