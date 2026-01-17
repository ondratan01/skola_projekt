const questions = [];

const nahledContent = document.getElementById("nahledContent");

document.getElementById("addQuestion").addEventListener("click", () => {
  const text = document.getElementById("questionText").value;
  const type = document.getElementById("questionType").value;
  const moznosti = document.getElementById("moznosti").value.split(",");

  questions.push({text, type, moznosti});
});

document.getElementById("updatePreview").addEventListener("click", () => {
  nahledContent.innerHTML = "";

  questions.forEach(x => {
    const div = document.createElement("div");
    div.innerHTML = `<p><strong>${x.text}</strong></p>`;
    nahledContent.appendChild(div);

    x.moznosti.forEach(option => {
    const opt = document.createElement("div");
     opt.textContent = "- " + option;
     div.appendChild(opt);
                                });
                         });
                                                                         });

document.getElementById("removeLast").addEventListener("click", () => {
  questions.pop();
});