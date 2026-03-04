# Stage 6: Run Demo & Execution Flow

Create interactive demo scenarios showing actual execution flow.

## Demo Scenario Design Process

```
Step 6.1: Identify Key Scenarios
→ What are the main use cases?
→ Example: User sends message → Agent processes → Response returned

Step 6.2: Trace Execution Path
→ Tool: Read code to trace function calls
→ Document: each step in the chain

Step 6.3: Create Flow Diagram
→ Use SVG or Mermaid.js
→ Show: data flow, decision points, branches

Step 6.4: Add Interactive Controls
→ Play/Pause, Step Forward/Backward
→ Highlight current step
```

## Demo Scenario Template

```javascript
const demoData = {
    'user-message-flow': {
        title: '用户消息处理流程',
        description: '演示用户消息如何被处理并生成响应',
        steps: [
            {
                id: 1,
                title: '用户发送消息',
                description: '用户通过界面输入消息',
                code: `user_input = "帮我写一个Python函数"`,
                highlight: 'user-input',
                duration: 1000
            },
            {
                id: 2,
                title: '消息入队',
                description: '消息被放入消息队列',
                code: `await message_bus.publish(InboundMessage(...))`,
                highlight: 'message-bus',
                duration: 800
            },
            {
                id: 3,
                title: 'Agent处理',
                description: 'Agent循环检测到新消息',
                code: `async def process_message(msg):
    context = await build_context(msg)
    response = await call_llm(context)`,
                highlight: 'agent-loop',
                duration: 1500
            },
            {
                id: 4,
                title: '返回响应',
                description: '响应被发送回用户',
                code: `await send_response(response)`,
                highlight: 'response',
                duration: 600
            }
        ],
        flowDiagram: 'user-message-flow.svg'
    }
};
```

## Flow Diagram Generator

See: [generators/flow-diagram.js](../generators/flow-diagram.js)

```javascript
function generateFlowDiagram(steps) {
    const width = 800;
    const height = 400;
    const nodeWidth = 180;
    const nodeHeight = 80;
    const startX = 50;
    const spacing = 200;
    
    let svg = `<svg viewBox="0 0 ${width} ${height}" class="flow-svg">`;
    svg += `<defs>
        <marker id="flow-arrow" markerWidth="10" markerHeight="7" 
                refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#667eea"/>
        </marker>
    </defs>`;
    
    steps.forEach((step, i) => {
        const x = startX + i * spacing;
        const y = height / 2 - nodeHeight / 2;
        
        svg += `
            <g class="flow-node" data-step="${step.id}">
                <rect x="${x}" y="${y}" width="${nodeWidth}" height="${nodeHeight}" 
                      rx="8" fill="#667eea" opacity="0.9"/>
                <text x="${x + nodeWidth/2}" y="${y + nodeHeight/2 - 10}" 
                      text-anchor="middle" fill="white" font-size="12" font-weight="600">
                    Step ${step.id}
                </text>
                <text x="${x + nodeWidth/2}" y="${y + nodeHeight/2 + 10}" 
                      text-anchor="middle" fill="white" font-size="11">
                    ${step.title}
                </text>
            </g>`;
        
        if (i < steps.length - 1) {
            svg += `<line x1="${x + nodeWidth}" y1="${y + nodeHeight/2}" 
                          x2="${x + spacing}" y2="${y + nodeHeight/2}" 
                          stroke="#667eea" stroke-width="2" marker-end="url(#flow-arrow)"/>`;
        }
    });
    
    svg += '</svg>';
    return svg;
}
```

## HTML Template

```html
<section id="demo" class="section">
    <div class="content-card">
        <h1><i class="fas fa-play-circle"></i> 运行演示</h1>
        
        <div class="demo-selector">
            <button class="demo-btn active" onclick="selectDemo('user-message-flow')">
                用户消息处理
            </button>
            <button class="demo-btn" onclick="selectDemo('tool-call-flow')">
                工具调用流程
            </button>
        </div>
        
        <div class="demo-container">
            <div class="demo-flow" id="demoFlow">
                <!-- Flow diagram SVG -->
            </div>
            
            <div class="demo-controls">
                <button onclick="playDemo()"><i class="fas fa-play"></i></button>
                <button onclick="pauseDemo()"><i class="fas fa-pause"></i></button>
                <button onclick="resetDemo()"><i class="fas fa-redo"></i></button>
                <button onclick="stepForward()"><i class="fas fa-step-forward"></i></button>
            </div>
            
            <div class="demo-step-detail" id="demoStepDetail">
                <h3 id="stepTitle">Step 1: 用户发送消息</h3>
                <p id="stepDescription">用户通过界面输入消息</p>
                <pre id="stepCode"><code>user_input = "..."</code></pre>
            </div>
        </div>
    </div>
</section>
```

## Demo Controller JavaScript

```javascript
class DemoController {
    constructor(demoData) {
        this.data = demoData;
        this.currentStep = 0;
        this.isPlaying = false;
        this.timer = null;
    }
    
    play() {
        this.isPlaying = true;
        this.runStep();
    }
    
    pause() {
        this.isPlaying = false;
        clearTimeout(this.timer);
    }
    
    reset() {
        this.currentStep = 0;
        this.isPlaying = false;
        this.updateDisplay();
    }
    
    stepForward() {
        if (this.currentStep < this.data.steps.length - 1) {
            this.currentStep++;
            this.updateDisplay();
        }
    }
    
    runStep() {
        if (!this.isPlaying || this.currentStep >= this.data.steps.length) {
            this.isPlaying = false;
            return;
        }
        
        this.updateDisplay();
        this.currentStep++;
        
        const step = this.data.steps[this.currentStep - 1];
        this.timer = setTimeout(() => this.runStep(), step.duration);
    }
    
    updateDisplay() {
        const step = this.data.steps[this.currentStep];
        document.getElementById('stepTitle').textContent = 
            `Step ${step.id}: ${step.title}`;
        document.getElementById('stepDescription').textContent = step.description;
        document.getElementById('stepCode').innerHTML = 
            `<code>${step.code}</code>`;
        
        // Highlight current node in flow diagram
        document.querySelectorAll('.flow-node').forEach(n => 
            n.classList.remove('active'));
        document.querySelector(`[data-step="${step.id}"]`)?.classList.add('active');
    }
}
```

## Workflow

1. **Identify scenarios** - Main use cases
2. **Trace execution** - Read code paths
3. **Create steps** - Document each step
4. **Generate flow diagram** - SVG visualization
5. **Add controls** - Play/Pause/Step
6. **Test interactivity** - Verify all controls work
