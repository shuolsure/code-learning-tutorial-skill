function generateArchitectureSVG(modules, options = {}) {
    const width = options.width || 800;
    const height = options.height || 500;
    const nodeWidth = options.nodeWidth || 150;
    const nodeHeight = options.nodeHeight || 60;
    const padding = options.padding || 50;
    const colors = options.colors || {
        core: '#667eea',
        communication: '#48bb78',
        data: '#ed8936',
        external: '#9f7aea',
        utility: '#a0aec0'
    };
    
    const cols = Math.ceil(Math.sqrt(modules.length));
    const rows = Math.ceil(modules.length / cols);
    const spacingX = (width - 2 * padding - cols * nodeWidth) / (cols - 1 || 1);
    const spacingY = 100;
    
    let svg = `<svg viewBox="0 0 ${width} ${height}" class="arch-svg" xmlns="http://www.w3.org/2000/svg">`;
    
    svg += `
        <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                    refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#667eea"/>
            </marker>
            <linearGradient id="grad-core" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#667eea"/>
                <stop offset="100%" style="stop-color:#764ba2"/>
            </linearGradient>
            <linearGradient id="grad-comm" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#48bb78"/>
                <stop offset="100%" style="stop-color:#38a169"/>
            </linearGradient>
            <linearGradient id="grad-data" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#ed8936"/>
                <stop offset="100%" style="stop-color:#dd6b20"/>
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.3"/>
            </filter>
        </defs>
    `;
    
    svg += `<style>
        .arch-node { cursor: pointer; transition: transform 0.3s; }
        .arch-node:hover { transform: scale(1.05); }
        .arch-node rect { transition: opacity 0.3s; }
        .arch-node:hover rect { opacity: 1; }
        .arch-node text { font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
        .arch-label { font-size: 11px; fill: #a0aec0; }
        .arch-edge { stroke: #667eea; stroke-width: 2; fill: none; }
        .arch-edge-dashed { stroke-dasharray: 5,5; }
    </style>`;
    
    modules.forEach((mod, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = padding + col * (nodeWidth + spacingX);
        const y = padding + row * (nodeHeight + spacingY);
        
        const gradientId = `grad-${mod.type || 'core'}`;
        const color = colors[mod.type] || colors.core;
        
        svg += `
            <g class="arch-node" data-module="${mod.name}" onclick="highlightModule('${mod.name}')">
                <rect x="${x}" y="${y}" width="${nodeWidth}" height="${nodeHeight}" 
                      rx="8" fill="url(#${gradientId})" opacity="0.9" filter="url(#shadow)"/>
                <text x="${x + nodeWidth/2}" y="${y + nodeHeight/2 - 5}" 
                      text-anchor="middle" fill="white" font-size="13" font-weight="600">
                    ${mod.name}
                </text>
                <text x="${x + nodeWidth/2}" y="${y + nodeHeight/2 + 12}" 
                      text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="10">
                    ${mod.description || ''}
                </text>
            </g>
        `;
    });
    
    if (options.edges) {
        options.edges.forEach(edge => {
            const fromMod = modules.find(m => m.name === edge.from);
            const toMod = modules.find(m => m.name === edge.to);
            
            if (fromMod && toMod) {
                const fromIndex = modules.indexOf(fromMod);
                const toIndex = modules.indexOf(toMod);
                
                const fromCol = fromIndex % cols;
                const fromRow = Math.floor(fromIndex / cols);
                const toCol = toIndex % cols;
                const toRow = Math.floor(toIndex / cols);
                
                const x1 = padding + fromCol * (nodeWidth + spacingX) + nodeWidth;
                const y1 = padding + fromRow * (nodeHeight + spacingY) + nodeHeight / 2;
                const x2 = padding + toCol * (nodeWidth + spacingX);
                const y2 = padding + toRow * (nodeHeight + spacingY) + nodeHeight / 2;
                
                const dashed = edge.style === 'dashed' ? 'arch-edge-dashed' : '';
                svg += `
                    <path class="arch-edge ${dashed}" 
                          d="M${x1},${y1} C${x1 + 50},${y1} ${x2 - 50},${y2} ${x2},${y2}"
                          marker-end="url(#arrowhead)"/>
                    <text x="${(x1 + x2) / 2}" y="${(y1 + y2) / 2 - 10}" 
                          class="arch-label" text-anchor="middle">
                        ${edge.label || ''}
                    </text>
                `;
            }
        });
    }
    
    svg += '</svg>';
    return svg;
}

function highlightModule(moduleName) {
    document.querySelectorAll('.arch-node').forEach(node => {
        node.style.opacity = node.dataset.module === moduleName ? '1' : '0.3';
    });
}

function generateModuleCards(modules) {
    const icons = {
        core: '🤖',
        communication: '📡',
        data: '💾',
        external: '🔌',
        utility: '🔧'
    };
    
    return modules.map(mod => `
        <div class="module-card">
            <div class="module-icon">${icons[mod.type] || '📦'}</div>
            <h3>${mod.name}</h3>
            <p>${mod.description || ''}</p>
            <div class="module-responsibilities">
                ${(mod.responsibilities || []).map(r => 
                    `<span class="resp-tag">${r}</span>`
                ).join('')}
            </div>
        </div>
    `).join('');
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateArchitectureSVG, generateModuleCards };
}
