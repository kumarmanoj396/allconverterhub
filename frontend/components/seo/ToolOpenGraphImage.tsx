import { ImageResponse } from "next/og";

import { APP } from "@/lib/constants";
import type { Tool } from "@/lib/tools";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function createToolOpenGraphImage(tool: Tool) {
  return new ImageResponse(<div style={{ alignItems: "center", background: "linear-gradient(135deg, #020617 0%, #172554 55%, #1e3a8a 100%)", color: "white", display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", padding: "80px", width: "100%" }}><div style={{ color: "#60a5fa", display: "flex", fontSize: 32, fontWeight: 700, letterSpacing: 3 }}>{APP.NAME.toUpperCase()}</div><div style={{ display: "flex", fontSize: 80, fontWeight: 800, lineHeight: 1.1, marginTop: 32, textAlign: "center" }}>{tool.title}</div><div style={{ color: "#cbd5e1", display: "flex", fontSize: 32, marginTop: 28, textAlign: "center" }}>{tool.description}</div><div style={{ background: "#2563eb", borderRadius: 999, display: "flex", fontSize: 24, fontWeight: 700, marginTop: 44, padding: "14px 28px" }}>Free online {tool.category.toLowerCase()}</div></div>, size);
}
