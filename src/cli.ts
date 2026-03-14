#!/usr/bin/env node

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  console.log("rapidclaw - A CLI tool");
  console.log("");
  console.log("Usage:");
  console.log("  rapidclaw [options]");
  console.log("");
  console.log("Options:");
  console.log("  -h, --help     Show help");
  process.exit(0);
}

console.log(args.join(" "));
