function convertToSvg(text, callback) {
    // Create a script element with the LaTeX code
    const hiddenElement = document.createElement('div');
    hiddenElement.style.position = 'absolute';
    hiddenElement.style.left = '100%';
    document.body.appendChild(hiddenElement);

    const mathScript = document.createElement('script');
    mathScript.setAttribute('type', 'math/tex');
    mathScript.innerHTML = text;

    hiddenElement.appendChild(mathScript);

    MathJax.Hub.Process(mathScript, () => {
        // When processing is done, remove from the DOM
        // Wait some time before doing tht because MathJax calls this function before
        // actually displaying the output
        const display = () => {
            // Get the frame where the current Math is displayed
            const frame = document.getElementById(`${ mathScript.id }-Frame`);
            if (!frame) {
                setTimeout(display, 500);
                return;
            }

            // Load the SVG
            const svg = frame.getElementsByTagName('svg')[0];

            if (!svg) {
                console.log('Uh oh. Something went wrong');
                return false;
            }

            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            const height = svg.parentNode.offsetHeight;
            const width = svg.parentNode.offsetWidth;
            svg.setAttribute('height', height);
            svg.setAttribute('width', width);
            svg.removeAttribute('style');

            // Embed the global MathJAX elements to it
            const mathJaxGlobal = document.getElementById('MathJax_SVG_glyphs');
            svg.appendChild(mathJaxGlobal.cloneNode(true));

            // Remove the temporary elements
            document.body.removeChild(hiddenElement);


            // Invoke the user callback
            callback({
                height,
                svg: svg.outerHTML,
                width
            });
        };

        setTimeout(display, 1000);
    });
}

let finalsvg;

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

const downButton = document.getElementById('download');
downButton.addEventListener("click", downloadSvg);

function downloadSvg() {
    console.log(latex);
    convertToSvg(latex.toString(), ({ height, svg, width }) => {
        download('latexSvg.svg', svg)
    });
}

