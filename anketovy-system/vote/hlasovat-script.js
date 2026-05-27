document
    .getElementById("loadBtn")

    .addEventListener("click", async () => {

        const code = document
            .getElementById("pollCode")
            .value;

        const res = await fetch(
            `nacist-anketu.php?code=${code}`
        );

        // const data = await res.json();

        // console.log(data);

    });