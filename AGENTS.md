# AGENTS.md - AI Agent Development Tutorial

## Project Overview

This repository contains a comprehensive tutorial for developing AI agents using LangChain.js and LangGraph.js. The project is structured as a pnpm workspace with multiple examples and a main project demonstrating AI agent development concepts.

## Build Commands

### Development

```bash
# Start development server for main project
pnpm dev

# Build all packages
pnpm build

# Run a specific example (e.g., basic interaction)
cd stage-01-langchain-basics/examples/01-basic-interaction
pnpm dev
```

### Production Build

```bash
# Build the main project
cd stage-01-langchain-basics/project
pnpm build

# Build all packages in workspace
pnpm -r build
```

## Testing

### Running Tests

Currently, there are no formal test suites set up. To add tests:

1. Install testing framework (e.g., Vitest, Jest):

```bash
pnpm add -D vitest @vitest/ui
```

2. Add test scripts to package.json:

```json
"scripts": {
  "test": "vitest",
  "test:watch": "vitest watch",
  "test:coverage": "vitest run --coverage"
}
```

3. Run tests:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run specific test file
pnpm vitest src/path/to/test.ts
```

## Code Style Guidelines

### TypeScript Configuration

- Target: ES2022
- Module: ESNext
- Strict mode enabled (`strict: true`)
- Module resolution: bundler
- Source maps enabled for debugging

### General Guidelines

#### Imports

```typescript
// Standard imports first
import { someFunction } from 'some-library';

// Local imports next
import { anotherFunction } from './local-module';

// Group related imports with blank lines
import { functionA, functionB } from 'library-a';
import { functionC } from 'library-b';

// Type-only imports
import type { SomeType } from 'some-library';
```

#### Formatting

- Use 2 spaces for indentation
- Max line length: 100 characters
- Use semicolons
- Use single quotes for strings unless interpolation is needed

#### Types and Type Safety

```typescript
// Always use explicit types
const name: string = 'John';
const age: number = 30;

// Use interfaces for object shapes
interface User {
  id: string;
  name: string;
  email: string;
}

// Use type aliases for complex types
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

// Use generics when appropriate
function identity<T>(value: T): T {
  return value;
}
```

#### Naming Conventions

- **Files**: kebab-case (e.g., `user-service.ts`, `api-client.ts`)
- **Classes**: PascalCase (e.g., `UserService`, `ApiClient`)
- **Interfaces**: PascalCase with `I` prefix (e.g., `IUser`, `IApiClient`)
- **Functions/Methods**: camelCase (e.g., `getUser`, `fetchData`)
- **Variables/Constants**: camelCase (e.g., `userName`, `MAX_RETRIES`)
- **Types/Aliases**: PascalCase (e.g., `UserType`, `ApiResponse`)

#### Error Handling

```typescript
// Use try-catch for error-prone operations
try {
  const result = await someAsyncOperation();
} catch (error) {
  console.error('Operation failed:', error);
  // Handle or rethrow error
}

// Create custom error types
class CustomError extends Error {
  constructor(
    message: string,
    public code: string
  ) {
    super(message);
    this.name = 'CustomError';
  }
}

// Use Result pattern for operations that can fail
interface Result<T, E = Error> {
  success: boolean;
  data?: T;
  error?: E;
}

function safeOperation(): Result<string> {
  try {
    const result = performOperation();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}
```

#### Async/Await

```typescript
// Use async/await for asynchronous operations
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}

// Handle multiple async operations
async function processData() {
  const [data1, data2] = await Promise.all([fetchData1(), fetchData2()]);
  return { data1, data2 };
}
```

#### LangChain Specific Guidelines

```typescript
// Use proper chain composition
const chain = RunnableSequence.from([
  new PromptTemplate({ template, inputVariables: ['question'] }),
  model,
  new StringOutputParser(),
]);

// Define proper tool schemas
const tools: Tool[] = [
  new Tool({
    name: 'search',
    description: 'Search the web',
    schema: z.object({
      query: z.string().describe('Search query'),
    }),
    func: async ({ query }) => searchWeb(query),
  }),
];

// Create proper agent configurations
const agent = await createReactAgent({
  tools,
  llm: model,
  prompt: await hub.pull('hwchase17/react'),
});
```

## Project Structure

```
mutiAgent/
├── AGENTS.md (this file)
├── package.json
├── pnpm-workspace.yaml
├── stage-01-langchain-basics/
│   ├── project/ (main application)
│   │   ├── src/
│   │   │   ├── index.ts (entry point)
│   │   │   ├── assistant.ts (main logic)
│   │   │   ├── schemas/ (Zod schemas)
│   │   │   └── tools/ (AI tools)
│   │   └── tsconfig.json
│   └── examples/
│       ├── 01-basic-interaction/ (hello AI, streaming, temperature)
│       ├── 02-message-system/ (message types, conversation)
│       ├── 03-prompt-template/ (templates, few-shot)
│       ├── 04-structured-output/ (parsing, extraction)
│       └── 05-tool-system/ (tools, function calling)
└── tutorials/ (Chinese documentation)
```

## Environment Setup

### Node.js and pnpm

- Node.js: >=20.0.0
- pnpm: >=8.0.0

### Environment Variables

Create a `.env` file in the project root:

```env
OPENAI_API_KEY=your-key-here
ANTHROPIC_API_KEY=your-key-here
```

## Best Practices

1. **Modularity**: Keep code modular and focused on single responsibilities
2. **Type Safety**: Use TypeScript types everywhere for better developer experience
3. **Error Handling**: Implement proper error handling for robust applications
4. **Testing**: Add tests for critical functionality
5. **Documentation**: Document complex logic and APIs
6. **Performance**: Optimize AI model calls and tool usage
7. **Security**: Never expose API keys in committed code

## Cursor and Copilot Rules

No specific Cursor or Copilot rules found in the repository. If you add them, place them in:

- `.cursor/rules/` for Cursor rules
- `.github/copilot-instructions.md` for Copilot rules

## Contributing

When contributing to this project:

1. Follow the established code style
2. Add tests for new functionality
3. Update documentation as needed
4. Ensure all commands work in the development environment

## Troubleshooting

Common issues and solutions:

- TypeScript errors: Run `pnpm build` to check for type errors
- Module resolution issues: Ensure imports use correct paths
- API key errors: Verify environment variables are set correctly
- Build failures: Check package.json scripts and dependencies

For more detailed information, refer to the project documentation in the `tutorials/` directory.
