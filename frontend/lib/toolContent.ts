import type { Tool } from "@/lib/tools";

export interface ToolFaq {
  answer: string;
  question: string;
}

export function getToolHowToSteps(tool: Tool) {
  return [
    `Open the ${tool.title} page.`,
    "Choose the file or information requested by the tool.",
    `Configure the available ${tool.title.toLowerCase()} options.`,
    "Process the file or generate the result, then download or copy it.",
  ];
}

export function getToolFaqs(tool: Tool): ToolFaq[] {
  return [
    { question: `What does ${tool.title} do?`, answer: tool.description },
    { question: `How do I use ${tool.title}?`, answer: `Open the tool, provide the requested file or information, choose any options, and then create or download your result.` },
    { question: `Is ${tool.title} free to use?`, answer: `Yes. ${tool.title} is available to use for free.` },
    { question: "Are my files private?", answer: "This tool is designed to process files in your browser whenever possible. Your files are not stored by AllConverterHub." },
  ];
}

export function getRelatedTools(tool: Tool, tools: Tool[]) {
  return tools.filter((candidate) => candidate.enabled && candidate.id !== tool.id && candidate.category === tool.category).slice(0, 3);
}
