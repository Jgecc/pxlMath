//THIS FILE CALCULATES ALL EQUATIONS SEEN ON THE WEBSITE

//Start the Libray used
const ce = new ComputeEngine.ComputeEngine();

//Mathfield
const mf = document.getElementById('formula');

//Always the latest latex equation
let latex;

//When the basic equation is updated, update all other equations
mf.addEventListener('input',(ev) => {

    //Latex equation
    latex = mf.value;
    document.getElementById('latex').value = mf.value;

    //Simplified equation, evaluate equation and calculate exact value
    expr = ce.parse(mf.value);
    document.getElementById('simplify').value = expr.simplify().json;
    document.getElementById('evaluate').value = expr.evaluate().json;
    document.getElementById('exact').value = expr.N().json;
});

// Listen for changes in the latex text field, and reflect its value in the mathfield.

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
