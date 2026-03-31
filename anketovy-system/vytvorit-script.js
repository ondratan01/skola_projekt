 const questions = [];
 let moznosti;
 let check;
const nahledContent = document.getElementById("nahledContent");

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
});

document.getElementById("updatePreview").addEventListener("click", () => {
  nahledContent.innerHTML = "";


  

  questions.forEach(x => {
    const div = document.createElement("div");
    div.innerHTML = `<p><strong>${x.text}</strong></p>`;
    nahledContent.appendChild(div);


    if(x.check == 1)
    {
      const info = document.createElement("div");
      info.innerHTML = "(více odpovědí) <br> <br>";
      div.appendChild(info);
    }

    if(x.check == 2)
    {
      const info = document.createElement("div");
      info.innerHTML = "(jedna odpověď) <br> <br>";
      div.appendChild(info);
    }

    if(x.check == 0)
    {
      const info = document.createElement("div");
      info.innerHTML = "(text odpověď) <br> <br>";
      div.appendChild(info);
    }


    if(x.check != 0)
    {
      x.moznosti.forEach(option => {
    const opt = document.createElement("div");
     opt.textContent = "- " + option;
     div.appendChild(opt);
                                });
    }
    

                         });
                                                                         });

document.getElementById("removeLast").addEventListener("click", () => {
  questions.pop();
});


document.getElementById("savePoll").addEventListener("click", () => {
  const data = JSON.stringify(questions,null,2);

  const blob = new Blob([data], {type: "application/json"});

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);

  a.download = "anketa.json";

  a.click();








})

