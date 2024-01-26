import { err } from "@/app/logging";
import {readFileSync} from "fs";
// used in the silly examples that just read from text files in ./texts folder
export function getContextFromText(filePath: string): string {
  try {
    const textBuffer = readFileSync(filePath)
    return textBuffer.toString("utf-8");
  } catch(e) {
    err(e);
    return "failed to read context.";
  }
}