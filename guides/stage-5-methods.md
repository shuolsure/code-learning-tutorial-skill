# Stage 5: Method Introduction with Knowledge Graph

Document all methods and show their relationships with a knowledge graph.

## Method Extraction Process

```
Step 5.1: Find All Functions
→ Tool: Grep "^def |^async def " --include="*.py" -n
→ Output: file:line:function_name

Step 5.2: Extract Signatures
→ Tool: Read each file
→ Parse: function name, parameters, return type

Step 5.3: Find Call Relationships
→ Tool: Grep "function_name\(" --include="*.py"
→ Build: who calls whom

Step 5.4: Categorize Methods
→ Core: main business logic
→ Helper: utility functions  
→ Handler: event/message handlers
```

## Method Categories

| Category | Description | Examples |
|----------|-------------|----------|
| `core` | Main business logic | process, handle, execute |
| `helper` | Utility functions | format, validate, parse |
| `handler` | Event handlers | on_message, on_connect |
| `manager` | Resource management | create, destroy, cleanup |

## Pyramid Structure

```
Level 1 (Top): Entry Points
├── main(), run(), start()
│
Level 2 (Middle): Core Logic  
├── process(), handle(), execute()
│
Level 3 (Bottom): Utilities
├── helpers, validators, formatters
```

## methods-data.js Template

```javascript
const methodsData = {
    methods: [
        {
            id: 'process_message',
            name: 'process_message()',
            file: 'nanobot/agent/loop.py',
            line: 150,
            signature: 'async def process_message(msg: InboundMessage) -> Response',
            description: 'Process incoming message and generate response',
            category: 'core',
            level: 2,
            socratic: {
                q: "Why do we need async here?",
                hint: "Think about I/O operations...",
                answer: "Because we need to wait for LLM API calls",
                followUp: [
                    {
                        q: "What happens if the LLM is slow?",
                        hint: "Consider timeout handling...",
                        answer: "The async pattern allows other messages to be processed"
                    }
                ]
            }
        }
    ],
    relationships: [
        { from: 'process_message', to: 'build_context', type: 'calls', label: '调用' },
        { from: 'process_message', to: 'call_llm', type: 'data_flow', label: 'Data', style: 'dashed' }
    ]
};
```

## Knowledge Graph Visualization

```javascript
function generateKnowledgeGraph(methodsData) {
    return {
        nodes: methodsData.methods.map(m => ({
            id: m.id,
            label: m.name,
            category: m.category,
            level: m.level
        })),
        edges: methodsData.relationships.map(r => ({
            source: r.from,
            target: r.to,
            type: r.type,
            label: r.label
        }))
    };
}
```

## HTML Template

```html
<section id="methods" class="section">
    <div class="content-card">
        <h1><i class="fas fa-code"></i> 方法介绍</h1>
        
        <div class="methods-pyramid">
            <div class="pyramid-level level-1">
                <h3>入口方法</h3>
                <div class="method-cards">
                    <!-- Entry point methods -->
                </div>
            </div>
            <div class="pyramid-level level-2">
                <h3>核心逻辑</h3>
                <div class="method-cards">
                    <!-- Core logic methods -->
                </div>
            </div>
            <div class="pyramid-level level-3">
                <h3>辅助工具</h3>
                <div class="method-cards">
                    <!-- Utility methods -->
                </div>
            </div>
        </div>
        
        <div class="knowledge-graph" id="knowledgeGraph">
            <!-- D3.js or Cytoscape.js visualization -->
        </div>
    </div>
</section>
```

## Workflow

1. **Find all functions** - Grep with line numbers
2. **Extract signatures** - Read files
3. **Build call graph** - Analyze calls
4. **Categorize methods** - By responsibility
5. **Create pyramid** - Organize by level
6. **Generate graph** - Visualize relationships
