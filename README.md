# Live Code Editor

This project is a simple, live code editor built with HTML, CSS, and JavaScript. It allows users to write and execute HTML, CSS, and JavaScript code in real-time, displaying the output directly in an iframe.

## Features

* **Live Updates:** Code changes are reflected immediately in the output iframe.
* **Multi-Language Support:** Supports HTML, CSS, and JavaScript.
* **Simple Interface:** Easy to use and understand.
* **Client-Side Execution:** Code runs entirely in the browser.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    ```

2.  **Open `index.html` in your web browser.**

    You can simply double-click the `index.html` file or use a local server.

## Usage

1.  Open `index.html` in your browser.
2.  You'll see three text areas: one for HTML, one for CSS, and one for JavaScript.
3.  Enter your code into the respective text areas.
4.  The output will be displayed in the iframe below the code editors.

## File Structure

live-code-editor/
├── index.html
├── styles.css
└── script.js

* `index.html`: The main HTML file containing the structure of the editor.
* `styles.css`: The stylesheet for the editor's appearance.
* `script.js`: The JavaScript file that handles the live code execution.

## Technologies Used

* **HTML:** For the structure of the editor.
* **CSS:** For styling the editor.
* **JavaScript:** For handling the live code execution and updating the iframe.

## Code Explanation

The JavaScript code in `script.js` listens for changes in the text areas. When a change occurs, it combines the HTML, CSS, and JavaScript code into a single HTML string and sets it as the content of the iframe.

```javascript
const htmlCode = document.getElementById('htmlCode');
const cssCode = document.getElementById('cssCode');
const jsCode = document.getElementById('jsCode');
const output = document.getElementById('output');

function run() {
  let html = htmlCode.value;
  let css = "<style>" + cssCode.value + "</style>";
  let js = "<script>" + jsCode.value + "</script>";
  output.contentDocument.body.innerHTML = html + css + js;
  output.contentWindow.eval(jsCode.value);
}

htmlCode.addEventListener('input', run);
cssCode.addEventListener('input', run);
jsCode.addEventListener('input', run);
````
