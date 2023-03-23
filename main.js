const ce = new ComputeEngine.ComputeEngine();

const mf = document.getElementById('formula');
mf.addEventListener('input',(ev) => {
    document.getElementById('latex').value = mf.value;
    expr = ce.parse(mf.value);
    document.getElementById('simplify').value = expr.simplify().json;
});

document.getElementById('latex').value = mf.value;

// Listen for changes in the latex text field, and reflect its value in
// the mathfield.

document.getElementById('latex').
addEventListener('input', (ev) => {
    mf.setValue(
        ev.target.value,
        {suppressChangeNotifications: true}
    );
});
