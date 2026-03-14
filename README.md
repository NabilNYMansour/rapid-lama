# Rapid Lama

`rlama` is a lightweight CLI for fast, single-turn prompts against an Ollama server.

## What It Does

- Sends one prompt per command execution.
- Uses Ollama's `/api/generate` endpoint with `stream: false`.
- Prints the model response directly to stdout.

## Requirements

- Node.js 18+
- An Ollama server running locally or remotely
- `curl` available in your shell

## Installation

### As a global CLI

```bash
npm install -g rapid-lama
rlama "Summarize recursion in one paragraph."
```

### From source (local development)

```bash
pnpm install
pnpm build
```

After building, run:

```bash
node dist/cli.js "What is the capital of Italy?"
```

## Usage

```bash
rlama [options] <message>
```

Examples:

```bash
rlama "Explain HTTP status code 429"
rlama "Write a short commit message for a bug fix"
```

Help:

```bash
rlama --help
```

## Environment Variables

- `OLLAMA_HOST`: Ollama base URL. Default: `http://localhost:11434`
- `OLLAMA_MODEL`: Model name. Default: `llama3.2`
- `OLLAMA_SYSTEM`: Optional system prompt override

Example:

```bash
OLLAMA_MODEL=llama3.1 OLLAMA_HOST=http://127.0.0.1:11434 rlama "Give me 3 Linux tips"
```

## Development Scripts

- `pnpm build`: Compile TypeScript and mark `dist/cli.js` executable
- `pnpm dev`: Run `dist/cli.js` directly

## License

MIT