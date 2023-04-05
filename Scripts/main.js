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

    //Excel equation
    toExcel();
    document.getElementById('excel').value = excel;
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

//CREATE EXCEL EQUATION

//Always the latest excel equation
let excel;
function toExcel() {
    excel = latex.replaceAll("\\left", "");
    excel = excel.replaceAll("\\right", "");
    excel = excel.replaceAll("\\pm", "PM");
    excel = excel.replaceAll("\\placeholder{▢}", "▢");
    replaceFrac()
    excel = excel.replaceAll("\\", "");
    excel = excel.replaceAll("{", "(");
    excel = excel.replaceAll("}", ")");

}

//Transforms Fractions from Latex to Excel equation
function replaceFrac() {

    let count = 0;
    let beggingFound = false;
    let beggingIndex = null;

    for (const i in excel) {

        //Finds where the brackets for the frac start in Latex equation
        if (!beggingFound) {

            if (excel[i] === "\\") {
                let j = parseInt(i);

                if (excel[j + 1] === "f") {

                    if (excel[j + 2] === "r") {

                        if (excel[j + 3] === "a") {

                            if (excel[j + 4] === "c") {

                                beggingIndex = j + 5;
                                beggingFound = true;
                                //console.log(beggingIndex)

                            }
                        }
                    }
                }
            }

        //Inserts the / in the right postition
        }else if (parseInt(i) >= beggingIndex){

            if (excel[i] === "{") {
                count++;

            } else if (excel[i] === "}") {
                count--;

            }if (count === 0) {
                excel = excel.substring(0, parseInt(i) + 1) + "/" + excel.substring(parseInt(i) + 1, excel.length);
                excel = excel.replace("\\frac", "");
                beggingFound = false;
            }
        }
    }
}