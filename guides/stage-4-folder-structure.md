# Stage 4: Interactive Folder Structure

Create explorable folder tree with code viewers.

## Folder Tree Generation Process

```
Step 4.1: Get Directory Structure
→ Tool: LS recursively (or use Glob)
→ Build: tree structure object

Step 4.2: Get File Descriptions
→ Tool: Read first 20 lines of each file
→ Extract: docstrings, comments, imports

Step 4.3: Categorize Files
→ Core files: main logic
→ Config files: settings
→ Test files: skip or mark separately
→ Utility files: helpers
```

## Folder Description Auto-Generation

```javascript
function generateFileDescription(filePath, content) {
    // 1. Check for module docstring
    const docstringMatch = content.match(/"""([\s\S]*?)"""/);
    if (docstringMatch) {
        return docstringMatch[1].split('\n')[0].trim();
    }
    
    // 2. Check for class/function definitions
    const classMatch = content.match(/class\s+(\w+)/);
    if (classMatch) {
        return `定义 ${classMatch[1]} 类`;
    }
    
    // 3. Check for main functions
    const funcMatches = content.match(/def\s+(\w+)/g);
    if (funcMatches && funcMatches.length > 0) {
        const funcs = funcMatches.slice(0, 3).map(f => f.replace('def ', ''));
        return `包含: ${funcs.join(', ')} 等方法`;
    }
    
    // 4. Default description
    return '辅助模块';
}
```

## HTML Template

```html
<section id="folder-structure" class="section">
    <div class="content-card">
        <h1><i class="fas fa-folder-tree"></i> 文件夹结构</h1>
        
        <div class="folder-tree" id="folderTree">
            <div class="folder-item">
                <div class="folder-header" onclick="toggleFolder(this)">
                    <i class="fas fa-folder-open"></i>
                    <span class="folder-name">nanobot/</span>
                    <span class="folder-desc">主模块</span>
                    <i class="fas fa-chevron-down folder-toggle"></i>
                </div>
                <div class="folder-children">
                    <div class="file-item" onclick="showSourceCode('agent-loop')">
                        <i class="fas fa-file-code"></i>
                        <span class="file-name">loop.py</span>
                        <span class="file-desc">Agent处理循环</span>
                        <i class="fas fa-arrow-right file-arrow"></i>
                    </div>
                    <!-- More files -->
                </div>
            </div>
        </div>
    </div>
</section>
```

## JavaScript for Folder Tree

```javascript
function generateFolderTree(structure) {
    let html = '<div class="folder-root">';
    
    structure.forEach(item => {
        if (item.type === 'folder') {
            html += `
                <div class="folder-item">
                    <div class="folder-header" onclick="toggleFolder(this)">
                        <i class="fas fa-folder${item.expanded ? '-open' : ''}"></i>
                        <span class="folder-name">${item.name}</span>
                        <span class="folder-desc">${item.description || ''}</span>
                        <i class="fas fa-chevron-${item.expanded ? 'down' : 'right'} folder-toggle"></i>
                    </div>
                    <div class="folder-children" style="display: ${item.expanded ? 'block' : 'none'}">
                        ${generateFolderTree(item.children)}
                    </div>
                </div>
            `;
        } else {
            html += `
                <div class="file-item" onclick="showSourceCode('${item.id}')">
                    <i class="fas fa-file-code"></i>
                    <span class="file-name">${item.name}</span>
                    <span class="file-desc">${item.description || ''}</span>
                    <i class="fas fa-arrow-right file-arrow"></i>
                </div>
            `;
        }
    });
    
    html += '</div>';
    return html;
}

function toggleFolder(header) {
    const item = header.parentElement;
    const children = item.querySelector('.folder-children');
    const icon = header.querySelector('.fa-folder, .fa-folder-open');
    const toggle = header.querySelector('.folder-toggle');
    
    if (children.style.display === 'none') {
        children.style.display = 'block';
        icon.classList.replace('fa-folder', 'fa-folder-open');
        toggle.classList.replace('fa-chevron-right', 'fa-chevron-down');
    } else {
        children.style.display = 'none';
        icon.classList.replace('fa-folder-open', 'fa-folder');
        toggle.classList.replace('fa-chevron-down', 'fa-chevron-right');
    }
}
```

## Workflow

1. **Get directory structure** - LS recursively
2. **Read file headers** - Get descriptions
3. **Build tree object** - Structure data
4. **Generate HTML** - Use template
5. **Add interactions** - Toggle folders
6. **Link to code viewer** - onclick handlers
