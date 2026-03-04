function generateFolderTree(structure, options = {}) {
    const showDescriptions = options.showDescriptions !== false;
    const expanded = options.expanded || [];
    
    function renderNode(item, level = 0) {
        const indent = level * 20;
        
        if (item.type === 'folder') {
            const isExpanded = expanded.includes(item.name) || item.expanded;
            return `
                <div class="folder-item" style="margin-left: ${indent}px">
                    <div class="folder-header" onclick="toggleFolder(this)">
                        <i class="fas fa-folder${isExpanded ? '-open' : ''}"></i>
                        <span class="folder-name">${item.name}</span>
                        ${showDescriptions && item.description ? 
                            `<span class="folder-desc">${item.description}</span>` : ''}
                        <i class="fas fa-chevron-${isExpanded ? 'down' : 'right'} folder-toggle"></i>
                    </div>
                    <div class="folder-children" style="display: ${isExpanded ? 'block' : 'none'}">
                        ${(item.children || []).map(child => renderNode(child, level + 1)).join('')}
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="file-item" style="margin-left: ${indent}px" 
                     onclick="showSourceCode('${item.id}')">
                    <i class="fas fa-file-code"></i>
                    <span class="file-name">${item.name}</span>
                    ${showDescriptions && item.description ? 
                        `<span class="file-desc">${item.description}</span>` : ''}
                    <i class="fas fa-arrow-right file-arrow"></i>
                </div>
            `;
        }
    }
    
    return `<div class="folder-tree-root">${structure.map(item => renderNode(item)).join('')}</div>`;
}

function parseDirectoryListing(lsOutput, basePath = '') {
    const lines = lsOutput.split('\n').filter(line => line.trim());
    const structure = [];
    
    let currentFolder = null;
    let currentChildren = [];
    
    lines.forEach(line => {
        const match = line.match(/^(\s*)(.+)\/$/);
        if (match) {
            const level = match[1].length / 2;
            const name = match[2].replace(/\/$/, '');
            
            if (level === 0) {
                if (currentFolder) {
                    currentFolder.children = currentChildren;
                    structure.push(currentFolder);
                }
                currentFolder = { type: 'folder', name, children: [], expanded: true };
                currentChildren = [];
            }
        }
    });
    
    if (currentFolder) {
        currentFolder.children = currentChildren;
        structure.push(currentFolder);
    }
    
    return structure;
}

function buildFolderStructureFromGlob(globResults, rootPath) {
    const structure = {};
    
    globResults.forEach(filePath => {
        const relativePath = filePath.replace(rootPath, '').replace(/^\//, '');
        const parts = relativePath.split('/');
        
        let current = structure;
        
        parts.forEach((part, index) => {
            if (index === parts.length - 1) {
                current[part] = {
                    type: 'file',
                    name: part,
                    id: relativePath.replace(/\//g, '-').replace(/\.[^.]+$/, '')
                };
            } else {
                if (!current[part]) {
                    current[part] = { type: 'folder', name: part, children: {} };
                }
                current = current[part].children || current[part];
            }
        });
    });
    
    return convertToTreeArray(structure);
}

function convertToTreeArray(obj) {
    return Object.values(obj).map(item => {
        if (item.type === 'folder') {
            return {
                type: 'folder',
                name: item.name,
                children: convertToTreeArray(item.children || {}),
                expanded: true
            };
        }
        return item;
    });
}

function generateFileDescriptions(files, codeData) {
    return files.map(file => ({
        ...file,
        description: codeData[file.id]?.description || getFileDescription(file.name)
    }));
}

function getFileDescription(fileName) {
    const descMap = {
        '__init__.py': '模块初始化',
        'main.py': '程序入口',
        'config.py': '配置管理',
        'utils.py': '工具函数',
        'models.py': '数据模型',
        'views.py': '视图处理',
        'routes.py': '路由定义',
        'tests.py': '测试用例'
    };
    
    return descMap[fileName] || '源代码文件';
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        generateFolderTree, 
        parseDirectoryListing,
        buildFolderStructureFromGlob,
        generateFileDescriptions
    };
}
