// @/types/blog.ts

export type EditorJSBlock =

  | { type: "header"; data: { text: string; level: number } }
  | { type: "paragraph"; data: { text: string } }
  | { type: "list"; data: { style: "ordered" | "unordered"; items: string[] } }
  | { type: "image"; data: { file: { url: string }; caption?: string } }
  | { type: "code"; data: { code: string } };

export interface EditorJSData {
  time?: number;
  blocks: EditorJSBlock[];
  version?: string;
}

