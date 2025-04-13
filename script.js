const editor = document.querySelector('textarea');
const result = document.querySelector('#result');
const sideMenu = document.createElement('div');
sideMenu.className = 'side-menu';

// Language icons and options
const languages = {
    'js': { name: 'JavaScript', icon: '<i class="fab fa-js"></i>' },
    'python': { name: 'Python', icon: '<i class="fab fa-python"></i>' },
    'java': { name: 'Java', icon: '<i class="fab fa-java"></i>' },
    'cpp': { name: 'C++', icon: '<i class="fas fa-code"></i>' },
    'html': { name: 'HTML', icon: '<i class="fab fa-html5"></i>' },
    'css': { name: 'CSS', icon: '<i class="fab fa-css3-alt"></i>' }
};

// Create side menu
function createSideMenu() {
    sideMenu.innerHTML = Object.entries(languages)
        .map(([key, lang]) => `
            <div class="menu-item" data-lang="${key}">
                <span class="lang-icon">${lang.icon}</span>
                <span class="lang-name">${lang.name}</span>
            </div>
        `).join('');
    document.body.insertBefore(sideMenu, document.querySelector('.container'));
}

// Default code templates
const defaultCodes = {
    js: '// JavaScript code\nconsole.log("Hello World");',
    python: '# Python code\nprint("Hello World")',
    java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World";\n    return 0;\n}',
    html: '<h1>Hello World</h1>',
    css: 'body {\n    background: #f0f0f0;\n}'
};

function run() {
    const code = editor.value;
    const language = document.querySelector('.menu-item.active').dataset.lang;
    
    // Clear previous output
    result.textContent = '';
    
    try {
        switch(language) {
            case 'js':
                // Capture console.log output
                const oldLog = console.log;
                console.log = (...args) => {
                    result.textContent += args.join(' ') + '\n';
                };
                eval(code);
                console.log = oldLog;
                break;
                
            case 'python':
                // Simulate Python output
                const prints = code.match(/print\((.*?)\)/g);
                if (prints) {
                    prints.forEach(print => {
                        const content = print.match(/print\((.*?)\)/)[1].replace(/['"]/g, '');
                        result.textContent += content + '\n';
                    });
                }
                break;
                
            default:
                result.textContent = `Code output will appear here\n${code}`;
        }
    } catch (error) {
        result.textContent = `Error: ${error.message}`;
    }
    
    localStorage.setItem('code', code);
    localStorage.setItem('language', language);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    createSideMenu();
    
    // Add click handlers for language selection
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            editor.value = defaultCodes[item.dataset.lang];
            updateLineNumbers();
            run();
        });
    });
    
    // Set initial language
    const initialLang = localStorage.getItem('language') || 'js';
    document.querySelector(`[data-lang="${initialLang}"]`).click();
    
    // Load saved code if exists
    if (localStorage.code) {
        editor.value = localStorage.getItem('code');
        updateLineNumbers();
        run();
    }
});

// Keep the existing line numbers and syntax highlighting code
function updateLineNumbers() {
    const lineNumbers = document.querySelector('.line-numbers');
    const lines = editor.value.split('\n').length;
    lineNumbers.innerHTML = Array(lines).fill(0).map((_, i) => i + 1).join('<br>');
}

editor.addEventListener('input', () => {
    updateLineNumbers();
    run();
});

editor.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 4;
    }
});

// Initialize
updateLineNumbers();
