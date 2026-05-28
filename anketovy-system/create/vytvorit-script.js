 const questions = [];
 let moznosti;
 let check;
 let nazevA;
const nahledContent = document.getElementById("nahledContent");
///////////

function renderPreview()
{
    nahledContent.innerHTML = "";



    // no questions
    if(questions.length == 0)
    {
        nahledContent.innerHTML =
            "<p>Zatím žádné otázky</p>";

        return;
    }



    questions.forEach((x, index) => {

        const div =
            document.createElement("div");



        div.innerHTML = `
            <br><p><hr>
                <strong>
                    ${x.text}
                </strong>
            </p>
        `;


        const deleteBtn =
            document.createElement("button");

        deleteBtn.textContent =
            "Smazat otázku";



        deleteBtn.addEventListener(
            "click",
            () => {

                questions.splice(index, 1);

                renderPreview();

            }
        );



        div.appendChild(deleteBtn);



        // info
        if(x.check == 1)
        {
            const info =
                document.createElement("div");

            info.innerHTML =
                "<br>(více odpovědí)<br><br>";

            div.appendChild(info);
        }



        if(x.check == 2)
        {
            const info =
                document.createElement("div");

            info.innerHTML =
                "<br>(jedna odpověď)<br><br>";

            div.appendChild(info);
        }



        // textodpoved
        if(x.check == 0)
        {
            const info =
                document.createElement("div");

            info.innerHTML =
                "<br>(text odpověď)<br><br>";

            div.appendChild(info);



            const textarea =
                document.createElement("textarea");

            textarea.disabled = true;

            div.appendChild(textarea);
        }



        // radio a checkbox
        if(x.check != 0)
        {
            x.moznosti.forEach(option => {

                const label =
                    document.createElement("label");

                label.style.display = "block";



                const input =
                    document.createElement("input");



                if(x.check == 2)
                {
                    input.type = "radio";

                    input.name =
                        "q_" + index;
                }



                if(x.check == 1)
                {
                    input.type =
                        "checkbox";
                }



                input.disabled = true;



                label.appendChild(input);

                label.append(
                    " " + option
                );



                div.appendChild(label);

            });
        }



        nahledContent.appendChild(div);

    });
}






/////////
document.getElementById("addQuestion").addEventListener("click", () => {
  const text = document.getElementById("questionText").value;
  const type = document.getElementById("questionType").value;
  

  if(type == "text")
  {
    moznosti = [];
    check = 0
  }
  if(type == "checkbox")
  {
    moznosti = document.getElementById("moznosti").value.split(",");
    check=1
  }
  if(type == "radio")
  {
    moznosti = document.getElementById("moznosti").value.split(",");
    check=2
  }


  
  

  questions.push({text, type, moznosti, check});
  renderPreview();
});

// document.getElementById("updatePreview").addEventListener("click", () => {
//   nahledContent.innerHTML = "";


  

//   questions.forEach(x => {
//     const div = document.createElement("div");
//     div.innerHTML = `<p><strong>${x.text}</strong></p>`;
//     nahledContent.appendChild(div);


//     if(x.check == 1)
//     {
//       const info = document.createElement("div");
//       info.innerHTML = "(více odpovědí) <br> <br>";
//       div.appendChild(info);
//     }

//     if(x.check == 2)
//     {
//       const info = document.createElement("div");
//       info.innerHTML = "(jedna odpověď) <br> <br>";
//       div.appendChild(info);
//     }

//     if (x.check == 0) {
//       const info = document.createElement("div");
//       info.textContent = "(text odpověď)";
//       div.appendChild(info);
//       const textarea = document.createElement("textarea");
//       textarea.disabled=true;
//       div.appendChild(textarea);
//     }


//     if(x.check != 0)
//     {
//       x.moznosti.forEach(option => {

//     const label = document.createElement("label");
//     label.style.display = "block";
//     const input = document.createElement("input");

//     if (x.check == 2) {
//       input.type = "radio";
//       input.name = "q_" + questions.indexOf(x);
//     }
//     if (x.check == 1) {
//       input.type = "checkbox";
//     }
//     input.disabled = true;
    
//     label.appendChild(input);
//     label.append(" " + option);

//     div.appendChild(label);

//                                 });
//     }

    
    

//                          });
//                                                                          });

// document.getElementById("removeLast").addEventListener("click", () => {
//   questions.pop();
// });


document.getElementById("exportPoll").addEventListener("click", () => {


  try{
    nazevA = document.getElementById("anketaName").value.trim();
  }
  catch(error)
  {
    console.log(error)
    alert("Název ankety nemůže být !");
      return;
  }

  if(nazevA) 
  {

const pollData={
  nazev: nazevA,
  otazky: questions
}

  
  const data = JSON.stringify(pollData,null,2);

  const blob = new Blob([data], {type: "application/json"});

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);

  a.download = nazevA+".json";

  a.click();}

    else
    {
      alert("Název ankety nemůže být prázdný!");
      return;
    }






})

////////////////////////

document.getElementById("savePoll")
.addEventListener("click", async ()=>{

const pollData = {

nazev:
document.getElementById("anketaName").value,

otazky:
questions

};

try{

const res = await fetch("save-poll.php",{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:
JSON.stringify(
pollData
)});

const data = await res.text();
alert(data);
}

catch(error){
console.log(error);
}
});




// import ankety
document
.getElementById("importFile")

.addEventListener("change", event => {

    const file =
        event.target.files[0];



    if(!file)
    {
        return;
    }



    const reader =
        new FileReader();



    reader.onload = e => {

        try
        {

            const imported =
                JSON.parse(e.target.result);



            document.getElementById(
                "anketaName"
            ).value =
                imported.nazev;



            // delete old otazky
            questions.length = 0;



            // import new otazky
            imported.otazky.forEach(q => {

                questions.push(q);

            });



            renderPreview();

            alert("Import hotový");

        }
        catch(error)
        {

            console.log(error);

            alert("Neplatný JSON");

        }

    };



    reader.readAsText(file);

});