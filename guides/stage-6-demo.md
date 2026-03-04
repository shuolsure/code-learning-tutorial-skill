# Stage 6: Run Demo & Execution Flow

Create interactive demo scenarios showing actual execution flow.

## 🔧 Tool Commands (Copy-Paste Ready)

### 6.1 Identify Main Use Cases

```
Tool: Read
File: README.md
Limit: 50 lines
Goal: Find "Usage" or "Quick Start" section

Tool: Read  
File: main.py or __main__.py
Limit: 100 lines
Goal: Identify main entry points and scenarios
```

### 6.2 Trace Execution Path (Step-by-Step)

```
Step 1: Find Entry Point
Tool: Grep
Pattern: if __name__|async def main|def main|async def run
Output: files_with_matches

Step 2: Read Entry Function
Tool: Read
File: entry_file
Limit: 100 lines
Goal: Extract first function call chain

Step 3: Trace Each Call
For each function call found:
  Tool: Grep
  Pattern: def {function_name}|async def {function_name}
  Output: content, -n: true
  
  Tool: Read
  File: function_file
  Limit: 50 lines (around function)
  Goal: Find next calls in the chain

Step 4: Build Step Sequence
Record for each step:
  - Function name
  - File path
  - Line number
  - What it does (from docstring)
  - Key code snippet
```

### 6.3 Extract Code Snippets for Each Step

```
Tool: Read
File: each file in the chain
Limit: 30 lines (around the function)
Goal: Extract representative code snippet

Rules:
- Include function signature
- Include key logic (not all code)
- Max 15 lines per snippet
- Add comments if needed
```

---

## 📋 Demo Scenario Design Template

### Scenario Identification

```
Common Scenarios:
1. User Input Flow: user input → processing → response
2. Tool Call Flow: LLM decides → tool execution → result
3. Error Handling Flow: error occurs → handling → recovery
4. Data Flow: input data → transformation → output
5. Initialization Flow: startup → config load → ready
```

### Step Documentation Format

```javascript
{
    id: {{STEP_NUMBER}},
    title: '{{STEP_TITLE}}',
    description: '{{WHAT_HAPPENS}}',
    file: '{{FILE_PATH}}',
    line: {{LINE_NUMBER}},
    code: `{{CODE_SNIPPET}}`,
    highlight: '{{SVG_NODE_ID}}',
    duration: {{MS}},
    nextSteps: ['{{NEXT_FUNCTION_1}}', '{{NEXT_FUNCTION_2}}']
}
```

---

## 🎯 Execution Path Tracing Example

### For Nanobot Message Flow:

```
1. Entry Point: __main__.py
   Tool: Read __main__.py
   Found: app() → calls commands.py

2. Command Handler: cli/commands.py
   Tool: Read cli/commands.py
   Found: agent() → creates AgentLoop

3. Agent Loop: agent/loop.py
   Tool: Read agent/loop.py
   Found: run() → calls process_message()

4. Message Processing: agent/loop.py
   Tool: Read agent/loop.py (around process_message)
   Found: _process_event() → calls context.build_messages()

5. Context Building: agent/context.py
   Tool: Read agent/context.py
   Found: build_messages() → returns message list

6. LLM Call: agent/loop.py
   Tool: Read agent/loop.py
   Found: provider.chat() → calls LLM API

7. Response: agent/loop.py
   Tool: Read agent/loop.py
   Found: bus.publish_outbound() → sends response
```

---

## 📝 demo-data.js Generation Template

```javascript
const demoData = {
    '{{SCENARIO_ID}}': {
        title: '{{SCENARIO_NAME}}',
        description: '{{SCENARIO_DESCRIPTION}}',
        totalSteps: {{TOTAL_STEPS}},
        steps: [
            {
                id: 1,
                title: '{{STEP_TITLE}}',
                description: '{{STEP_DESCRIPTION}}',
                file: '{{FILE_PATH}}',
                line: {{LINE_NUMBER}},
                code: `{{CODE_SNIPPET_FROM_READ_TOOL}}`,
                highlight: 'node-1',
                duration: 1000,
                socratic: {
                    q: "为什么从这里开始？",
                    hint: "考虑程序入口...",
                    answer: "这是程序的主入口点，所有执行从这里开始"
                }
            }
        ],
        flowDiagram: generateFlowDiagram(steps)
    }
};
```

