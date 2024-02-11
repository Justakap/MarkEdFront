function marks() {
    var final = document.getElementById("final");
    // fetch all the subjects 
    var sodeca = document.getElementById("sodeca");
    var caeg = document.getElementById("caeg");
    var beelab = document.getElementById("beelab");
    var cp = document.getElementById("cp");
    var phylab = document.getElementById("phylab");
    var coslab = document.getElementById("coslab");
    //lecture below
    var maths = document.getElementById("maths");
    var phy = document.getElementById("phy");
    var pps = document.getElementById("pps");
    var bee = document.getElementById("bee");
    var cos = document.getElementById("cos");
    // Grades of all the subject 
    var sodecaGrade = (sodeca.value * 0.5)
    var caegGrade = (caeg.value * 1.5)
    var beelabGrade = (beelab.value * 1)
    var cpGrade = (cp.value * 1.5)
    var phylabGrade = (phylab.value * 1)
    var coslabGrade = (coslab.value * 1)

    // lecture below
    var mathsGrade = (maths.value * 4)
    var phyGrade = (phy.value * 4)
    var ppsGrade = (pps.value * 2)
    var beeGrade = (bee.value * 2)
    var cosGrade = (cos.value * 2)

    // total of all the grades

    var totalCreditPoints = mathsGrade + phyGrade + ppsGrade + beeGrade + cosGrade + caegGrade + beelabGrade + cpGrade + phylabGrade + coslabGrade + sodecaGrade;


    var total = parseFloat(totalCreditPoints / 20.5).toFixed(2)


    document.querySelector("#final").innerHTML = "<br>Final Grade Point : " + total + " !";

}
