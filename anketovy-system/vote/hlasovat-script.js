console.log("JS loaded");
console.log(document.getElementById("loadBtn"));



document.getElementById("loadBtn").addEventListener("click", async () => {

    const code = document
        .getElementById("pollCode")
        .value;

    const res = await fetch(
        `nacist-anketu.php?code=${code}`
    );

    const data = await res.json();

    console.log(data);

    const container =
        document.getElementById(
            "pollContainer"
        );

    container.innerHTML = "";



    if(data.error)
    {
        container.innerHTML =
            data.error;

        return;
    }



    // anketa NAME
    container.innerHTML += `
        <h2>${data.poll.name}</h2>
    `;



    // render otazek
    data.questions.forEach(q => {

        let html = `
    <div class="question">
        <h3>${q.text}</h3>
`;



        // TEXT QUESTION
        if(q.type == "text")
        {
            html += `
                <textarea
                    name="q${q.id}"
                ></textarea>
            `;

            html += "</div>";

            container.innerHTML += html;

            return;
        }



        // RADIO A CHECKBOX
        q.options.forEach(o => {

            let inputType = "radio";

            if(q.type == "checkbox")
            {
                inputType = "checkbox";
            }

            html += `
                <label>
                    <input
                        type="${inputType}"
                        name="q${q.id}"
                        value="${o.text}"
                    >

                    ${o.text}
                </label>

                <br>
            `;
        });

        html += "</div>";

        container.innerHTML += html;

    });




    
    // container.innerHTML += `
    //     <button id="voteBtn">
    //         Hlasovat
    //     </button>
    // `;




    // HLASOVANI
    document
        .getElementById("voteBtn")
        .addEventListener("click", async () => {

            const answers = [];



            data.questions.forEach(q => {



                // RADIO
                if(q.type == "radio")
                {
                    const selected =
                        document.querySelector(
                            `input[name="q${q.id}"]:checked`
                        );

                    if(selected)
                    {
                        answers.push({
                            question_id: q.id,
                            answer: selected.value
                        });
                    }
                }



                // CHECKBOX
                if(q.type == "checkbox")
                {
                    const selected =
                        document.querySelectorAll(
                            `input[name="q${q.id}"]:checked`
                        );

                    selected.forEach(s => {

                        answers.push({
                            question_id: q.id,
                            answer: s.value
                        });

                    });
                }



                // TEXT
                if(q.type == "text")
                {
                    const text =
                        document.querySelector(
                            `textarea[name="q${q.id}"]`
                        );

                    if(text.value.trim() != "")
                    {
                        answers.push({
                            question_id: q.id,
                            answer: text.value
                        });
                    }
                }

            });



            console.log(answers);



            const res = await fetch(
                "ulozit-hlas.php",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify({
                        answers: answers
                    })
                }
            );



            const result = await res.text();

            alert(result);

        });

});