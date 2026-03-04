function generateFlowDiagram(steps, options = {}) {
    const width = options.width || 800;
    const height = options.height || 300;
    const nodeWidth = options.nodeWidth || 160;
    const nodeHeight = options.nodeHeight || 70;
    const startX = 40;
    const spacing = 180;
    
    let svg = `<svg viewBox="0 0 ${width} ${height}" class="flow-svg" xmlns="http://www.w3.org/2000/svg">`;
    
    svg += `
        <defs>
            <marker id="flow-arrow" markerWidth="10" markerHeight="7" 
                    refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#667eea"/>
            </marker>
            <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#667eea"/>
                <stop offset="100%" style="stop-color:#764ba2"/>
            </linearGradient>
            <linearGradient id="flow-grad-active" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#48bb78"/>
                <stop offset="100%" style="stop-color:#38a169"/>
            </linearGradient>
            <filter id="flow-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.3"/>
            </filter>
        </defs>
    `;
    
    svg += `<style>
        .flow-node { cursor: pointer; transition: all 0.3s; }
        .flow-node.active rect { fill: url(#flow-grad-active); }
        .flow-node text { font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
        .flow-edge { stroke: #667eea; stroke-width: 2; fill: none; }
        .flow-step-num { font-size: 11px; fill: rgba(255,255,255,0.7); }
    </style>`;
    
    const centerY = height / 2 - nodeHeight / 2;
    
    steps.forEach((step, i) => {
        const x = startX + i * spacing;
        const y = centerY;
        
        svg += `
            <g class="flow-node" data-step="${step.id}" onclick="selectFlowStep(${step.id})">
                <rect x="${x}" y="${y}" width="${nodeWidth}" height="${nodeHeight}" 
                      rx="8" fill="url(#flow-grad)" filter="url(#flow-shadow)"/>
                <text x="${x + nodeWidth/2}" y="${y + 20}" 
                      text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="11">
                    Step ${step.id}
                </text>
                <text x="${x + nodeWidth/2}" y="${y + nodeHeight/2 + 8}" 
                      text-anchor="middle" fill="white" font-size="12" font-weight="600">
                    ${truncateText(step.title, 12)}
                </text>
            </g>
        `;
        
        if (i < steps.length - 1) {
            svg += `
                <line class="flow-edge" 
                      x1="${x + nodeWidth}" y1="${y + nodeHeight/2}" 
                      x2="${x + spacing}" y2="${y + nodeHeight/2}" 
                      marker-end="url(#flow-arrow)"/>
            `;
        }
    });
    
    svg += '</svg>';
    return svg;
}

function generateVerticalFlowDiagram(steps, options = {}) {
    const width = options.width || 600;
    const nodeWidth = options.nodeWidth || 200;
    const nodeHeight = options.nodeHeight || 60;
    const padding = 40;
    const spacing = 100;
    const height = padding * 2 + steps.length * (nodeHeight + spacing) - spacing;
    
    let svg = `<svg viewBox="0 0 ${width} ${height}" class="flow-svg-vertical" xmlns="http://www.w3.org/2000/svg">`;
    
    svg += `
        <defs>
            <marker id="vflow-arrow" markerWidth="10" markerHeight="7" 
                    refX="3.5" refY="5" orient="auto">
                <polygon points="0 0, 7 5, 0 10" fill="#667eea"/>
            </marker>
            <linearGradient id="vflow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#667eea"/>
                <stop offset="100%" style="stop-color:#764ba2"/>
            </linearGradient>
        </defs>
    `;
    
    const centerX = width / 2 - nodeWidth / 2;
    
    steps.forEach((step, i) => {
        const x = centerX;
        const y = padding + i * (nodeHeight + spacing);
        
        svg += `
            <g class="flow-node" data-step="${step.id}">
                <rect x="${x}" y="${y}" width="${nodeWidth}" height="${nodeHeight}" 
                      rx="8" fill="url(#vflow-grad)"/>
                <text x="${x + nodeWidth/2}" y="${y + nodeHeight/2 + 5}" 
                      text-anchor="middle" fill="white" font-size="13" font-weight="600">
                    ${step.title}
                </text>
            </g>
        `;
        
        if (i < steps.length - 1) {
            svg += `
                <line stroke="#667eea" stroke-width="2" 
                      x1="${x + nodeWidth/2}" y1="${y + nodeHeight}" 
                      x2="${x + nodeWidth/2}" y2="${y + nodeHeight + spacing}" 
                      marker-end="url(#vflow-arrow)"/>
            `;
        }
    });
    
    svg += '</svg>';
    return svg;
}

function truncateText(text, maxLen) {
    return text.length > maxLen ? text.substring(0, maxLen - 2) + '..' : text;
}

function selectFlowStep(stepId) {
    document.querySelectorAll('.flow-node').forEach(node => {
        node.classList.toggle('active', parseInt(node.dataset.step) === stepId);
    });
    
    if (typeof window.onFlowStepSelect === 'function') {
        window.onFlowStepSelect(stepId);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateFlowDiagram, generateVerticalFlowDiagram };
}
