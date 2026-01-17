const questions = [];

const previewContent = document.getElementById("previewContent");

document.getElementById("addQuestion").addEventListener("click", () => {
  const text = document.getElementById("questionText").value;
  const type = document.getElementById("questionType").value;
  const options = document.getElementById("options").value.split(",");

  questions.push({text, type, options});
});

document.getElementById("updatePreview").addEventListener("click", () => {
  previewContent.innerHTML = "";

  questions.forEach(x => {
    const div = document.createElement("div");
    div.innerHTML = `<p><strong>${x.text}</strong></p>`;
    previewContent.appendChild(div);

    x.options.forEach(option => {
    const opt = document.createElement("div");
     opt.textContent = "- " + option;
     div.appendChild(opt);
                                });
                         });
                                                                         });

document.getElementById("removeLast").addEventListener("click", () => {
  questions.pop();
});