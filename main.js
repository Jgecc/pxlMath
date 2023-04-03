const ce = new ComputeEngine.ComputeEngine();

const mf = document.getElementById('formula');

let latex;

mf.addEventListener('input',(ev) => {
    latex = mf.value;
    document.getElementById('latex').value = mf.value;
    expr = ce.parse(mf.value);
    document.getElementById('simplify').value = expr.simplify().json;
    document.getElementById('evaluate').value = expr.evaluate().json;
    document.getElementById('excact').value = expr.N().json;
});

// Listen for changes in the latex text field, and reflect its value in
// the mathfield.

document.getElementById('latex').
addEventListener('input', (ev) => {
    /*mf.setValue(
        ev.target.value,
        {suppressChangeNotifications: true}
    );*/

    mf.value = ce.parse(ev.target.value);


    expr = ce.parse(mf.value);
    document.getElementById('simplify').value = expr.simplify().json;
});