---

## �� Flow Diagram Auto-Generation

### SVG Generator Function

```javascript
function generateFlowDiagram(steps, options = {}) {
    const width = options.width || 900;
    const height = options.height || 300;
    const nodeWidth = 160;
    const nodeHeight = 70;
    const startX = 50;
    const startY = height / 2 - nodeHeight / 2;
    const spacing = 180;
    
    let svg = `<svg viewBox="0 0 ${width} ${height}" class="flow-svg" xmlns="http://www.w3.org/2000/svg">`;
    
    // Arrow marker
    svg += `<defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#667eea"/>
        </marker>
    </defs>`;
    
    // Generate nodes and edges
    steps.forEach((step, i) => {
        const x = startX + i * spacing;
        const y = startY;
        
        svg += `<g class="flow-node" data-step="${step.id}">`;
        svg += `<rect x="${x}" y="${y}" width="${nodeWidth}" height="${nodeHeight}" 
                      rx="8" fill="#667eea" opacity="0.9" class="node-rect"/>`;
        svg += `<text x="${x + 15}" y="${y + 20}" fill="white" font-size="11" opacity="0.8">
                    Step ${step.id}
                </text>`;
        
        const title = step.title.length > 15 ? step.title.slice(0, 15) + '...' : step.title;
        svg += `<text x="${x + nodeWidth/2}" y="${y + 45}" 
                      text-anchor="middle" fill="white" font-size="13" font-weight="600">
                    ${title}
                </text>`;
        
        svg += `</g>`;
        
        if (i < steps.length - 1) {
            svg += `<line x1="${x + nodeWidth}" y1="${y + nodeHeight/2}" 
                          x2="${x + spacing}" y2="${y + nodeHeight/2}" 
                          stroke="#667eea" stroke-width="2" 
                          marker-end="url(#arrowhead)" class="flow-edge"/>`;
        }
    });
    
    svg += '</svg>';
    return svg;
}
```

---

## �� HTML Template

```html
<section id="demo" class="section">
    <div class="content-card">
        <h1><i class="fas fa-play-circle"></i> 运行演示</h1>
        
        <div class="demo-intro">
            <p>通过交互式演示，理解代码的实际执行流程。</p>
        </div>
        
        <div class="demo-selector">
            {{DEMO_BUTTONS_HTML}}
        </div>
        
        <div class="demo-container">
            <div class="demo-flow" id="demoFlow">
                {{FLOW_DIAGRAM_SVG}}
            </div>
            
            <div class="demo-controls">
                <button onclick="playDemo()" title="播放">
                    <i class="fas fa-play"></i>
                </button>
                <button onclick="pauseDemo()" title="暂停">
                    <i class="fas fa-pause"></i>
                </button>
                <button onclick="resetDemo()" title="重置">
                    <i class="fas fa-redo"></i>
                </button>
                <button onclick="stepForward()" title="下一步">
                    <i class="fas fa-step-forward"></i>
                </button>
                <button onclick="stepBackward()" title="上一步">
                    <i class="fas fa-step-backward"></i>
                </button>
            </div>
            
            <div class="demo-step-detail" id="demoStepDetail">
                <div class="step-header">
                    <span class="step-badge">Step <span id="currentStepNum">1</span></span>
                    <h3 id="stepTitle">{{STEP_TITLE}}</h3>
                </div>
                <p id="stepDescription">{{STEP_DESCRIPTION}}</p>
                <div class="step-file">
                    <i class="fas fa-file-code"></i>
                    <span id="stepFile">{{FILE_PATH}}:{{LINE_NUMBER}}</span>
                </div>
                <pre id="stepCode"><code class="language-python">{{CODE_SNIPPET}}</code></pre>
            </div>
        </div>
    </div>
</section>
```

---

## ✅ Verification Checklist

After generation, verify:
- [ ] All steps have unique IDs
- [ ] Code snippets are from actual files
- [ ] Flow diagram renders correctly
- [ ] Play/Pause/Reset/Step buttons work
- [ ] Current step is highlighted
- [ ] File paths are correct
- [ ] Socratic questions for key steps
- [ ] Mobile responsive
