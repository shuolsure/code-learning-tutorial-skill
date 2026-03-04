# Stage 3: System Architecture

Visualize system architecture and data flow with auto-generated SVG diagrams.

## Architecture Analysis Process

```
Step 3.1: Identify Modules
→ Tool: LS to get top-level folders
→ Filter: exclude tests/, docs/, config/

Step 3.2: Map Dependencies
→ Tool: Grep "^import \|^from " in each module
→ Build: dependency graph

Step 3.3: Determine Data Flow
→ Tool: Read main entry point
→ Trace: how data moves between modules

Step 3.4: Identify Key Components
→ Tool: Grep "^class " to find main classes
→ Categorize: by responsibility
```

## Module Icons Reference

| Module Type | Icon | Example |
|-------------|------|---------|
| Core/Agent | 🤖 | agent/, core/ |
| Communication | 📡 | bus/, channels/ |
| Data/Storage | 💾 | session/, memory/ |
| External API | 🔌 | providers/, api/ |
| Utilities | 🔧 | utils/, helpers/ |
| Configuration | ⚙️ | config/, settings/ |

## SVG Architecture Generator

See: [generators/svg-architecture.js](../generators/svg-architecture.js)

```javascript
function generateArchitectureSVG(modules) {
    const width = 800;
    const height = 500;
    const nodeWidth = 150;
    const nodeHeight = 60;
    const padding = 50;
    
    let svg = `<svg viewBox="0 0 ${width} ${height}" class="arch-svg">`;
    svg += `<defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#667eea"/>
        </marker>
    </defs>`;
    
    // Calculate positions using grid layout
    const cols = Math.ceil(Math.sqrt(modules.length));
    modules.forEach((mod, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = padding + col * (nodeWidth + 50);
        const y = padding + row * (nodeHeight + 80);
        
        svg += `
            <g class="arch-node" data-module="${mod.name}">
                <rect x="${x}" y="${y}" width="${nodeWidth}" height="${nodeHeight}" 
                      rx="8" fill="${mod.color || '#667eea'}" opacity="0.9"/>
                <text x="${x + nodeWidth/2}" y="${y + nodeHeight/2 + 5}" 
                      text-anchor="middle" fill="white" font-size="14" font-weight="600">
                    ${mod.name}
                </text>
            </g>`;
    });
    
    svg += '</svg>';
    return svg;
}
```

## HTML Template

```html
<section id="architecture" class="section">
    <div class="content-card">
        <h1><i class="fas fa-project-diagram"></i> 系统架构</h1>
        
        <div class="architecture-diagram">
            <!-- SVG will be generated here -->
        </div>

        <div class="module-cards">
            <div class="module-card">
                <div class="module-icon">🤖</div>
                <h3>Agent 模块</h3>
                <p>核心处理引擎，负责消息处理和工具调用</p>
                <div class="module-responsibilities">
                    <span class="resp-tag">消息处理</span>
                    <span class="resp-tag">工具调用</span>
                </div>
            </div>
            <!-- More module cards -->
        </div>

        <div class="data-flow-section">
            <h2><i class="fas fa-exchange-alt"></i> 数据流向</h2>
            <div class="flow-steps">
                <div class="flow-step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h4>用户输入</h4>
                        <p>消息通过渠道进入系统</p>
                    </div>
                </div>
                <!-- More flow steps -->
            </div>
        </div>
    </div>
</section>
```

## Workflow

1. **List modules** - LS top-level folders
2. **Analyze dependencies** - Grep imports
3. **Determine data flow** - Read main.py
4. **Generate SVG** - Use generator
5. **Create module cards** - Fill template
6. **Document data flow** - Step by step
