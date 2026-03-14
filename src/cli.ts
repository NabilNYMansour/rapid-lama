#!/usr/bin/env node

import { spawnSync } from "node:child_process";

type OllamaGenerateResponse = {
  response?: string;
  error?: string;
};

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  console.log("rapidclaw - A CLI tool");
  console.log("");
  console.log("Usage:");
  console.log("  rapidclaw [options] <message>");
  console.log("  rclaw [options] <message>");
  console.log("");
  console.log("Options:");
  console.log("  -h, --help     Show help");
  console.log("");
  console.log("Environment variables:");
  console.log("  OLLAMA_HOST    Ollama base URL (default: http://localhost:11434)");
  console.log("  OLLAMA_MODEL   Model name (default: llama3.2)");
  console.log("  OLLAMA_SYSTEM  System prompt override");
  process.exit(0);
}

if (args.length === 0) {
  console.error(
    "Please provide a message. Example: rapidclaw \"say hello world\" (or rclaw \"say hello world\")"
  );
  process.exit(1);
}

const prompt = args.join(" ");
const host = process.env.OLLAMA_HOST ?? "http://localhost:11434";
const model = process.env.OLLAMA_MODEL ?? "llama3.2";
const systemPrompt =
  process.env.OLLAMA_SYSTEM ??
  "You are running inside rapidclaw, a single-turn CLI for rapid AI calls. There is no conversation history and only one user message per call. Treat the input as a standalone request and return a direct answer.";
const endpoint = `${host.replace(/\/+$/, "")}/api/generate`;

const curlResult = spawnSync(
  "curl",
  [
    "-sS",
    "-X",
    "POST",
    endpoint,
    "-H",
    "Content-Type: application/json",
    "-d",
    JSON.stringify({ model, prompt, system: systemPrompt, stream: false }),
  ],
  { encoding: "utf8" }
);

if (curlResult.error) {
  console.error(`Failed to execute curl: ${curlResult.error.message}`);
  process.exit(1);
}

if (curlResult.status !== 0) {
  const errorMessage = curlResult.stderr.trim() || "curl request failed";
  console.error(errorMessage);
  process.exit(curlResult.status ?? 1);
}

let response: OllamaGenerateResponse;

try {
  response = JSON.parse(curlResult.stdout) as OllamaGenerateResponse;
} catch {
  console.error("Received invalid JSON from Ollama");
  const rawOutput = curlResult.stdout.trim();
  if (rawOutput.length > 0) {
    console.error(rawOutput);
  }
  process.exit(1);
}

if (response.error) {
  console.error(`Ollama error: ${response.error}`);
  process.exit(1);
}

process.stdout.write(`${response.response ?? ""}\n`);
