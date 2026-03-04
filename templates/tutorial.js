let currentSection = 'overview';
let visitedSections = new Set(['overview']);
let totalSections = 7;
let demoController = null;

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initProgress();
    initSearch();
    initModal();
});

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = item.dataset.section;
            navigateToSection(sectionId);
        });
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                updateActiveNav(sectionId);
                visitedSections.add(sectionId);
                updateProgress();
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => observer.observe(section));
}

function navigateToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        updateActiveNav(sectionId);
        visitedSections.add(sectionId);
        updateProgress();
    }
}

function updateActiveNav(sectionId) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === sectionId) {
            item.classList.add('active');
        }
    });
    currentSection = sectionId;
}

function initProgress() {
    updateProgress();
}

function updateProgress() {
    const percent = Math.round((visitedSections.size / totalSections) * 100);
    document.getElementById('progressPercent').textContent = `${percent}%`;
    document.getElementById('progressFill').style.width = `${percent}%`;
}

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const navItems = document.querySelectorAll('.nav-item');
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        navItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (query && !text.includes(query)) {
                item.style.opacity = '0.3';
            } else {
                item.style.opacity = '1';
            }
        });
    });
}

function handleSearch(query) {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (query && !text.includes(query.toLowerCase())) {
            item.style.opacity = '0.3';
        } else {
            item.style.opacity = '1';
        }
    });
}

function initModal() {
    const modal = document.getElementById('codeModal');
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function showSourceCode(featureId) {
    const data = codeData[featureId];
    if (!data) return;
    
    const modal = document.getElementById('codeModal');
    const modalTitle = document.getElementById('modalTitle');
    const codeTabs = document.getElementById('codeTabs');
    const codeContent = document.getElementById('codeContent');
    const relatedFiles = document.getElementById('relatedFiles');
    
    modalTitle.textContent = data.title;
    
    codeTabs.innerHTML = data.sections.map((section, index) => `
        <button class="code-tab ${index === 0 ? 'active' : ''}" 
                onclick="switchTab(${index}, this)">
            ${section.name}
        </button>
    `).join('');
    
    renderCodeSection(0);
    
    relatedFiles.innerHTML = data.relatedFiles.map(file => `
        <div class="related-file" onclick="showRelatedFile('${file}')">
            <i class="fas fa-file-code"></i>
            <span>${file}</span>
        </div>
    `).join('');
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function renderCodeSection(index) {
    const data = Object.values(codeData)[0];
    if (!data || !data.sections[index]) return;
    
    const section = data.sections[index];
    const codeContent = document.getElementById('codeContent');
    
    codeContent.innerHTML = `
        <div class="code-explanation">
            ${section.explanation}
        </div>
        <pre><code class="language-python">${escapeHtml(section.code)}</code></pre>
    `;
    
    Prism.highlightAll();
}

function switchTab(index, btn) {
    document.querySelectorAll('.code-tab').forEach(tab => tab.classList.remove('active'));
    btn.classList.add('active');
    renderCodeSection(index);
}

function closeModal() {
    const modal = document.getElementById('codeModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function showRelatedFile(fileName) {
    console.log('Show related file:', fileName);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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

function selectDemo(demoId) {
    document.querySelectorAll('.demo-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const data = demoData[demoId];
    if (!data) return;
    
    demoController = new DemoController(data);
    demoController.reset();
}

function playDemo() {
    if (demoController) demoController.play();
}

function pauseDemo() {
    if (demoController) demoController.pause();
}

function resetDemo() {
    if (demoController) demoController.reset();
}

function stepForward() {
    if (demoController) demoController.stepForward();
}

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
        clearTimeout(this.timer);
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
        this.timer = setTimeout(() => this.runStep(), step.duration || 1500);
    }
    
    updateDisplay() {
        if (this.currentStep >= this.data.steps.length) {
            this.currentStep = this.data.steps.length - 1;
        }
        
        const step = this.data.steps[this.currentStep];
        
        document.getElementById('stepTitle').textContent = 
            `Step ${step.id}: ${step.title}`;
        document.getElementById('stepDescription').textContent = step.description;
        document.getElementById('stepCode').innerHTML = 
            `<code class="language-python">${escapeHtml(step.code)}</code>`;
        
        document.querySelectorAll('.flow-node').forEach(n => 
            n.classList.remove('active'));
        const activeNode = document.querySelector(`[data-step="${step.id}"]`);
        if (activeNode) {
            activeNode.classList.add('active');
        }
        
        Prism.highlightAll();
    }
}

function toggleHint(btn) {
    const content = btn.nextElementSibling;
    if (content.style.display === 'none') {
        content.style.display = 'block';
        btn.innerHTML = '<i class="fas fa-lightbulb"></i> 隐藏提示';
    } else {
        content.style.display = 'none';
        btn.innerHTML = '<i class="fas fa-lightbulb"></i> 提示';
    }
}

function toggleAnswer(btn) {
    const content = btn.nextElementSibling;
    if (content.style.display === 'none') {
        content.style.display = 'block';
        btn.innerHTML = '<i class="fas fa-eye-slash"></i> 隐藏答案';
    } else {
        content.style.display = 'none';
        btn.innerHTML = '<i class="fas fa-eye"></i> 查看答案';
    }
}

function toggleMiniHint(btn) {
    const hint = btn.nextElementSibling;
    hint.style.display = hint.style.display === 'none' ? 'block' : 'none';
}
