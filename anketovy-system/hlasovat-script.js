// import { questions } from "./vytvorit-script";
const questions = [];



document.getElementById("importFile").addEventListener("change", (e) => {
    const file = e.target.files[0];

    if(!file) return;
    const reader = new FileReader();
    reader.onload = function(event){
        const content = event.target.result;
        const data = JSON.parse(content);
        console.log(data);

        questions.length = 0;
        questions.push(...data.otazky);
        const nazev = data.nazev;
    }

reader.readAsText(file);

})